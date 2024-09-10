import useJackpotContract from "@/abi/Jackpot";
import useJPMContract from "@/abi/JourneyPhaseManager";
import { useEffect, useMemo } from "react";
import { useAccount, useReadContract, useReadContracts } from "wagmi";

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
  const { data: JPMReadData } = useReadContracts({
    contracts: [
      "currentJourney",
      "currentPhase",
      "getNextPhaseTimestamp",
      "getNextJourneyTimestamp",
      "PHASE_1_DURATION",
      "PHASE_2_DURATION",
    ].map((functionName) => ({
      address: JPMContract.address,
      abi: JPMContract.abi,
      functionName,
    })),
  });

  const nextLotteryTimestamp = useMemo(() => {
    if (JPMReadData) {
      const currentJourney = Number(JPMReadData[0].result);
      const currentPhase = Number(JPMReadData[1].result);
      const nextPhaseTimestamp = Number(JPMReadData[2].result);
      const nextJourneyTimestamp = Number(JPMReadData[3].result);
      const PHASE_1_SECONDS = Number(JPMReadData[4].result);
      const PER_LOTTERY_SECONDS = Number(JPMReadData[5].result) / 3;
      console.log({ JPMReadData });
      const nextTimestamp = Number(JPMReadData[2].result);
      if (Number(currentPhase) === 1) {
        // start of lottery 1
        return nextTimestamp;
      } else {
        const now = ~~(new Date().getTime() / 1000); // convert current time to seconds

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

  return {
    currentJourney: Number(JPMReadData?.[0]?.result),
    nextLotteryTimestamp,
    currentLottery: 1,
  };
};

export default useLottery;
