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
      const roundNumber = match.round;
      if (!acc[roundNumber]) {
        acc[roundNumber] = [];
      }
      acc[roundNumber].push(match);
      return acc;
    }, {});

    const rounds = Object.keys(matchesByRound)
      .sort((a, b) => parseInt(a) - parseInt(b))
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
            },
            {
              name: match.participant2_info?.nama || "-",
              score: match.score2 || "-",
              id: match.participant2 || "-",
            },
          ],
          winner: match.winner || "-",
          winMethod: match.win_method || "-",
          status: match.status,
        }));

        return {
          title: `Round ${roundNumber}`,
          seeds,
        };
      });

    return {
      categories: category,
      data: rounds,
    };
  });

  return {
    data: categoriesData,
  };
}
