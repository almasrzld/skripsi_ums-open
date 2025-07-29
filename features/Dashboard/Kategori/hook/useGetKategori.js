import { axiosInstance } from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";

const useGetKategori = () => {
  return useQuery({
    queryKey: ["kategori"],
    queryFn: async () => {
      const response = await axiosInstance.get("/v1/api/kategori");
      return response.data;
    },
  });
};

export default useGetKategori;
