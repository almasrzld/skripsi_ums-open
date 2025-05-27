"use client";

import React, { useEffect, useState } from "react";
import { Bracket } from "@pawix/react-brackets";
import CustomSeed from "@/components/common/custom-seed";
import useGetBagan from "@/hook/useGetBagan";
import { Loader2 } from "lucide-react";
import { remapCompetitionDataByCategoryEnhanced } from "@/libs/bagan-utils";

const BaganFeature = () => {
  const [remappingData, setIsRemappingData] = useState([]);
  const { data, isLoading, isError } = useGetBagan();

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

  if (isError) {
    return (
      <div className="p-4 text-center text-red-600">
        Gagal memuat data bagan dari server.
      </div>
    );
  }

  return (
    <div className="my-40 container">
      {remappingData?.length > 0 &&
        remappingData?.map((category, index) => {
          return (
            <div key={index} className="mb-16">
              <h2 className="text-2xl font-bold  mb-4">
                Kategori {category.categories}
              </h2>
              <Bracket
                rounds={category.data}
                renderSeedComponent={CustomSeed}
              />
            </div>
          );
        })}

      {/* <div className="mt-40">
        <h2>Sample Data if data works</h2>
        {staticData?.data?.map((category, index) => {
          return (
            <div key={index} className="mb-16">
              <h2 className="text-2xl font-bold  mb-4">
                Kategori {category.categories}
              </h2>
              <Bracket
                rounds={category.data}
                renderSeedComponent={CustomSeed}
              />
            </div>
          );
        })}
      </div> */}
    </div>
  );
};

export default BaganFeature;
