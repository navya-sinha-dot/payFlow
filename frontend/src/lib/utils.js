import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const BACKEND_URL_PROD = "https://payflow-be.navysinha.xyz/api/v1";
export const BACKEND_URL_DEV = "http://localhost:3000/api/v1";
