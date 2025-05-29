import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/libs/axios";

const useGetBaganByCategory = (category) => {
  return useQuery({
    queryKey: ["bagan-category", category],
    queryFn: async () => {
      const response = await axiosInstance.get(`/v1/api/bagan/${category}`, {
        params: {
          category,
        },
      });
      return response.data;
    },
    enabled: !!category,
  });
};

export default useGetBaganByCategory;
