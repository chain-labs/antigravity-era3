import { baseSepolia, pulsechain, pulsechainV4, sepolia } from "viem/chains";

interface IContract {
  address?: `0x${string}`;
  abi?: any;
}

import abi from "./abi.json";
import { CONTRACTS } from "../config";
import { useEffect, useState } from "react";
import { zeroAddress } from "viem";
import { usePathname } from "next/navigation";
import { getRainbowKitChainsFromPage } from "@/components/RainbowKit";
import { TEST_NETWORK } from "@/constants/global";

const contracts: Record<
  number,
  { address: `0x${string}` | undefined; abi: any }
> = {
  [sepolia.id]: {
    address: CONTRACTS[sepolia.id].fuelCell,
    abi,
  },
  [pulsechainV4.id]: {
    address: CONTRACTS[pulsechainV4.id].fuelCell,
    abi,
  },
  [pulsechain.id]: {
    address: CONTRACTS[pulsechain.id].fuelCell,
    abi,
  },
  [baseSepolia.id]: {
    address: CONTRACTS[baseSepolia.id].fuelCell,
    abi,
  },
};

const useFuelCellContract = (): IContract => {
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

export default useFuelCellContract;
