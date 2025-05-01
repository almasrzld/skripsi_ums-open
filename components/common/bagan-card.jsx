"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

const BaganCard = ({ kategori, pesertaA, pesertaB }) => {
  return (
    <Card className="rounded-2xl shadow-md">
      <CardContent className="p-4">
        <h3 className="text-center text-lg font-semibold mb-4">{kategori}</h3>
        <div className="flex items-center justify-center gap-6">
          <div className="flex flex-col items-center">
            <Image
              src={pesertaA.foto}
              alt={pesertaA.nama}
              width={80}
              height={80}
              className="rounded-full w-[80px] h-[80px] border-2 border-blue-500 object-cover"
            />
            <p className="mt-2 font-medium text-sm text-center">
              {pesertaA.nama}
            </p>
          </div>
          <span className="text-xl font-bold">VS</span>
          <div className="flex flex-col items-center">
            <Image
              src={pesertaB.foto}
              alt={pesertaB.nama}
              width={80}
              height={80}
              className="rounded-full w-[80px] h-[80px] border-2 border-red-500 object-cover"
            />
            <p className="mt-2 font-medium text-sm text-center">
              {pesertaB.nama}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BaganCard;
