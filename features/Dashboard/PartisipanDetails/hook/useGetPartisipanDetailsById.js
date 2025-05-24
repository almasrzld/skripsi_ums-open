import { axiosInstance } from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";

const useGetPartisipanDetailsById = (id) => {
  return useQuery({
    queryKey: ["partisipan-details-id", id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/v1/api/partisipan/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};

export default useGetPartisipanDetailsById;
