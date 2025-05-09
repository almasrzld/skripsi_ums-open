import axios from "axios";

import { LIVE_URL } from "@/constants/config";
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
