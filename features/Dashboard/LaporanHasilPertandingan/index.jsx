"use client";

import useGetBagan from "@/hook/useGetBagan";
import { useEffect, useState } from "react";
import { remapCompetitionDataByCategoryEnhanced } from "@/libs/bagan-utils";
import useGetStatistik from "@/hook/useGetStatistik";
import { Loader2 } from "lucide-react";
import { MatchReportTable } from "./components/matchTable";

const DashboardLaporanHasilPertandinganFeature = () => {
  const [remappingData, setIsRemappingData] = useState([]);
  const { data, isLoading, isError } = useGetBagan();
  const { data: statistikData, isLoading: statistikLoading } =
    useGetStatistik();

  useEffect(() => {
    if (data?.data) {
      const categoriesData = remapCompetitionDataByCategoryEnhanced(data.data);
      setIsRemappingData(categoriesData.data);
    }
  }, [data]);

  if (isLoading && remappingData.length < 1) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin size-8 mx-auto text-slate-800" />
      </div>
    );
  }

  return (
    <main>
      <h1 className="text-2xl font-semibold">Laporan Hasil Pertandingan</h1>

      <div className="flex justify-center flex-col gap-2 my-5">
        <p className="text-center max-w-3xl mx-auto">
          Berikut adalah <span className="font-medium">hasil pertandingan</span>{" "}
          kejuaraan Taekwondo <strong>UMS Open</strong>. Setiap kategori
          memiliki bagan tersendiri yang menampilkan pertandingan yang telah
          berlangsung.
        </p>
        <div className="flex items-center justify-center gap-8">
          <div className="text-center">
            <p className="text-2xl font-bold">
              {statistikLoading ? "..." : statistikData?.categories ?? "-"}
            </p>

            <p className="text-sm">Kategori</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">
              {statistikLoading ? "..." : statistikData?.participants ?? "-"}
            </p>
            <p className="text-sm">Peserta</p>
          </div>
        </div>
      </div>

      <MatchReportTable data={remappingData} />
    </main>
  );
};

export default DashboardLaporanHasilPertandinganFeature;
