import { SUBGRAPH_URL } from "@/constants";
import { gql, request } from "graphql-request";
import { base, baseSepolia, pulsechain, sepolia } from "viem/chains";

export const gqlFetcher = async <T>(
  query: string,
  variables: Record<string, any>,
  chainId: number,
  url?: string,
): Promise<T> => {
  //   const document = gql(query);
  const data = await request<T>(url ?? SUBGRAPH_URL, query, variables);
  return data;
};

export const gqlMutate = async <T>(
  query: string,
  variables: Record<string, any>,
  chainId: number,
  url?: string,
): Promise<T> => {
  //   const document = gql(query);
  const data = await request<T>(url ?? SUBGRAPH_URL, query, variables);
  return data;
};