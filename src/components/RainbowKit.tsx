"use client";

import { TEST_NETWORK } from "@/constants/global";
import { PROJECT_ID } from "@/constants/rainbowkit";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { baseSepolia, pulsechain, pulsechainV4, sepolia } from "viem/chains";
import { cookieStorage, createStorage, http, WagmiProvider } from "wagmi";
import React from "react";
import { usePathname } from "next/navigation";
import { ALCHEMY_KEY } from "@/constants";

const RainbowKit = ({ children }: React.PropsWithChildren) => {
  const config = getDefaultConfig({
    appName: "AGProject-ERA3",
    projectId: `${PROJECT_ID}`,
    // @ts-ignore
    chains: TEST_NETWORK ? [pulsechainV4] : [pulsechain],
    // ssr: true,
    storage: createStorage({ storage: cookieStorage }),
    transports: {
      [baseSepolia.id]: http(
        `https://base-sepolia.g.alchemy.com/v2/${ALCHEMY_KEY}`,
      ),
      [pulsechainV4.id]: http(`https://rpc-testnet-pulsechain.g4mm4.io`),
    },
  });

  const queryClient = new QueryClient();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider modalSize="compact">{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default RainbowKit;

// use this function to modify list of eligible chains for specific pages.
export const getRainbowKitChainsFromPage = (page: string, test: boolean) => {
  switch (page) {
    // add cases here for each custom page chains list
    default:
      return test ? [pulsechainV4] : [pulsechain];
  }
};
