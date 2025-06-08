export function remapCompetitionDataByCategoryEnhanced(matches) {
  const matchesByCategory = matches?.reduce((acc, match) => {
    const category = match.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(match);
    return acc;
  }, {});

  const categoriesData = Object?.keys(matchesByCategory)?.map((category) => {
    const categoryMatches = matchesByCategory[category];

    const matchesByRound = categoryMatches.reduce((acc, match) => {
      const roundKey = match.isThirdPlace
        ? "ThirdPlace"
        : match.round.toString();
      if (!acc[roundKey]) {
        acc[roundKey] = [];
      }
      acc[roundKey].push(match);
      return acc;
    }, {});

    const rounds = Object.keys(matchesByRound)
      .sort((a, b) => {
        if (a === "ThirdPlace") return 1;
        if (b === "ThirdPlace") return -1;
        return parseInt(a) - parseInt(b);
      })
      .map((roundNumber) => {
        const roundMatches = matchesByRound[roundNumber];
        roundMatches.sort((a, b) => a.indexInRound - b.indexInRound);

        const seeds = roundMatches.map((match, index) => ({
          id: index + 1,
          date: match.createdAt,
          teams: [
            {
              name: match.participant1_info?.nama || "-",
              score: match.score1 || "-",
              id: match.participant1 || "-",
              isThirdPlace: match.isThirdPlace || false,
              institution: match.participant1_info?.institusi || "-",
            },
            {
              name: match.participant2_info?.nama || "-",
              score: match.score2 || "-",
              id: match.participant2 || "-",
              isThirdPlace: match.isThirdPlace || false,
              institution: match.participant2_info?.institusi || "-",
            },
          ],
          isThirdPlace: match.isThirdPlace || false,
          winner: match.winner || "-",
          winMethod: match.win_method || "-",
          status: match.status,
        }));

        return {
          title:
            roundNumber === "ThirdPlace"
              ? "Third Place Match"
              : `Round ${roundNumber}`,
          seeds,
        };
      });

    function getWinnersFromRounds(rounds) {
      let winner1 = null;
      let winner2 = null;
      let winner3 = null;

      const nonThirdRounds = rounds.filter((round) =>
        round.seeds.some((seed) => !seed.isThirdPlace)
      );

      const lastRound = nonThirdRounds[nonThirdRounds.length - 1];
      const finalMatch = [...lastRound.seeds]
        .filter((seed) => !seed.isThirdPlace)
        .sort((a, b) => b.id - a.id)[0];

      if (finalMatch) {
        const [team1, team2] = finalMatch.teams;
        const winnerId = finalMatch.winner;

        winner1 = team1.id === winnerId ? team1 : team2;
        winner2 = team1.id === winnerId ? team2 : team1;
      }

      const thirdPlaceMatch = rounds
        .flatMap((round) => round.seeds)
        .find((seed) => seed.isThirdPlace);

      if (thirdPlaceMatch) {
        const [team1, team2] = thirdPlaceMatch.teams;
        const winnerId = thirdPlaceMatch.winner;
        winner3 = team1.id === winnerId ? team1 : team2;
      }

      return { winner1, winner2, winner3 };
    }

    const winners = getWinnersFromRounds(rounds);

    return {
      categories: category,
      data: rounds,
      winners,
    };
  });

  return {
    data: categoriesData,
  };
}

export function extractWinnersFromCategory(categoryData) {
  const rounds = categoryData.data;
  const lastRound = rounds[rounds.length - 1];

  const finalMatch = lastRound.seeds.find((m) => !m.isThirdPlace);
  const thirdPlaceMatch = lastRound.seeds.find((m) => m.isThirdPlace);

  const winner1 = finalMatch?.winner;
  const winner1Info = finalMatch?.teams.find((t) => t.id === winner1);

  const loserFinal = finalMatch?.teams.find((t) => t.id !== winner1);
  const winner2 = loserFinal?.id;
  const winner2Info = loserFinal;

  const winner3 = thirdPlaceMatch?.winner;
  const winner3Info = thirdPlaceMatch?.teams.find((t) => t.id === winner3);

  return {
    category: categoryData.categories,
    juara1: winner1Info ? { ...winner1Info } : null,
    juara2: winner2Info ? { ...winner2Info } : null,
    juara3: winner3Info ? { ...winner3Info } : null,
  };
}

export function calculateWinners(data) {
  const institutionPoints = {};
  const institutionDetails = {};

  data.forEach((category) => {
    const { winners, categories } = category;

    const addPoints = (winner, points, position) => {
      if (winner && winner.institution) {
        const institution = winner.institution;
        institutionPoints[institution] =
          (institutionPoints[institution] || 0) + points;

        if (!institutionDetails[institution]) {
          institutionDetails[institution] = {
            achievements: [],
            totalWinners: 0,
          };
        }

        institutionDetails[institution].achievements.push({
          category: categories,
          winner: winner.name,
          position: position,
          points: points,
        });
        institutionDetails[institution].totalWinners++;
      }
    };

    addPoints(winners.winner1, 3, 1);
    addPoints(winners.winner2, 2, 2);
    addPoints(winners.winner3, 1, 3);
  });

  const sortedInstitutions = Object.entries(institutionPoints)
    .map(([institution, points]) => ({
      institution,
      points,
      details: institutionDetails[institution],
    }))
    .sort((a, b) => b.points - a.points);

  return sortedInstitutions;
}
