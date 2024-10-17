"use client";

import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { http, WagmiProvider } from "wagmi";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  pulsechainV4,
  pulsechain,
} from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { PROJECT_ID } from "@/constants";

export const getRainbowKitChainsFromPage = (page: string, test: boolean) => {
  switch (page) {
    // add cases here for each custom page chains list
    default:
      return test ? [pulsechainV4] : [pulsechain];
  }
};

const config = getDefaultConfig({
  appName: "AGPROJECT.io TOOLS",
  projectId: PROJECT_ID ?? "",
  chains: [pulsechainV4],
  ssr: true, // If your dApp uses server side rendering (SSR)
  transports: {
    [pulsechainV4.id]: http("https://rpc-testnet-pulsechain.g4mm4.io"),
  },
});

const queryClient = new QueryClient();

export const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
