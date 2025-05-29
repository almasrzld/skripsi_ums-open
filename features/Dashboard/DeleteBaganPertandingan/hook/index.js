"use client";

import { useState } from "react";
import { axiosInstanceToken } from "@/libs/axios";
import { toast } from "sonner";

const useDashboardDeleteBaganPertandingan = () => {
  const [loading, setLoading] = useState(false);

  const deleteBagan = async (category) => {
    try {
      setLoading(true);

      if (!category) {
        throw new Error("Kategori tidak boleh kosong");
      }

      const res = await axiosInstanceToken.delete(`/v1/api/bagan/${category}`);

      toast.success("Bagan berhasil dihapus");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Gagal menghapus bagan kategori"
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteBagan,
    loading,
  };
};

export default useDashboardDeleteBaganPertandingan;
