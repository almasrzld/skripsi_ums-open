import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstanceToken } from "@/libs/axios";
import { toast } from "sonner";

const useResetMatch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const res = await axiosInstanceToken.patch(`/v1/api/bagan/${id}/reset`);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Berhasil mereset pertandingan.");
      queryClient.invalidateQueries({ queryKey: ["bagan"] });
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Gagal mereset pertandingan."
      );
    },
  });
};

export default useResetMatch;
