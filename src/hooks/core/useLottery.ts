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
import { createMerkleTreeForLottery } from "@/utils/merkletree";
import MerkleTree from "merkletreejs";
import { encodePacked, keccak256 } from "viem";
import toast from "react-hot-toast";
import { waitForTransactionReceipt } from "@wagmi/core";
import useEAContract from "@/abi/EvilAddress";

const PRUNE_BATCH_SIZE = 50;
const GAS_LIMIT = 1000000;

const useLottery = (): {
  nextLotteryTimestamp: number;
  lotteriesInfo: { journeyId: string; lotteryId: string } | null;
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
  const [pruneBatch, setPruneBatch] = useState({
    from: 0,
    to: PRUNE_BATCH_SIZE,
    total: PRUNE_BATCH_SIZE,
  });

  // define contract instances here
  const JPMContract = useJPMContract();
  const JackpotContract = useJackpotContract();
  const EAContract = useEAContract();

  const userAccount = useMemo(() => {
    // return EAContract.address;
    return account.address;
  }, [account.address]);

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

  const { data: lotteryPayouts, isFetched: lotteryPayoutsFetched } =
    useGQLFetch<{
      lotteryResults: {
        items: {
          journeyId: string;
          lotteryId: string;
          payoutPerFuelCell: string;
        }[];
      };
    }>(
      ["lottery payouts"],
      gql`
        query MyQuery {
          lotteryResults(orderBy: "timestamp", orderDirection: "desc") {
            items {
              journeyId
              lotteryId
              payoutPerFuelCell
              numberOfWinners
            }
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
    // `/api/lottery-result?walletAddress=${EAContract.address}`,
    `/api/lottery-result?walletAddress=${userAccount}`,
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
      const payouts = lotteryPayouts.lotteryResults.items;

      console.log({ payouts });

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

  const lotteriesInfo = useMemo(() => {
    if (lotteryPayoutsFetched) {
      const payouts = lotteryPayouts?.lotteryResults.items ?? [];

      const latestPayout = payouts[0];

      if (latestPayout) {
        console.log({ latestPayout });

        return {
          journeyId: latestPayout.journeyId,
          lotteryId: latestPayout.lotteryId,
        };
      } else {
        return null;
      }
    }

    return null;
  }, [lotteryPayouts, lotteryPayoutsFetched]);

  const createMerkleTrees = async (): Promise<Record<string, MerkleTree>> => {
    try {
      let lotteryTrees2 = {};

      lotteriesWon.forEach((lottery) => {
        const list =
          userWinnings?.uniqueCombinationTokens?.[
            // @ts-ignore
            `${lottery.journeyId}_${lottery.lotteryId}`
          ] ?? [];

        console.log({ tag: `${lottery.journeyId}_${lottery.lotteryId}`, list });
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
        // console.log({ root: merkleTree.getHexRoot() });

        const leaf = keccak256(
          encodePacked(
            ["uint256", "uint16", "uint16"],
            [BigInt(tokenId), journeyId, lotteryId],
          ),
        );

        const proof = merkleTree.getHexProof(leaf);
        return {
          journeyId,
          lotteryId,
          tokenId: BigInt(`${tokenId}`),
          proofs: proof,
        };
      }) ?? [];

    const chunkSize = PRUNE_BATCH_SIZE;
    const START_INDEX = 0;
    for (let i = START_INDEX; i < proofs.length; i += chunkSize) {
      try {
        const proofsChunk = proofs.slice(i, i + chunkSize);
        console.log({ proofsChunk });
        setPruneBatch({
          from: i + 1,
          to: Math.min(i + chunkSize, proofs.length),
          total: proofs.length,
        });

        console.log({
          proofSize: (() => {
            let len = 0;
            let max = 0;
            proofsChunk.forEach((proof) => {
              max = Math.max(max, proof.proofs.length);
              len += proof.proofs.length;
            });
            return { avg: len / proofsChunk.length, total: len, max };
          })(),
        });

        const tx = await batchPruneWinnings({
          address: JackpotContract.address as `0x${string}`,
          abi: JackpotContract.abi,
          functionName: "pruneWinnings",
          args: [proofsChunk],
          // gas: BigInt(GAS_LIMIT),
        });

        const receipt = await waitForTransactionReceipt(config, {
          hash: tx,
          confirmations: 2,
        });

        console.log({ status: true, receipt });
        toast.success(
          `Prune Successful for Batch ${i + 1}-${Math.min(i + chunkSize, proofs.length)} out of ${proofs.length}!`,
        );
        await syncPrune({ walletAddress: userAccount });
        // await syncPrune({ walletAddress: EAContract.address });
      } catch (err) {
        console.error({ err });
        toast.error(
          `Prune Failed for Batch ${i + 1}-${Math.min(i + chunkSize, proofs.length)} out of ${proofs.length}. Trying to Prune Next Batch`,
        );
        console.log({ status: "failed" });
        await syncPrune({ walletAddress: userAccount });
        // await syncPrune({ walletAddress: EAContract.address });
      }
    }
    setPruneLoading(false);
  };

  return {
    nextLotteryTimestamp,
    lotteryPayout: totalWinnings,
    fuelCellsWon: userWinnings?.lotteryResult?.length ?? 0,
    pruneLoading,
    pruneBatch,
    batchPrune,
    createMerkleTrees,
    lotteriesInfo,
  };
};

export default useLottery;
