// hook to get details about the lottery data

import React from "react";
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

  // memo to calculate jackpot balance by subtracting jackpotPending from jackpotBalanceData both are BigInt
  const jackpotBalance: number = useMemo(() => {
    const jackpotTotal = Number(
      formatUnits((jackpotBalanceData as bigint) ?? BigInt(0), 18),
    );
    const jackpotPendingTotal = Number(
      formatUnits((jackpotPending as bigint) ?? BigInt(0), 18),
    );
    if (jackpotBalanceData && jackpotPending) {
      return jackpotTotal - jackpotPendingTotal;
    }
    return 0;
  }, [jackpotBalanceData, jackpotPending]);

  const { data: journeyData } = useGQLFetch<{
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

  const { data: activeMintsData } = useGQLFetch<{
    mints: {
      items: {
        journeyId: string;
        amount: string;
      }[];
    };
  }>(
    ["active fuel cells in journey"],
    gql`
      query MyQuery {
        mints(where: { journeyId: "${journeyData?.journeyPhaseManager?.currentJourneyId}" }) {
          items {
            journeyId
            amount
          }
        }
      }
    `,
    {},
    { enabled: !!journeyData?.journeyPhaseManager?.currentJourneyId },

    
  );

  // memo to calculate total fuel cells amount from active mints
  const totalFuelCells = useMemo(() => {
    if (activeMintsData?.mints?.items) {
      const totalFuelCells = activeMintsData?.mints?.items.reduce(
        (acc, curr) => acc + Number(curr.amount),
        0,
      );
      return totalFuelCells;
    }
    return 0;
  }, [activeMintsData]);

  const tableData = useMemo(() => {
    if (jackpotBalance && totalFuelCells) {
      const result = tableDataTemplate.map((row) => {
        const [lotteryId, percentage, _1, _2] = row;
        const payoutValue = Number(
          (
            (jackpotBalance * Number(`${percentage}`.split("%")[0])) /
            100
          ).toFixed(3),
        ).toLocaleString() + " " + `(${percentage})`;
        // const totalFuelCellsSelected = ~~((totalFuelCells * 16) / 1000);
        return [lotteryId, payoutValue];
      });
      return result;
    }
    return tableDataTemplate;
  }, [jackpotBalance, totalFuelCells]);

  return {
    jackpotBalance: jackpotBalance.toFixed(3), // limit to 3 decimal places
    totalFuelCellsInJourney: totalFuelCells,
    tableData,
  };
};

export default useLotteryData;
