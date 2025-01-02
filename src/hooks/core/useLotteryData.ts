// hook to get details about the lottery data

import React, { ReactNode } from "react";
import useJackpotContract from "@/abi/Jackpot";
import useJPMContract from "@/abi/JourneyPhaseManager";
import { useEffect, useMemo, useState } from "react";
import {
  useAccount,
  useConfig,
  useReadContract,
  useReadContracts,
  useWriteContract,
} from "wagmi";
import { useGQLFetch } from "../api/useGraphQLClient";
import { gql } from "graphql-request";
import { useRestFetch, useRestPost } from "../api/useRestClient";
import useDarkContract from "@/abi/Dark";
import { formatUnits, zeroAddress } from "viem";

const tableDataTemplate = [
  ["big", "10%", 0, 0],
  ["bigger", "30%", 0, 0],
  ["biggest", "60%", 0, 0],
];

const useLotteryData = () => {
  const account = useAccount();

  // fetch jackpot dark balance
  const JackpotContract = useJackpotContract();
  const DarkContract = useDarkContract();
  const JPMContract = useJPMContract();

  const { data: jackpotBalanceData, isFetched: jackpotBalanceFetched } =
    useReadContract({
      address: DarkContract?.address,
      abi: DarkContract?.abi,
      functionName: "balanceOf",
      args: [JackpotContract?.address as `0x${string}`],
    });

  const { data: jackpotPending, isFetched: jackpotPendingFetched } =
    useReadContract({
      address: JackpotContract?.address,
      abi: JackpotContract?.abi,
      functionName: "totalPendingPayout",
    });

  const { data: latestPayout } = useGQLFetch<{
    lotteryResults: {
      items: {
        journeyId: string;
        lotteryId: string;
        payout: string;
      }[];
    };
  }>(
    ["latest payout"],
    gql`
      query Query {
        lotteryResults(orderBy: "timestamp", orderDirection: "desc", limit: 1) {
          items {
            journeyId
            lotteryId
            payout
          }
        }
      }
    `,
    {},
  );

  // memo to calculate jackpot balance by subtracting jackpotPending from jackpotBalanceData both are BigInt
  const jackpotBalance: number = useMemo(() => {
    console.log({ jackpotBalanceData, jackpotPending });
    if (jackpotBalanceFetched && jackpotPendingFetched) {
      const jackpotTotal = Number(
        formatUnits((jackpotBalanceData as bigint) ?? BigInt(0), 18),
      );
      console.log({ jackpotTotal });
      const jackpotPendingTotal = Number(
        formatUnits((jackpotPending as bigint) ?? BigInt(0), 18),
      );
      return jackpotTotal - jackpotPendingTotal;
    }
    return 0;
  }, [
    jackpotBalanceData,
    jackpotPending,
    jackpotBalanceFetched,
    jackpotPendingFetched,
  ]);

  const { data: journeyData, isFetched: journeyDataFetched } = useGQLFetch<{
    journeyPhaseManager: {
      currentJourneyId: string;
    };
  }>(
    ["current journey"],
    gql`query {
        journeyPhaseManager(id: "${JPMContract.address}") {
            currentJourneyId
        }
    }
  `,
    {},
    { enabled: JPMContract.address !== zeroAddress },
  );

  const { data: activeNFTs, isFetched: fetchedActiveNFTs } = useReadContract({
    address: JPMContract?.address,
    abi: JPMContract.abi,
    functionName: "getActiveNftsInJourney",
    args: [BigInt(journeyData?.journeyPhaseManager?.currentJourneyId ?? 1)],
    query: {
      enabled: !!journeyData?.journeyPhaseManager?.currentJourneyId,
    },
  });

  // memo to calculate total fuel cells amount from active mints
  const totalFuelCells = useMemo(() => {
    if (fetchedActiveNFTs) {
      return activeNFTs;
    }
    return 0;
  }, [activeNFTs, fetchedActiveNFTs]);

  const tableData = useMemo(() => {
    if (jackpotBalance && totalFuelCells) {
      const result = tableDataTemplate.map((row) => {
        let totalJackpotBalance = jackpotBalance;
        const {
          journeyId,
          lotteryId: currentLotteryId,
          payout: currentPayout,
        } = latestPayout?.lotteryResults?.items[0] ?? {};

        const payout = Number(
          formatUnits(BigInt(currentPayout ?? "0") ?? BigInt(0), 18),
        );

        const [lotteryId, percentage, _1, _2] = row;
        const mappingLotteryToNumber = {
          big: 1,
          bigger: 2,
          biggest: 3,
        };

        let paid: boolean =
          Number(currentLotteryId) >= mappingLotteryToNumber[lotteryId as "big"];

        if (journeyId === journeyData?.journeyPhaseManager.currentJourneyId) {
          if (currentLotteryId === "1") {
            totalJackpotBalance += payout;
          } else if (currentLotteryId === "2") {
            totalJackpotBalance += payout + payout / 3;
          } else if (currentLotteryId === "3") {
            // 100 = 60 + 30 + 10
            totalJackpotBalance += payout + payout / 2 + payout / 6;
          }
        }
        const payoutValue =
          Number(
            (
              (totalJackpotBalance * Number(`${percentage}`.split("%")[0])) /
              100
            ).toFixed(3),
          ).toLocaleString() +
          " " +
          `(${percentage})`;
        // const totalFuelCellsSelected = ~~((totalFuelCells * 16) / 1000);

        return [lotteryId, paid ? `${payoutValue}` : payoutValue];
      });
      return result;
    }
    return tableDataTemplate.map((row) => {
      return [row[0], row[2]];
    });
  }, [jackpotBalance, totalFuelCells, latestPayout, journeyData]);

  return {
    jackpotBalance: jackpotBalance.toFixed(3), // limit to 3 decimal places
    totalFuelCellsInJourney: totalFuelCells,
    tableData,
  };
};

export default useLotteryData;
