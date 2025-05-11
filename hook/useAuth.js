import { create } from "zustand";
import { getCookie, removeCookie } from "@/libs/utils";
import { axiosInstance } from "@/libs/axios";

const useAuthStore = create((set) => ({
  data: null,
  getUser: async () => {
    try {
      const token = getCookie();
      if (!token) return set({ data: null });

      const response = await axiosInstance.get("/v1/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set({ data: response.data });
    } catch (error) {
      removeCookie();
      window.location.href = "/";
      set({ data: null });
    }
  },
  logoutHandler: async () => {
    window.location.href = "/";
    removeCookie();
    set({ data: null });
  },
}));

export default useAuthStore;
