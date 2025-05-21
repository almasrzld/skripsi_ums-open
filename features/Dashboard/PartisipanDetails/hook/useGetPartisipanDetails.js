import { axiosInstance } from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";

const useGetPartisipanDetails = (page, limit, value, status) => {
  return useQuery({
    queryKey: ["partisipan-details", page, limit, value, status],
    queryFn: async () => {
      const response = await axiosInstance.get("/v1/api/pendaftaran", {
        params: {
          page,
          limit,
          search: value,
          status,
        },
      });

      return response.data;
    },
  });
};

export default useGetPartisipanDetails;
