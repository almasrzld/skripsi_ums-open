import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstanceToken } from "@/libs/axios";
import { toast } from "sonner";

const useDashboardUpdateBaganPertandingan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, payload }) => {
      const { data } = await axiosInstanceToken.patch(
        `/v1/api/bagan/${id}`,
        payload
      );
      return data;
    },
    onSuccess: (value) => {
      toast.success(value.message);
      queryClient.invalidateQueries({ queryKey: ["bagan-category"] });
    },
    onError: () => {
      toast.error("Gagal mengupdate hasil pertandingan.");
    },
  });
};

export default useDashboardUpdateBaganPertandingan;
