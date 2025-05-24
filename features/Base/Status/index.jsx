"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import useGetPartisipan from "@/features/Dashboard/Partisipan/hook/useGetPartisipan";
import NotFoundDetails from "@/components/layout/not-found-details";
import { CheckCircle, XCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const StatusFeature = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");
  const router = useRouter();
  const { data, isLoading, isError } = useGetPartisipan(orderId);
  const participant = data?.data;
  const status = participant?.status;

  const renderStatusText = (status) => {
    if (status === "settlement") {
      return (
        <div className="flex items-center gap-2 text-green-600 font-semibold">
          <CheckCircle className="w-5 h-5" />
          Lunas
        </div>
      );
    } else {
      return (
        <div className="flex items-center gap-2 text-red-600 font-semibold">
          <XCircle className="w-5 h-5" />
          Pending
        </div>
      );
    }
  };

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
        <h1 className="text-3xl font-bold">Status Pendaftaran</h1>
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
          <p className="flex items-center gap-2 mx-auto">
            <strong>Status:</strong>
            {renderStatusText(status)}
          </p>
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
