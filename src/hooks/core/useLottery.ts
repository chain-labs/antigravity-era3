import useJackpotContract from "@/abi/Jackpot";
import useJPMContract from "@/abi/JourneyPhaseManager";
import { useEffect, useMemo, useState } from "react";
import {
  useAccount,
  useConfig,
  useReadContracts,
  useWriteContract,
} from "wagmi";
import { useGQLFetch } from "../api/useGraphQLClient";
import { gql } from "graphql-request";
import { useRestFetch, useRestPost } from "../api/useRestClient";
import axios from "axios";
import { API_ENDPOINT } from "@/constants";
import { createMerkleTreeForLottery } from "@/utils/merkletree";
import MerkleTree from "merkletreejs";
import { encodePacked, keccak256 } from "viem";
import toast from "react-hot-toast";
import { waitForTransactionReceipt } from "@wagmi/core";
import useEAContract from "@/abi/EvilAddress";

const PRUNE_BATCH_SIZE = 1;

const useLottery = (): {
  currentLottery: number;
  currentJourney: number;
  nextLotteryTimestamp: number;
  lotteryPayout: string;
  fuelCellsWon: number;
  batchPrune: () => void;
  pruneLoading: boolean;
  pruneBatch: { from: number; to: number; total: number };
  createMerkleTrees: () => Promise<Record<string, MerkleTree>>;
} => {
  const account = useAccount();
  const [pruneLoading, setPruneLoading] = useState(false);
  const [prePrune, setPrePrune] = useState(false);
  const [pruneBatch, setPruneBatch] = useState({ from: 0, to: 50, total: 50 });

  // define contract instances here
  const JPMContract = useJPMContract();
  const JackpotContract = useJackpotContract();
  const EAContract = useEAContract();

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
      {},
    );

  const { data: lotteryPayouts, isFetched: lotteryPayoutsFetched } =
    useGQLFetch<{
      lotteryResults: {
        journeyId: string;
        lotteryId: string;
        payoutPerFuelCell: string;
      }[];
    }>(
      ["lottery payouts"],
      gql`
        query GetLotteryPayouts {
          lotteryResults {
            journeyId
            lotteryId
            payoutPerFuelCell
          }
        }
      `,
      {},
    );

  // const { data: lotteryWinners, isFetched: lotteryWinnersFetched } =
  //   useRestFetch(["all winners of lottery"], "/api/lottery-results", {});

  const {
    data: userWinnings,
    isFetched: userWinningsFetched,
    error: userWinningsError,
  } = useRestFetch<{
    lotteryResult: {
      isPruned: boolean;
      journeyId: number;
      lotteryId: number;
      tokenId: number;
      walletAddress: string;
    }[];
    uniqueCombinationTokens: {
      journeyId: number;
      lotteryId: number;
      tokenId: number;
    }[];
  }>(
    ["User Winnings in current lottery"],
    `/api/lottery-result?walletAddress=${EAContract.address}`,
    // `/api/lottery-result?walletAddress=${account.address}`,
    {
      enabled: account.isConnected,
    },
  );

  const lotteriesWon = useMemo(() => {
    if (userWinningsFetched) {
      console.log({ userWinnings });
      const uniqueLotteries = [
        ...new Set(
          userWinnings?.lotteryResult?.map(
            (item) => `${item.journeyId}_${item.lotteryId}`,
          ),
        ),
      ].map((pair) => ({
        ...pair.split("_").reduce(
          (acc, curr, index) => ({
            ...acc,
            [index === 0 ? "journeyId" : "lotteryId"]: Number(curr),
          }),
          {},
        ),
        count: userWinnings?.lotteryResult?.filter(
          (item) =>
            item.journeyId === Number(pair.split("_")[0]) &&
            item.lotteryId === Number(pair.split("_")[1]),
        ).length,
      })) as { journeyId: number; lotteryId: number; count: number }[];

      return uniqueLotteries;
    }
    return [];
  }, [userWinnings, userWinningsFetched]);

  const totalWinnings = useMemo(() => {
    if (lotteryPayouts && lotteriesWon) {
      const payouts = lotteryPayouts.lotteryResults;
      let sum = BigInt(0);

      lotteriesWon.map((lottery) => {
        const { lotteryId, journeyId, count } = lottery;
        const payoutItem = payouts.find(
          (item) =>
            Number(item.journeyId) === journeyId &&
            Number(item.lotteryId) === lotteryId,
        );
        if (payoutItem) {
          const payout = BigInt(payoutItem.payoutPerFuelCell);
          sum += BigInt(count) * payout;
        }
      });
      return sum.toString();
    }

    return "0";
  }, [lotteriesWon, lotteryPayouts]);

  const createMerkleTrees = async (): Promise<Record<string, MerkleTree>> => {
    try {
      let lotteryTrees2 = {};

      lotteriesWon.forEach((lottery) => {
        const list =
          userWinnings?.uniqueCombinationTokens.filter(
            (item) =>
              item.lotteryId === lottery.lotteryId &&
              item.journeyId === lottery.journeyId,
          ) ?? [];
        lotteryTrees2 = {
          ...lotteryTrees2,
          [`${lottery.journeyId}_${lottery.lotteryId}`]:
            createMerkleTreeForLottery(list),
        };
      });

      // lotteriesWon.forEach((lottery) => {});

      return lotteryTrees2;
    } catch (err) {
      console.log({ err });
      return {};
    }
  };

  const {
    writeContractAsync: batchPruneWinnings,
    error: batchPruneError,
    data: batchPruneHash,
  } = useWriteContract();

  // const { data: batchPruneReceipt } = useWaitForTransactionReceipt({
  //   hash: batchPruneHash,
  // });

  useEffect(() => {
    if (batchPruneError) {
      console.log({ batchPruneError });
      setPrePrune(false);
      setPruneLoading(false);
      toast.error("Could not prune you winnings. Try Again");
    }
  }, [batchPruneError]);

  useEffect(() => {
    if (batchPruneHash) {
      // setPrePrune(false);
      // setPruneLoading(false);
      // toast.success("Winnings pruned successfully");
      console.log({ batchPruneHash });
    }
  }, [batchPruneHash]);

  const config = useConfig();

  const { mutateAsync: syncPrune } = useRestPost(["sync prune"], "/api/prune");

  const batchPrune = async () => {
    setPruneLoading(true);
    setPrePrune(true);
    const trees = await createMerkleTrees();

    let proofs =
      userWinnings?.lotteryResult?.map((win) => {
        const { lotteryId, tokenId, journeyId } = win;
        const merkleTree = trees[`${journeyId}_${lotteryId}`];

        const leaf = keccak256(
          encodePacked(
            ["uint256", "uint16", "uint16"],
            [BigInt(tokenId), journeyId, lotteryId],
          ),
        );

        const proof = merkleTree.getHexProof(leaf);
        return [{ journeyId, lotteryId, proofs: proof }];
      }) ?? [];

    const tokenIds =
      userWinnings?.lotteryResult?.map(({ tokenId }) => tokenId) ?? [];

    const chunkSize = PRUNE_BATCH_SIZE;
    const START_INDEX = 0;
    for (let i = START_INDEX; i < proofs.length; i += chunkSize) {
      const proofsChunk = proofs.slice(i, i + chunkSize);
      const tokenIdsChunk = tokenIds.slice(i, i + chunkSize);
      console.log({ proofsChunk, tokenIdsChunk });
      setPruneBatch({
        from: i + 1,
        to: i + chunkSize,
        total: proofs.length,
      });
      console.log({
        proofSize: (() => {
          let len = 0;
          proofsChunk.forEach((proof) => {
            len += proof[0].proofs.length;
          });
          return len;
        })(),
      });

      const tx = await batchPruneWinnings({
        address: JackpotContract.address as `0x${string}`,
        abi: JackpotContract.abi,
        functionName: "batchPruneWinning",
        args: [proofsChunk, tokenIdsChunk],
        gas: BigInt(30000000),
      });

      const receipt = await waitForTransactionReceipt(config, {
        hash: tx,
        confirmations: 2,
      });
      console.log({ receipt });
    }
    await syncPrune({ walletAddress: account.address });
    setPruneLoading(false);
  };

  return {
    currentJourney: Number(
      latestLotteryResultData?.lotteryResults?.[0]?.journeyId ?? 1,
    ),
    nextLotteryTimestamp,
    currentLottery: Number(
      latestLotteryResultData?.lotteryResults?.[0]?.lotteryId ?? 1,
    ),
    lotteryPayout: totalWinnings,
    fuelCellsWon: userWinnings?.lotteryResult?.length ?? 0,
    pruneLoading,
    pruneBatch,
    batchPrune,
    createMerkleTrees,
  };
};

export default useLottery;
