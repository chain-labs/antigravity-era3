import { toBoolean } from "./utils";

export const TEST_NETWORK = toBoolean(process.env.NEXT_PUBLIC_TEST_NETWORK);
