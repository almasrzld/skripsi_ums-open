"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import useGetPartisipan from "@/features/Dashboard/Partisipan/hook/useGetPartisipan";
import NotFoundDetails from "@/components/layout/not-found-details";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatusCard from "@/components/common/status-card";

const StatusFeature = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");
  const router = useRouter();
  const { data, isLoading, isError, refetch } = useGetPartisipan(orderId);
  const participant = data?.data;

  useEffect(() => {
    if (orderId) {
      const timeout = setTimeout(() => {
        refetch();
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [orderId, refetch]);

  if (isLoading) {
    return (
      <main className="container py-10">
        <Skeleton className="w-full h-32" />
      </main>
    );
  }

  if (isError || !participant) {
    return <NotFoundDetails />;
  }

  return (
    <main className="h-screen flex flex-col justify-center text-center py-10 space-y-6 max-w-xl mx-auto">
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold">Status Pendaftaran</h1>
        <p className="text-muted-foreground text-sm">
          Cek status pembayaran dan data partisipan Anda.
        </p>
      </div>

      <div className="bg-white shadow-md border rounded-lg p-6 space-y-4">
        <div className="grid gap-2 text-sm">
          <p>
            <strong>Nama:</strong> {participant.user_name}
          </p>
          <p>
            <strong>Kode Peserta:</strong> {participant.user_kode}
          </p>
          <p>
            <strong>Order ID:</strong> {participant.orderId}
          </p>
          <div className="flex items-center gap-2 mx-auto text-sm">
            <strong>Status:</strong>
            <StatusCard status={participant.status} />
          </div>
          {participant.status !== "PAID" && (
            <p className="text-yellow-600 text-sm animate-pulse">
              Sedang mengecek status pembayaran Anda...
            </p>
          )}
        </div>
      </div>

      <div className="pt-4">
        <Button
          className="cursor-pointer"
          variant="secondary"
          onClick={() => router.push("/")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali ke Beranda
        </Button>
      </div>
    </main>
  );
};

export default StatusFeature;
