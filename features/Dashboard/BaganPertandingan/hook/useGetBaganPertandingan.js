import { axiosInstance } from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";

const useGetBaganPertandingan = (page, limit, value, kategori) => {
  return useQuery({
    queryKey: ["bagan-pertandingan", page, limit, value, kategori],
    queryFn: async () => {
      const response = await axiosInstance.get("/v1/api/bagan-pertandingan", {
        params: {
          page,
          limit,
          search: value,
          kategori,
        },
      });

      return response.data;
    },
  });
};

export default useGetBaganPertandingan;
