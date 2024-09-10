import { gqlFetcher, gqlMutate } from "@/api/graphqlClient";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGQLFetch = <T>(
  tags: string[],
  query: string,
  chainId: number,
  variables: Record<string, any>,
  options?: {
    enabled?: boolean;
    url?: string;
  },
) => {
  return useQuery<T>({
    queryKey: tags,
    queryFn: () => gqlFetcher(query, variables, chainId, options?.url),
    enabled: options?.enabled,
  });
};

export const useGQLMutate = <T>(
  tags: string[],
  query: string,
  chainId: number,
  variables: any,
) => {
  return useMutation<T>({
    mutationKey: tags,
    mutationFn: () => gqlMutate(query, variables, chainId),
  });
};
