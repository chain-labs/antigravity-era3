import { API_ENDPOINT } from "@/constants";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: API_ENDPOINT,
});

const axiosProxyInstance = axios.create({});

export const fetcher = async <T>(
  url: string,
  options?: { proxy?: boolean; body?: string },
): Promise<T> => {
  if (options?.proxy) {
    const { data: result } = await axiosProxyInstance.get<T>(url, {
      data: options?.body,
    });
    return result;
  }
  const { data: result } = await axiosInstance.get<T>(url, {
    data: options?.body,
  });
  return result;
};

export const mutate = async <T>(
  url: string,
  payload: Record<string, any>,
  headers?: Record<string, any>,
): Promise<T> => {
  const { data } = await axiosInstance.post<T>(url, payload, { headers });
  return data;
};
