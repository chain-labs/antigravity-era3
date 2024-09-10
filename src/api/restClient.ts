import { API_ENDPOINT } from "@/constants";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: API_ENDPOINT,
});

const axiosProxyInstance = axios.create({});

export const fetcher = async <T>(url: string, proxy?: boolean): Promise<T> => {
  if (proxy) {
    const { data } = await axiosProxyInstance.get<T>(url);
    return data;
  }
  const { data } = await axiosInstance.get<T>(url);
  return data;
};

export const mutate = async <T>(
  url: string,
  payload: Record<string, any>,
  headers?: Record<string, any>,
): Promise<T> => {
  const { data } = await axiosInstance.post<T>(url, payload, { headers });
  return data;
};
