import { create } from "zustand";
import { getCookie, removeCookie } from "@/libs/utils";
import { axiosInstance } from "@/libs/axios";

const useAuthStore = create((set) => ({
  data: null,
  getUser: async () => {
    try {
      const token = getCookie();
      if (!token) return set({ data: null });

      const response = await axiosInstance.get("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set({ data: response.data });
    } catch (error) {
      console.error("getUser error:", error);
      removeCookie();
      set({ data: null });
      window.location.href = "/";
    }
  },
  logoutHandler: async () => {
    removeCookie();
    set({ data: null });
    window.location.href = "/";
  },
}));

export default useAuthStore;
