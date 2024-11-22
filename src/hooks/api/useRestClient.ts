import { fetcher, mutate } from "@/api/restClient";
import {
  QueryKey,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

export const useRestFetch = <T>(
  tags: string[],
  endpoint: string,
  {
    proxy = false,
    select,
    enabled = true,
    data,
    deps,
  }: {
    proxy?: boolean;
    select?: (arg0: any) => any;
    enabled?: boolean;
    data?: string;
    deps?: any[];
  },
): UseQueryResult<T, Error> => {
  const [refetch, setRefetch] = useState(true);
  const result = useQuery<T, Error>({
    queryKey: [...tags],
    queryFn: () => fetcher<T>(endpoint, { proxy, body: data }),
    enabled: enabled && refetch,
  });
  useEffect(() => {
    setRefetch(true);
  }, deps);

  useEffect(() => {
    if (result.isFetched) {
      setRefetch(false);
    }
  }, [result.isFetched]);
  return result;
};

export const useRestPost = <T>(
  tags: string[],
  url: string,
): UseMutationResult<T, any, Record<string, any>, unknown> => {
  const queryClient = useQueryClient();
  const result = useMutation<T, any, Record<string, any>>({
    mutationKey: tags,
    mutationFn: (payload: Record<string, any>) => mutate<T>(url, payload),
    onError: (error: any) => {
      console.error(error);
      // errorToast(`Error: ${error.message}. Try again please.`);

      // TODO: Add Sentry logs here as well
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tags });
    },
  });
  return result;
};
