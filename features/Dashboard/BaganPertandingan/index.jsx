"use client";

import useGetBaganPertandingan from "./hook/useGetBaganPertandingan";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, IdCard, User } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/libs/axios";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import useGetKategori from "../Kategori/hook/useGetKategori";
import BaganStatusBadge from "@/components/common/bagan-status-badge";
import { useState } from "react";
import useGetBaganByCategory from "../UpdateBaganPertandingan/hook/useGetBaganByCategory";

const DashboardBaganPertandinganFeature = () => {
  const [kategori, setKategori] = useState("");
  const { data: kategoriData } = useGetKategori();
  const { data, isLoading, error } = useGetBaganPertandingan(kategori);
  const { data: statusBagan, refetch: refetchStatusBagan } =
    useGetBaganByCategory(kategori);

  const { mutate, isPending } = useMutation({
    mutationFn: async (categoryId) => {
      const response = await axiosInstance.post("/v1/api/bagan", {
        categoryId,
      });
      return response.data;
    },
    onSuccess: (value) => {
      toast.success(value.message);
      refetchStatusBagan();
    },
    onError: () => {
      toast.error("Gagal membuat bagan.");
    },
  });

  const handleCategoryChange = (value) => {
    setKategori(value);
  };

  const handleBuatBagan = () => {
    if (!kategori) {
      toast.error("Pilih kategori terlebih dahulu.");
      return;
    }
    mutate(kategori);
  };

  return (
    <main>
      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Bagan Pertandingan</h2>

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
      </section>

      {isLoading && <p className="text-muted-foreground">Loading data...</p>}
      {error && (
        <p className="text-destructive text-center">Gagal mengambil data</p>
      )}

      {data?.data && (
        <section className="mt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold mb-4">
              Partisipan -{" "}
              {kategoriData.data.find((cat) => cat.id === kategori)?.label}
            </h3>
            <div>
              {kategori && statusBagan?.data?.matchesWithInfo?.length > 0 && (
                <BaganStatusBadge
                  kategori={kategori}
                  matches={statusBagan.data.matchesWithInfo}
                />
              )}
            </div>
          </div>

          {data.data.length > 0 ? (
            <ScrollArea className="h-[52vh] pr-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.data.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-4 space-y-2">
                      <div className="flex items-center gap-2 text-primary">
                        <User className="w-4 h-4" />
                        <span className="font-medium">{item.user_name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <GraduationCap className="w-4 h-4" />
                        <span>{item.user_institution}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <IdCard className="w-4 h-4" />
                        <span>{item.user_kode}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <p className="text-sm text-muted-foreground">
              Tidak ada data partisipan.
            </p>
          )}

          <Button
            className="mt-6 cursor-pointer"
            onClick={handleBuatBagan}
            disabled={data.data.length < 2 || isPending}
          >
            {isPending ? "Membuat Bagan..." : "Buat Bagan"}
          </Button>
        </section>
      )}
    </main>
  );
};

export default DashboardBaganPertandinganFeature;
