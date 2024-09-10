import useJackpotContract from "@/abi/Jackpot";
import useJPMContract from "@/abi/JourneyPhaseManager";
import { useEffect, useMemo } from "react";
import { useAccount, useReadContract, useReadContracts } from "wagmi";
import { useGQLFetch } from "../api/useGraphQLClient";
import { gql } from "graphql-request";
import { getRainbowKitChainsFromPage } from "@/components/RainbowKit";
import { TEST_NETWORK } from "@/constants/global";
import { useRestFetch } from "../api/useRestClient";

const useLottery = (): {
  currentLottery: number;
  currentJourney: number;
  nextLotteryTimestamp: number;
} => {
  const account = useAccount();

  // define contract instances here
  const JPMContract = useJPMContract();
  const JackpotContract = useJackpotContract();

  // Reads from contracts
  const { data: JPMReadData, error: JPMReadError } = useReadContracts({
    contracts: [
      "currentJourney",
      "currentPhase",
      "getNextPhaseTimestamp",
      "getNextJourneyTimestamp",
      "PHASE_1_DURATION",
      "PHASE_2_DURATION",
    ].map((functionName) => ({
      address: JPMContract?.address,
      abi: JPMContract?.abi,
      functionName,
    })),
  });

  const nextLotteryTimestamp = useMemo(() => {
    if (JPMReadData) {
      const currentJourney = Number(JPMReadData[0].result);
      const currentPhase = Number(JPMReadData[1].result);
      const nextJourneyTimestamp = Number(JPMReadData[3].result);
      const PHASE_1_SECONDS = Number(JPMReadData[4].result);
      const PER_LOTTERY_SECONDS = Number(JPMReadData[5].result) / 3;
      const nextTimestamp = Number(JPMReadData[2].result);
      const now = ~~(new Date().getTime() / 1000); // convert current time to seconds
      if (Number(currentPhase) === 1) {
        // start of lottery 1
        return nextTimestamp;
      } else {
        // start of lottery 2
        let currentPhaseStart =
          nextTimestamp - PER_LOTTERY_SECONDS * 3 + PER_LOTTERY_SECONDS;
        if (currentPhaseStart > now) {
          return currentPhaseStart;
        }

        // start of lottery 3
        currentPhaseStart += PER_LOTTERY_SECONDS;
        if (currentPhaseStart > now) {
          return currentPhaseStart;
        }

        // start of next journey lottery 1
        return nextJourneyTimestamp + PHASE_1_SECONDS;
      }
    }

    // default to 0
    return 0;
  }, [JPMReadData]);

  const { data: latestLotteryResultData, isFetched: latestLotteryFetched } =
    useGQLFetch<{
      lotteryResults: {
        journeyId: string;
        lotteryId: string;
        timestamp: string;
        uri: string;
      }[];
    }>(
      ["latest lottery"],
      gql`
        query getLatestLottery {
          lotteryResults(orderBy: timestamp, orderDirection: desc, first: 1) {
            journeyId
            lotteryId
            timestamp
            uri
          }
        }
      `,
      getRainbowKitChainsFromPage("/lottery", TEST_NETWORK)[0].id,
      {},
    );

  useEffect(() => {
    if (latestLotteryFetched) {
      const lotteryResults = latestLotteryResultData?.lotteryResults?.[0];
      console.log({
        journeyId: lotteryResults?.journeyId,
        lotteryId: lotteryResults?.lotteryId,
        latestLotteryResultData,
      });
    }
  }, [latestLotteryFetched, latestLotteryResultData]);

  const { data: lotteryWinners, isFetched: lotteryWinnersFetched } =
    useRestFetch(["all winners of lottery"], "/api/lottery-results", {});

  const {
    data: userWinnings,
    isFetched: userWinningsFetched,
    error: userWinningsError,
  } = useRestFetch(
    ["User Winnings in current lottery"],
    "/api/lottery-result",
    {
      data: JSON.stringify({
        walletAddress: account.address,
        journeyId: latestLotteryResultData?.lotteryResults?.[0]?.journeyId,
        lotteryId: latestLotteryResultData?.lotteryResults?.[0]?.lotteryId,
      }),
      enabled: latestLotteryFetched,
    },
  );

  useEffect(() => {
    if (userWinningsFetched) {
      console.log({ userWinnings });
    }
    if (userWinningsError) {
      console.log({ userWinningsError });
    }
  }, [userWinnings, userWinningsFetched, userWinningsError]);

  return {
    currentJourney: Number(
      latestLotteryResultData?.lotteryResults?.[0]?.journeyId ?? 1,
    ),
    nextLotteryTimestamp,
    currentLottery: Number(
      latestLotteryResultData?.lotteryResults?.[0]?.lotteryId ?? 1,
    ),
  };
};

export default useLottery;
