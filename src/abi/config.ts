import { pulsechain, pulsechainV4, sepolia, baseSepolia } from "viem/chains";

type Address = `0x${string}`;

export const CONTRACTS: Record<
  number,
  {
    wishWell: Address;
    miningRig: Address;
    darkX: Address;
    darkClaims?: Address;
    dark?: Address;
    launchControlCenter?: Address;
    fuelCell?: Address;
    journeyPhaseManager?: Address;
    darkFaucet?: Address;
    treasury?: Address;
    jackpot?: Address;
    evilAddress?: Address;
  }
> = {
  [sepolia.id]: {
    miningRig: "0x020d3Ca9605bb17CC17Ea0DB2bFfed3fA0869fCF",
    darkX: "0xb1BF01E195D511509B12D980769351eF5255eE0f",
    // antigravity: "0xbf4d8CD1563E222e62354aE7daa64739FccE310f",
    darkClaims: "0x6b3099EfFF4dAE69e48240d88C141a7cfa793ae6",
    dark: "0x20E070c2e6eB00bC0ACFD801778a1BE24D5423c1",
    wishWell: "0x43F4cdC343f39EDD323C66492E9fdf3D72Df0eC0",
    fuelCell: "0x77fB461abB743497dc23EB1e2a4fdEfAc35aFfea",
    launchControlCenter: "0x09d12a40EbeA8F7860a32973D514E6b55d279a2c",
    journeyPhaseManager: "0xA2893EBA6461c7e9142Bd5781E53782927894d61",
    evilAddress: "0x86E29Dbd64F36a66d0Ddb96E2FF2A9d571fb41dB",
    treasury: "0xB52C954442f021D85Bd36103e742A07825a1af72",
    jackpot: "0x3446Fd1cAd7ABA32b998B757767Be19569f866d6",
    darkFaucet: "0x1792dedc1A50849041C063BFB686b8350DF9CD73",
  },
  [pulsechainV4.id]: {
    miningRig: "0x020d3Ca9605bb17CC17Ea0DB2bFfed3fA0869fCF",
    darkX: "0xb1BF01E195D511509B12D980769351eF5255eE0f",
    darkClaims: "0x6b3099EfFF4dAE69e48240d88C141a7cfa793ae6",
    wishWell: "0x43F4cdC343f39EDD323C66492E9fdf3D72Df0eC0",
    dark: "0x0f1F92f4925079c961DB8eB5eE665a99E0833B2d",
    fuelCell: "0x4a694e1CB123d090c25Faad6b57C0FEC87Da769A",
    launchControlCenter: "0x1f15aDB031a33B844A16D8aEf3BBae7F1cce6b66",
    journeyPhaseManager: "0xbfB3a90ecD78717a633AF520d4D23019970BC8F5",
    evilAddress: "0x42869c19ae0c9da1CE77f816E9816a53B405666B",
    treasury: "0x343a5629C67b535bC1DC1b4c4a689E81142C4D49",
    jackpot: "0x877872EBE59336a8cE85F4c6b2CD532ad5eC2eD4",
    darkFaucet: "0x44D16EEDD56D039f7a5Fe893e5e2575c026a713f",
  },
  [pulsechain.id]: {
    miningRig: "0x1Eca1A64E18E72c46971a80D91F015a569FE9FBd",
    darkX: "0xCC18F40724971Be55AB5508607d8024Ee9Bf8796",
    wishWell: "0x332211A407489F497cD58bac7Db3F10Da5da47Ff",
  },
  [baseSepolia.id]: {
    miningRig: "0x8Dea737AE483153c69934ff8a5c7E3D448c2DB4C",
    darkX: "0xdE87E198D2A5d6894a03AfCb34876601A6dd226f",
    // antigravity: "0xe2150da9bCe4B63f89Ebf61cD3f89EB7f3fB3F05",
    // darkClaims: "null",
    dark: "0x1769B01F1776F2E9CC22C98e4be3d562E03E8705",
    wishWell: "0xC8A96A9163C2D11e2002C589a5DC7Ee4267499e2",
    fuelCell: "0x74F9479B29CFb52Db30D76ffdD5F192a73BAD870",
    launchControlCenter: "0x0A360F39E9C8A634C1E0eaEd622E18B014E2d1e6",
    journeyPhaseManager: "0x0f496eB239dCAA2fE7c8adbfb022a13208b06607",
    evilAddress: "0xE605E10AcA864203CC6219E5b5D63F146fe36b3B",
    treasury: "0xE175CC8C24b3FaC86d0D6b65c5fE7DdA26B614cA",
    jackpot: "0x4C6C7B04725ED964305F0C15391594f539242cD8",
    darkFaucet: "0x0a6017B12036e0527e6A3BAaB21676da8D7BE51f",
  },
};
