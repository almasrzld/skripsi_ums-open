import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/libs/axios";

const useGetInstitutionStatistik = () => {
  return useQuery({
    queryKey: ["institution-statistik"],
    queryFn: async () => {
      const res = await axiosInstance.get("/v1/api/partisipan/institution");
      return res.data.data;
    },
  });
};

export default useGetInstitutionStatistik;
