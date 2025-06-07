import { axiosInstance } from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";

const useGetAllPartisipan = () => {
  return useQuery({
    queryKey: ["all-partisipan"],
    queryFn: async () => {
      const response = await axiosInstance.get("/v1/api/partisipan");
      return response.data;
    },
  });
};

export default useGetAllPartisipan;
