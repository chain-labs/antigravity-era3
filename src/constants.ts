export const IMAGEKIT = "https://ik.imagekit.io/qvs5pk2dl/Antigravity";
export const SUBGRAPH_URL = `${process.env.NEXT_PUBLIC_SUBGRAPH_URL}`;
export const API_ENDPOINT = `${process.env.NEXT_PUBLIC_API_ENDPOINT}`;
export const ALCHEMY_KEY = `${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`;

export const EVIL_ADDRESS_AVAILABLE =
  process.env.NEXT_PUBLIC_EVIL_ADDRESS_AVAILABLE === "true";

export const UNWRAP_AVAILABLE =
  process.env.NEXT_PUBLIC_UNWRAP_AVAILABLE === "true";

export const AGPROJECT_LINK = "https://test.agproject.io";

export const BACKGROUNDS = {
  LOTTERY: process.env.NEXT_PUBLIC_LOTTERY_BG,
  TREASURY: process.env.NEXT_PUBLIC_TREASURY_BG,
  EVIL_ADDRESS: process.env.NEXT_PUBLIC_EVIL_ADDRESS_BG,
  UNWRAP: process.env.NEXT_PUBLIC_UNWRAP_BG,
};
