import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/libs/axios";

const useGetBagan = () => {
  return useQuery({
    queryKey: ["bagan"],
    queryFn: async () => {
      const response = await axiosInstance.get("/v1/api/bagan");
      return response.data.data;
    },
  });
};

export default useGetBagan;
