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
import { useRestFetch } from "../api/useRestClient";
import axios from "axios";
import { API_ENDPOINT } from "@/constants";
import { createMerkleTreeForLottery } from "@/utils/merkletree";
import MerkleTree from "merkletreejs";
import { encodePacked, keccak256 } from "viem";
import toast from "react-hot-toast";
import { waitForTransactionReceipt } from "@wagmi/core";

const PRUNE_BATCH_SIZE = 2;

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
  } = useRestFetch<
    {
      isPruned: boolean;
      journeyId: number;
      lotteryId: number;
      tokenId: number;
      walletAddress: string;
    }[]
  >(
    ["User Winnings in current lottery"],
    `/api/lottery-result?walletAddress=${account.address}`,
    {
      enabled: !!account.address,
    },
  );

  const lotteriesWon = useMemo(() => {
    if (userWinningsFetched) {
      const uniqueLotteries = [
        ...new Set(
          userWinnings?.map((item) => `${item.journeyId}_${item.lotteryId}`),
        ),
      ].map((pair) => ({
        ...pair.split("_").reduce(
          (acc, curr, index) => ({
            ...acc,
            [index === 0 ? "journeyId" : "lotteryId"]: Number(curr),
          }),
          {},
        ),
        count: userWinnings?.filter(
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
      const responses = await Promise.all(
        lotteriesWon.map((lottery) =>
          axios.get(
            `${API_ENDPOINT}/api/all-lottery-results?journeyId=${lottery.journeyId}&lotteryId=${lottery.lotteryId}`,
          ),
        ),
      );

      // create merkle trees for all the responses
      let lotteryTrees = {};
      responses.forEach((entry) => {
        lotteryTrees = {
          ...lotteryTrees,
          [`${entry.data?.[0].journeyId}_${entry.data?.[0]?.lotteryId}`]:
            createMerkleTreeForLottery(entry.data),
        };
      });
      return lotteryTrees;

      // setLotteryTrees(lotteryTrees);
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

  const batchPrune = async () => {
    setPruneLoading(true);
    setPrePrune(true);
    const trees = await createMerkleTrees();

    let proofs =
      userWinnings?.map((win) => {
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

    const tokenIds = userWinnings?.map(({ tokenId }) => tokenId) ?? [];

    const chunkSize = PRUNE_BATCH_SIZE;
    const START_INDEX = 6;
    for (let i = START_INDEX; i < proofs.length; i += chunkSize) {
      const proofsChunk = proofs.slice(i, i + chunkSize);
      const tokenIdsChunk = tokenIds.slice(i, i + chunkSize);
      setPruneBatch({
        from: i + 1,
        to: i + chunkSize,
        total: proofs.length,
      });

      const tx = await batchPruneWinnings({
        address: JackpotContract.address as `0x${string}`,
        abi: JackpotContract.abi,
        functionName: "batchPruneWinning",
        args: [proofsChunk, tokenIdsChunk],
        gas: BigInt(25000000),
      });

      const receipt = await waitForTransactionReceipt(config, {
        hash: tx,
        confirmations: 5,
      });
      console.log({ receipt });
    }
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
    fuelCellsWon: userWinnings?.length ?? 0,
    pruneLoading,
    pruneBatch,
    batchPrune,
    createMerkleTrees,
  };
};

export default useLottery;
