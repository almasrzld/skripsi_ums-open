import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/libs/axios";

const useGetBaganByCategory = (categoryId) => {
  return useQuery({
    queryKey: ["bagan-category", categoryId],
    queryFn: async () => {
      const response = await axiosInstance.get(`/v1/api/bagan/${categoryId}`, {
        params: {
          categoryId,
        },
      });
      return response.data;
    },
    enabled: !!categoryId,
  });
};

export default useGetBaganByCategory;
