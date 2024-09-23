"use client";

import { TEST_NETWORK } from "@/constants/global";
import { PROJECT_ID } from "@/constants/rainbowkit";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { baseSepolia, pulsechain, pulsechainV4, sepolia } from "viem/chains";
import { cookieStorage, createStorage, WagmiProvider } from "wagmi";
import React from "react";
import { usePathname } from "next/navigation";

const RainbowKit = ({ children }: React.PropsWithChildren) => {
  const config = getDefaultConfig({
    appName: "AGProject-ERA3",
    projectId: `${PROJECT_ID}`,
    // @ts-ignore
    chains: TEST_NETWORK ? [baseSepolia] : [pulsechain],
    ssr: true,
    storage: createStorage({ storage: cookieStorage }),
  });

  const queryClient = new QueryClient();

  return (
    <WagmiProvider config={config} reconnectOnMount={true}>
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
      return test ? [baseSepolia] : [pulsechain];
  }
};
