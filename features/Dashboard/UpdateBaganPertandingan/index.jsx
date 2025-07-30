"use client";

import MatchTable from "@/components/common/update-bagan-table";
import useGetBaganByCategory from "./hook/useGetBaganByCategory";
import useGetKategori from "../Kategori/hook/useGetKategori";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import DeleteBaganButton from "../DeleteBaganPertandingan";
import { useState } from "react";

const DashboardUpdateBaganPertandinganFeature = () => {
  const [kategori, setKategori] = useState("");
  const { data: kategoriData } = useGetKategori();
  const { data, refetch, isLoading, error } = useGetBaganByCategory(kategori);

  const handleCategoryChange = (value) => {
    setKategori(value);
  };

  return (
    <main>
      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Update Bagan Pertandingan</h2>

        <div className="flex items-center gap-4">
          <Select onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Pilih Kategori">
                {kategori ? kategoriData[kategori] : "Pilih Kategori"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {kategoriData?.data?.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {kategori && (
            <DeleteBaganButton
              category={kategori}
              onSuccess={refetch}
              disabled={
                !data?.data?.matchesWithInfo ||
                data.data.matchesWithInfo.length === 0
              }
            />
          )}
        </div>
      </section>

      {isLoading && <p className="text-muted-foreground">Loading data...</p>}
      {error && (
        <p className="text-destructive text-center">Gagal mengambil data</p>
      )}

      {data?.data?.matchesWithInfo?.length > 0 ? (
        <MatchTable matches={data.data.matchesWithInfo} onSuccess={refetch} />
      ) : (
        !isLoading && (
          <p className="text-muted-foreground">Belum ada pertandingan.</p>
        )
      )}
    </main>
  );
};

export default DashboardUpdateBaganPertandinganFeature;
