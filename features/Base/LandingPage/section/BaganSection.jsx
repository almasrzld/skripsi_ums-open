"use client";

import BaganCard from "@/components/common/bagan-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import useGetBagan from "@/hook/useGetBagan";

const BaganSection = () => {
  const { data, isLoading, isError } = useGetBagan();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-slate-800 border-t-transparent" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 text-center text-red-600">
        Gagal memuat data bagan dari server
      </div>
    );
  }

  if (!data?.data?.length) {
    return (
      <div className="container py-8">
        <h2 className="text-3xl font-bold">Bagan Peserta</h2>
        <p className="text-center text-slate-600 py-32">
          Tidak ada data bagan tersedia saat ini
        </p>
      </div>
    );
  }

  return (
    <section className="container py-8">
      <h2 className="text-3xl font-bold">Bagan Peserta</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-4">
        {data.data
          .slice(0, 4)
          .flatMap(
            (category, index) =>
              category.matches
                ?.slice(0, 1)
                .map((match, i) => (
                  <BaganCard
                    key={`${category.categoryId}-${match.id}`}
                    label={category.label}
                    match={match}
                  />
                )) ?? []
          )}
      </div>
      <Button className="cursor-pointer">
        <Link href="/bagan">Selengkapnya</Link>
      </Button>
    </section>
  );
};

export default BaganSection;
