import { axiosInstance } from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";

const useGetBaganPertandingan = (category) => {
  return useQuery({
    queryKey: ["bagan-pertandingan", category],
    queryFn: async () => {
      const response = await axiosInstance.get(
        "/v1/api/partisipan/by-category",
        {
          params: {
            category,
          },
        }
      );
      return response.data;
    },
    enabled: !!category,
  });
};

export default useGetBaganPertandingan;
