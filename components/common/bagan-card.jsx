"use client";

import { Card, CardContent } from "@/components/ui/card";
import useDashboardBaganPertandinganFeature from "@/features/Dashboard/BaganPertandingan/hook";

const BaganCard = ({ category, participant1_info, participant2_info }) => {
  const { categoryLabel } = useDashboardBaganPertandinganFeature();

  const getFotoUrl = (participant) =>
    participant?.foto
      ? `https://backendumsopen-production.up.railway.app/${participant.foto}`
      : "/images/placeholder-image.jpg";

  const getNama = (participant) => participant?.nama ?? "TBD";

  return (
    <Card className="rounded-2xl shadow-md">
      <CardContent className="p-4">
        <h3 className="text-center text-lg font-semibold mb-4">
          {categoryLabel[category]}
        </h3>
        <div className="flex items-center justify-center gap-6">
          <div className="flex flex-col items-center">
            <img
              src={getFotoUrl(participant1_info)}
              alt={getNama(participant1_info)}
              width={80}
              height={80}
              className="rounded-full w-[80px] h-[80px] border-2 border-blue-500 object-cover"
            />
            <p className="mt-2 font-medium text-sm text-center">
              {getNama(participant1_info)}
            </p>
          </div>
          <span className="text-xl font-bold">VS</span>
          <div className="flex flex-col items-center">
            <img
              src={getFotoUrl(participant2_info)}
              alt={getNama(participant2_info)}
              width={80}
              height={80}
              className="rounded-full w-[80px] h-[80px] border-2 border-red-500 object-cover"
            />
            <p className="mt-2 font-medium text-sm text-center">
              {getNama(participant2_info)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BaganCard;
