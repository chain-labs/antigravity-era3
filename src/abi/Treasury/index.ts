import { pulsechain, pulsechainV4, sepolia } from "viem/chains";
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
    address: CONTRACTS[sepolia.id].treasury,
    abi,
  },
  [pulsechainV4.id]: {
    address: CONTRACTS[pulsechainV4.id].treasury,
    abi,
  },
  [pulsechain.id]: {
    address: CONTRACTS[pulsechain.id].treasury,
    abi,
  },
};

const useTreasuryContract = () => {
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

export default useTreasuryContract;
