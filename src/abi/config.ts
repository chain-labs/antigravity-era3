import {
  base,
  baseSepolia,
  pulsechain,
  pulsechainV4,
  sepolia,
} from "viem/chains";

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
    dark: "0x285015Bc0119a0F4d44aB303F3c8c641750A8Bb4",
    wishWell: "0x43F4cdC343f39EDD323C66492E9fdf3D72Df0eC0",
    fuelCell: "0xc7B9AD1166B7EE4a5b3c34044E3ee35a2fFaea19",
    launchControlCenter: "0x263EFF4fb803e3441D62209fcE89679f68880C13",
    journeyPhaseManager: "0xbe0EC9Ea1dd76c0B4f4b613Cd63f8d53c39eD20b",
    evilAddress: "0xFeC8b2A0442D7f6bA2716C736fd0A10A8a13fc15",
    treasury: "0x50717f895A219A2C8A8511ea46Ab6CD2D6eC4Edd",
    jackpot: "0xAB9a76607C00c8BCC87367A82c5969E5361dC769",
    darkFaucet: "0x520DA2fEd1fe66E5483d46d2CBA0797d78f2D60a",
  },
  [baseSepolia.id]: {
    miningRig: "0x8Dea737AE483153c69934ff8a5c7E3D448c2DB4C",
    darkX: "0xdE87E198D2A5d6894a03AfCb34876601A6dd226f",
    dark: "0x22e896BE411C1FC4a18945880585172cE2C7Efc9",
    wishWell: "0xC8A96A9163C2D11e2002C589a5DC7Ee4267499e2",
    fuelCell: "0xff2ad9E8A6F86b1EFD250Ccb60E098EF49D87c55",
    launchControlCenter: "0x3597936252158be0cb3720a6e18B4c7006c350a6",
    journeyPhaseManager: "0x852eC407240B3D3059AD58D8CF5897332A2ce907",
    evilAddress: "0x02a5C61F0E78D8B1eBdca7346654D3d2fFDA5588",
    treasury: "0x5C0CB2f806Bfe9827709853BE7d950921Fac420E",
    jackpot: "0x557913C038C51a8f976a4De8032Bea92e8DeB4F3",
    darkFaucet: "0xde199d27867f42b0F96614FcFe107Fabae19091c",
  },
  [pulsechain.id]: {
    miningRig: "0x1Eca1A64E18E72c46971a80D91F015a569FE9FBd",
    darkX: "0xCC18F40724971Be55AB5508607d8024Ee9Bf8796",
    wishWell: "0x332211A407489F497cD58bac7Db3F10Da5da47Ff",
  },
  [base.id]: {
    miningRig: "0x698Ae58B7AB13ad232A84d684e8111D2c6A6d904",
    darkX: "0xb070db7dCad8F5081c3e9033633782258fCa811c",
    wishWell: "0x332211A407489F497cD58bac7Db3F10Da5da47Ff",
  },
};
