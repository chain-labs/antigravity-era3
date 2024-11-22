export const IMAGEKIT = `${process.env.NEXT_PUBLIC_IMAGEKIT_BASE_URL}`;
export const SUBGRAPH_URL = `${process.env.NEXT_PUBLIC_SUBGRAPH_URL}`;
export const API_ENDPOINT = `${process.env.NEXT_PUBLIC_API_ENDPOINT}`;
export const ALCHEMY_KEY = `${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`;

export const EVIL_ADDRESS_AVAILABLE =
  process.env.NEXT_PUBLIC_EVIL_ADDRESS_AVAILABLE === "true";

export const UNWRAP_AVAILABLE =
  process.env.NEXT_PUBLIC_UNWRAP_AVAILABLE === "true";

export const AGPROJECT_LINK = `${process.env.NEXT_PUBLIC_PROD_SITE}`; // PROD-TODO: update this

export const BACKGROUNDS = {
  LOTTERY: process.env.NEXT_PUBLIC_LOTTERY_BG,
  TREASURY: process.env.NEXT_PUBLIC_TREASURY_BG,
  EVIL_ADDRESS: process.env.NEXT_PUBLIC_EVIL_ADDRESS_BG,
  UNWRAP: process.env.NEXT_PUBLIC_UNWRAP_BG,
};

export const lotteryBuffer = Number(
  process.env.NEXT_PUBLIC_LOTTERY_BUFFER ?? "0",
);

export const PROJECT_ID = process.env.NEXT_PUBLIC_WALLET_CONNECT_PID;
