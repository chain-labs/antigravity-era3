import { baseSepolia, pulsechain, pulsechainV4, sepolia } from "viem/chains";
import { CONTRACTS } from "../config";
import abi from "./abi.json";
import { useEffect, useState } from "react";
import { zeroAddress } from "viem";
import { TEST_NETWORK } from "@/constants/global";
import { getRainbowKitChainsFromPage } from "@/components/RainbowKit";
import { usePathname } from "next/navigation";

interface IContract {
  address?: `0x${string}`;
  abi?: any;
}

const contracts: Record<
  number,
  { address: `0x${string}` | undefined; abi: any }
> = {
  [sepolia.id]: {
    address: CONTRACTS[sepolia.id].journeyPhaseManager,
    abi,
  },
  [pulsechainV4.id]: {
    address: CONTRACTS[pulsechainV4.id].journeyPhaseManager,
    abi,
  },
  [pulsechain.id]: {
    address: CONTRACTS[pulsechain.id].journeyPhaseManager,
    abi,
  },
  [baseSepolia.id]: {
    address: CONTRACTS[baseSepolia.id].journeyPhaseManager,
    abi,
  },
};

const useJPMContract = () => {
  const [contract, setContract] = useState<IContract>({
    abi: {},
    address: zeroAddress,
  });
  const path = usePathname();

  useEffect(() => {
    const id = getRainbowKitChainsFromPage(path, TEST_NETWORK)[0].id;
    setContract(contracts[id]);
  }, [path]);

  return contract;
};

export default useJPMContract;
