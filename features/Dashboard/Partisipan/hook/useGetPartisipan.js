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
  });
};

export default useGetPartisipan;
