"use client";

import { TEST_NETWORK } from "@/constants/global";
import { PROJECT_ID } from "@/constants/rainbowkit";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { pulsechain, pulsechainV4, sepolia } from "viem/chains";
import { WagmiProvider } from "wagmi";
import React from "react";
import { usePathname } from "next/navigation";

const RainbowKit = ({ children }: React.PropsWithChildren) => {
  const path = usePathname();

  const config = getDefaultConfig({
    appName: "AGProject-ERA3",
    projectId: `${PROJECT_ID}`,
    // @ts-ignore
    chains: getRainbowKitChainsFromPage(path, TEST_NETWORK),
    ssr: true,
  });

  const queryClient = new QueryClient();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default RainbowKit;

// use this function to modify list of eligible chains for specific pages.
const getRainbowKitChainsFromPage = (page: string, test: boolean) => {
  console.log({ page, test });
  switch (page) {
    // add cases here for each custom page chains list
    case "/lottery":
      return test ? [sepolia] : [pulsechain];
    default:
      return test ? [pulsechainV4] : [pulsechain];
  }
};
