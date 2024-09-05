import { pulsechain, pulsechainV4, sepolia } from "viem/chains";

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
    darkClaims: "0x6b3099EfFF4dAE69e48240d88C141a7cfa793ae6",
    wishWell: "0x43F4cdC343f39EDD323C66492E9fdf3D72Df0eC0",
    dark: "0x0EC599d7bFfD9893A14D2a9C6A36A60818C29abc",
    fuelCell: "0x2321C1A41e42F3582c4bcAaf95A081a224B929a9",
    journeyPhaseManager: "0xf504f8924b529d817687fC7B85e12DC0c99E57d4",
    launchControlCenter: "0x6484A6Ae44Cfa051a1158C918446D08D12fC4168",
    treasury: "0xB52C954442f021D85Bd36103e742A07825a1af72",
    jackpot: "0x3446Fd1cAd7ABA32b998B757767Be19569f866d6",
    evilAddress: "0xF8230239e89EA15dDb957aFE6e9EA541Fb36b49f",
    darkFaucet: "0x319c6427688D0F1c7AfC282d21dD0bDE5F56d354",
  },
  [pulsechainV4.id]: {
    miningRig: "0x020d3Ca9605bb17CC17Ea0DB2bFfed3fA0869fCF",
    darkX: "0xb1BF01E195D511509B12D980769351eF5255eE0f",
    darkClaims: "0x6b3099EfFF4dAE69e48240d88C141a7cfa793ae6",
    wishWell: "0x43F4cdC343f39EDD323C66492E9fdf3D72Df0eC0",
    dark: "0x7E2c3b73b11B1A98b89311F89d90d3E44F2F1d9A",
    fuelCell: "0xA24729d991f8c1495D43327F671d528590B95Fef",
    journeyPhaseManager: "0xa3B69dD8ec32eE1DEC5A3fD7c99563C276Fc935C",
    launchControlCenter: "0x4fafDb3DbEC7eDaF39042a25C79Db09E0d30aB07",
    treasury: "0x21B6D8047Af30518776805929C51e4aABA719CD6",
    jackpot: "0x4B77E262194a8121115ED2e5C4715577bCC04eE7",
    evilAddress: "0xb2Edf843f706ed30a850fF7b808D5b8857918fC3",
    darkFaucet: "0xD1c219164Cb517ef3E5E5A73A3FBEf188130348F",
  },
  [pulsechain.id]: {
    miningRig: "0x1Eca1A64E18E72c46971a80D91F015a569FE9FBd",
    darkX: "0xCC18F40724971Be55AB5508607d8024Ee9Bf8796",
    wishWell: "0x332211A407489F497cD58bac7Db3F10Da5da47Ff",
  },
};
