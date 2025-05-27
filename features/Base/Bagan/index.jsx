"use client";

import useGetBagan from "@/hook/useGetBagan";

const roundLabels = ["Quarter", "Semi", "Final"];

const BaganFeature = () => {
  const { data: bagan, isLoading, isError } = useGetBagan();

  if (isLoading) return <p className="p-4">Memuat bagan...</p>;
  if (isError)
    return <p className="p-4 text-red-600">Gagal memuat data bagan</p>;

  const grouped = bagan.reduce((acc, match) => {
    if (!acc[match.round]) acc[match.round] = [];
    acc[match.round].push(match);
    return acc;
  }, {});

  const rounds = Object.keys(grouped).sort((a, b) => Number(a) - Number(b));

  return (
    <div className="p-4 py-32 overflow-x-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Bagan Pertandingan
      </h1>

      <div className="flex w-max items-start space-x-12">
        {rounds.map((roundKey, idx) => {
          const matches = grouped[roundKey];
          const roundTitle =
            roundLabels[idx] ?? `Ronde ${Number(roundKey) + 1}`;
          const spacingMultiplier = Math.pow(2, idx); // untuk pengaturan space antar pertandingan

          return (
            <div
              key={roundKey}
              className="flex flex-col items-center min-w-[160px]"
            >
              <h2 className="text-lg font-semibold mb-4 text-center h-8">
                {roundTitle}
              </h2>

              <div className="flex flex-col items-center space-y-[64px]">
                {matches.map((match, matchIdx) => {
                  const isP1Winner = match.winner === match.participant1;
                  const isP2Winner = match.winner === match.participant2;

                  return (
                    <div
                      key={match.id}
                      className="bg-white rounded-md border shadow-sm text-sm w-40"
                    >
                      <div className="flex items-center justify-between px-2 py-1 border-b">
                        <span
                          className={`flex-1 ${
                            isP1Winner
                              ? "text-green-600 font-semibold"
                              : "text-red-600"
                          }`}
                        >
                          {match.participant1_name || "TBD"}
                        </span>
                        <span className="text-xs text-gray-500 ml-2">
                          {match.score1 ?? "-"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between px-2 py-1">
                        <span
                          className={`flex-1 ${
                            isP2Winner
                              ? "text-green-600 font-semibold"
                              : "text-red-600"
                          }`}
                        >
                          {match.participant2_name || "TBD"}
                        </span>
                        <span className="text-xs text-gray-500 ml-2">
                          {match.score2 ?? "-"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BaganFeature;
