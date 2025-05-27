import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/libs/axios";

const useGetStatistik = () => {
  return useQuery({
    queryKey: ["statistik"],
    queryFn: async () => {
      const response = await axiosInstance.get("/v1/api/partisipan/statistic");
      return response.data.data;
    },
  });
};

export default useGetStatistik;
