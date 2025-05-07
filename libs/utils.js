import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import Cookies from "js-cookie";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const getCookie = () => Cookies.get("access_token");

export const setCookie = (value) => {
  Cookies.set("access_token", value);
};

export const removeCookie = () => {
  Cookies.remove("access_token");
};
