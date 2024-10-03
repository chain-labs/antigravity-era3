import useFuelCellContract from "@/abi/FuelCell";
import useJPMContract from "@/abi/JourneyPhaseManager";
import useTreasuryContract from "@/abi/Treasury";
import { useEffect, useMemo } from "react";
import { formatUnits } from "viem";
import { useAccount, useReadContract } from "wagmi";
import { useGQLFetch } from "../api/useGraphQLClient";
import { gql } from "graphql-request";
import useEAContract from "@/abi/EvilAddress";

const useTreasury = () => {
  const FuelCellsContract = useFuelCellContract();
  const TreasuryContract = useTreasuryContract();
  const JPMContract = useJPMContract();

  const account = useAccount();

  const { data: yieldDistributedData, isFetched: yieldDistributedFetched } =
    useReadContract({
      address: TreasuryContract.address as `0x${string}`,
      abi: TreasuryContract.abi,
      functionName: "totalYieldAllocated",
    });
  const { data: fuelCellsSupplyData, isFetched: fuelCellsFetched } =
    useReadContract({
      address: FuelCellsContract.address as `0x${string}`,
      abi: FuelCellsContract.abi,
      functionName: "totalSupply",
    });

  const { data: currentPhase, isFetched: currentPhaseFetched } =
    useReadContract({
      address: JPMContract.address as `0x${string}`,
      abi: JPMContract.abi,
      functionName: "currentPhase",
    });

  const isMintActive: boolean = useMemo(() => {
    if (currentPhaseFetched) {
      console.log({ currentPhase });
      const phase = Number(currentPhase);
      if (phase === 1) {
        return true;
      }
      return false;
    }

    return false;
  }, [currentPhase, currentPhaseFetched]);

  const { data: nextMintTimestampData, isFetched: nextMintTimestampFetched } =
    useReadContract({
      address: JPMContract.address as `0x${string}`,
      abi: JPMContract.abi,
      functionName: "getNextJourneyTimestamp",
      query: {
        enabled: !isMintActive,
      },
    });

  const { data: nextPhaseTimestampData, isFetched: nextPhaseTimestampFetched } =
    useReadContract({
      address: JPMContract.address as `0x${string}`,
      abi: JPMContract.abi,
      functionName: "getNextPhaseTimestamp",
      query: {
        enabled: isMintActive,
      },
    });

  const totalYieldDistributed = useMemo(() => {
    if (yieldDistributedFetched) {
      return Number(
        formatUnits((yieldDistributedData as bigint) ?? BigInt(0), 18),
      );
    }
    return 0;
  }, [yieldDistributedData, yieldDistributedFetched]);

  const fuelCellSupply = useMemo(() => {
    if (fuelCellsFetched) {
      return Number(fuelCellsSupplyData);
    }
  }, [fuelCellsSupplyData, fuelCellsFetched]);

  const nextMintTimestamp = useMemo(() => {
    if (nextMintTimestampFetched) {
      return Number(nextMintTimestampData);
    }

    return ~~(new Date().getTime() / 1000);
  }, [nextMintTimestampData, nextMintTimestampFetched]);

  const nextPhaseTimestamp = useMemo(() => {
    if (nextPhaseTimestampFetched) {
      return Number(nextPhaseTimestampData);
    }

    return ~~(new Date().getTime() / 1000);
  }, [nextPhaseTimestampData, nextPhaseTimestampFetched]);

  const { data: userMintData, isLoading: userMintDataLoading } = useGQLFetch<{
    user: { address: string; mints: { items: { amount: string }[] } };
  }>(
    ["totalMintedUser"],
    gql`
      query MyQuery {
        user(id: "${account.address}") {
          address
          mints {
            items {
              amount
            }
          }
        }
      }
    `,
    {},
    { enabled: !!account.address },
  );

  const userMinted = useMemo(() => {
    if (!userMintDataLoading) {
      console.log({ userMintData });
      const mints =
        userMintData?.user.mints.items.map((mint) => mint.amount) ?? [];

      let total = 0;
      mints.forEach((mint) => {
        total += Number(mint);
      });
      return total;
    }

    return 0;
  }, [userMintDataLoading, userMintData]);

  const { data: lotteryWinnings, isLoading: lotteryWinningsLoading } =
    useGQLFetch<{
      user: { address: string; mints: { items: { amount: string }[] } };
    }>(
      ["totalMintedUser"],
      gql`
        query MyQuery {
          lotteryResults {
            items {
              payoutPerFuelCell
              lotteryId
              journeyId
              jackpotId
            }
          }
        }
      `,
      {},
      { enabled: !!account.address },
    );

  const userYield = useMemo(() => {}, [
    lotteryWinningsLoading,
    lotteryWinnings,
  ]);

  return {
    fuelCellSupply,
    totalYieldDistributed,
    isMintActive,
    nextMintTimestamp,
    nextPhaseTimestamp,
    userMinted,
  };
};

export default useTreasury;