import { axiosInstance } from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";

const useGetAllPartisipan = (status) => {
  return useQuery({
    queryKey: ["all-partisipan", status],
    queryFn: async () => {
      const response = await axiosInstance.get("/v1/api/partisipan", {
        params: {
          status,
        },
      });
      return response.data;
    },
  });
};

export default useGetAllPartisipan;
