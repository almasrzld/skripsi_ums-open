"use client";

import { Card, CardContent } from "@/components/ui/card";
import useGetKategori from "@/features/Dashboard/Kategori/hook/useGetKategori";

const BaganCard = ({ match }) => {
  const { data: kategoriData } = useGetKategori();

  const label =
    kategoriData?.data?.find((cat) => cat.id === match.categoryId)?.label ??
    "Unknown";

  const getFotoUrl = (participant) =>
    participant?.foto || "/images/placeholder-image.jpg";

  const getNama = (participant) => participant?.nama ?? "TBD";

  return (
    <Card className="rounded-2xl shadow-md">
      <CardContent className="p-4">
        <h3 className="text-center text-lg font-semibold mb-4">{label}</h3>
        <div className="flex items-center justify-center gap-6">
          <div className="flex flex-col items-center">
            <img
              src={getFotoUrl(match.participant1_info)}
              alt={getNama(match.participant1_info)}
              width={80}
              height={80}
              className="rounded-full w-[80px] h-[80px] border-2 border-blue-500 object-cover"
            />
            <p className="mt-2 font-medium text-sm text-center">
              {getNama(match.participant1_info)}
            </p>
          </div>
          <span className="text-xl font-bold">VS</span>
          <div className="flex flex-col items-center">
            <img
              src={getFotoUrl(match.participant2_info)}
              alt={getNama(match.participant2_info)}
              width={80}
              height={80}
              className="rounded-full w-[80px] h-[80px] border-2 border-red-500 object-cover"
            />
            <p className="mt-2 font-medium text-sm text-center">
              {getNama(match.participant2_info)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BaganCard;
