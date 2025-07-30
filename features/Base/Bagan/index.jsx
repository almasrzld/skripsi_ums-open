"use client";

import React, { useEffect, useState } from "react";
import { Bracket } from "@pawix/react-brackets";
import CustomSeed from "@/components/common/custom-seed";
import useGetBagan from "@/hook/useGetBagan";
import { Loader2, Trophy } from "lucide-react";
import { remapCompetitionDataByCategoryEnhanced } from "@/libs/bagan-utils";
import { motion } from "framer-motion";
import useGetStatistik from "@/hook/useGetStatistik";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const BaganFeature = () => {
  const [remappingData, setIsRemappingData] = useState([]);
  const { data, isLoading, isError } = useGetBagan();
  const { data: statistikData, isLoading: statistikLoading } =
    useGetStatistik();

  useEffect(() => {
    if (data?.data) {
      const allMatches = data.data.flatMap((category) =>
        category.matches.map((m) => ({
          ...m,
          category: category.label,
        }))
      );

      const categoriesData = remapCompetitionDataByCategoryEnhanced(allMatches);
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

  if (isError) {
    return (
      <div className="p-4 text-center text-red-600">
        Gagal memuat data bagan dari server.
      </div>
    );
  }

  return (
    <main>
      <div className="relative bg-gradient-to-r from-[#3EC1D3] to-[#2AA7B3] py-32 text-white rounded-b-[80px] overflow-hidden">
        <svg
          className="absolute bottom-0 left-0 w-full h-20"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#ffffff33"
            fillOpacity="0.4"
            d="M0,224L60,197.3C120,171,240,117,360,112C480,107,600,149,720,154.7C840,160,960,128,1080,122.7C1200,117,1320,139,1380,149.3L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <Trophy className="mx-auto mb-4 w-10 h-10 text-white/90" />
          <h1 className="text-3xl md:text-6xl font-extrabold tracking-tight text-center mb-3 uppercase drop-shadow">
            Bagan Pertandingan
          </h1>
          <p className="text-center text-md md:text-lg font-light max-w-2xl mx-auto px-4">
            Berikut adalah{" "}
            <span className="font-medium">bagan pertandingan</span> kejuaraan
            Taekwondo <strong>UMS Open</strong>. Setiap kategori memiliki bagan
            tersendiri yang menampilkan pertandingan yang telah berlangsung.
          </p>

          <div className="flex justify-center gap-8 md:gap-10 mt-8 text-white/90">
            <div className="text-center">
              <p className="text-2xl font-bold">
                {statistikLoading
                  ? "..."
                  : statistikData?.activeBaganCategories ?? "-"}
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
        </motion.div>
      </div>
      <div className="container mt-4">
        {remappingData?.length > 0 &&
          remappingData?.map((category, index) => {
            return (
              <div key={index} className="mb-16">
                <h2 className="text-3xl font-bold  mb-4">
                  Kategori {category.categories}
                </h2>
                <ScrollArea className="w-full overflow-auto">
                  <div className="min-w-[600px] pb-4 md:pb-0">
                    <Bracket
                      rounds={category.data}
                      renderSeedComponent={CustomSeed}
                      mobileBreakpoint={0}
                    />
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </div>
            );
          })}
      </div>
    </main>
  );
};

export default BaganFeature;
