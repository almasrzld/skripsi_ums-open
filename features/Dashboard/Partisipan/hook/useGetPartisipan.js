import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/libs/axios";

const useGetPartisipan = (orderId) => {
  return useQuery({
    queryKey: ["transaction", orderId],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/v1/api/pendaftaran/${orderId}`
      );
      return response.data;
    },
    enabled: !!orderId,
    refetchInterval: (query) =>
      query?.state?.data?.data?.status !== "PAID" ? 5000 : false,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};

export default useGetPartisipan;
