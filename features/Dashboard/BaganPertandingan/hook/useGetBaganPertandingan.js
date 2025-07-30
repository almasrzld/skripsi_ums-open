import { axiosInstance } from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";

const useGetBaganPertandingan = (categoryId) => {
  return useQuery({
    queryKey: ["bagan-pertandingan", categoryId],
    queryFn: async () => {
      const response = await axiosInstance.get(
        "/v1/api/partisipan/by-category",
        {
          params: {
            categoryId,
          },
        }
      );
      return response.data;
    },
    enabled: !!categoryId,
  });
};

export default useGetBaganPertandingan;
