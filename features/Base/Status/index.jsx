"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import useGetPartisipan from "@/features/Dashboard/Partisipan/hook/useGetPartisipan";
import NotFoundDetails from "@/components/layout/not-found-details";

const StatusFeature = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");
  const { data, isLoading, isError } = useGetPartisipan(orderId);
  const participant = data?.data;
  const status = participant?.status;

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
    <main className="container py-10 space-y-4 h-screen">
      <h1 className="text-2xl font-bold">Status Pendaftaran</h1>
      <div className="bg-white text-center shadow p-6 rounded space-y-2">
        <p>
          <strong>Nama:</strong> {participant.user_name}
        </p>
        <p>
          <strong>Kode Peserta:</strong> {participant.user_kode}
        </p>
        <p>
          <strong>Order ID:</strong> {participant.orderId}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <span
            className={`font-semibold ${
              status === "settlement"
                ? "text-green-600"
                : status === "pending"
                ? "text-yellow-600"
                : "text-red-600"
            }`}
          >
            {status || "Tidak diketahui"}
          </span>
        </p>
      </div>
    </main>
  );
};

export default StatusFeature;
