import axios from "axios";

import { APP_URL, LIVE_URL } from "@/constants/config";
import { getCookie } from "./utils";

export const axiosInstance = axios.create({
  baseURL: LIVE_URL,
});

export const axiosInstanceToken = axios.create({
  baseURL: LIVE_URL,
  headers: {
    Authorization: `Bearer ${getCookie()}`,
  },
});

export const axiosUpload = (url, formData, config = {}) => {
  return axiosInstance.post(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      ...config.headers,
    },
    ...config,
  });
};
