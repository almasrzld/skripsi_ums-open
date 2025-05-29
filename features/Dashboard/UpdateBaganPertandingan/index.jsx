"use client";

import MatchTable from "@/components/common/update-bagan-table";
import useGetBaganByCategory from "./hook/useGetBaganByCategory";
import useDashboardBaganPertandinganFeature from "../BaganPertandingan/hook";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import DeleteBaganButton from "../DeleteBaganPertandingan";

const DashboardUpdateBaganPertandinganFeature = () => {
  const { kategori, setKategori, categoryLabel } =
    useDashboardBaganPertandinganFeature();
  const { data, refetch, isLoading, error } = useGetBaganByCategory(kategori);

  const handleCategoryChange = (value) => {
    setKategori(value);
  };

  return (
    <main className="p-6">
      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Update Bagan Pertandingan</h2>

        <div className="flex items-center gap-4">
          <Select onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Pilih Kategori">
                {kategori ? categoryLabel[kategori] : "Pilih Kategori"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {Object.entries(categoryLabel).map(([key, label]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {kategori && (
            <DeleteBaganButton
              category={kategori}
              onSuccess={refetch}
              disabled={!data?.data || data.data.length === 0}
            />
          )}
        </div>
      </section>

      {isLoading && <p className="text-muted-foreground">Loading data...</p>}
      {error && (
        <p className="text-destructive text-center">Gagal mengambil data</p>
      )}

      {data?.data?.length > 0 ? (
        <MatchTable matches={data.data} onSuccess={refetch} />
      ) : (
        <p className="text-muted-foreground">Belum ada pertandingan.</p>
      )}
    </main>
  );
};

export default DashboardUpdateBaganPertandinganFeature;
