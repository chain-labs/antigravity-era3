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

const PRUNE_BATCH_SIZE = 10;

const useEvilAddress = () => {
  const [pruneLoading, setPruneLoading] = useState(false);

  const EAContract = useEAContract();
  const account = useAccount();

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
    {},
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

  useEffect(() => {
    if (batchPruneError) {
      console.log({ batchPruneError });
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

  const evilPrune = async () => {
    try {
      setPruneLoading(true);
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

      console.log({
        proofSize: (() => {
          let len = 0;
          let max = 0;
          proofs.forEach((proof) => {
            max = Math.max(max, proof[0].proofs.length);
            len += proof[0].proofs.length;
          });
          return { avg: len / proofs.length, total: len, max };
        })(),
      });

      const tx = await batchPruneWinnings({
        address: EAContract.address as `0x${string}`,
        abi: EAContract.abi,
        functionName: "batchPruneWinning",
        args: [proofs, tokenIds],
        gas: BigInt(15000000),
      });

      const receipt = await waitForTransactionReceipt(config, {
        hash: tx,
        confirmations: 2,
      });

      console.log({ status: true, receipt });

      await syncPrune({ walletAddress: EAContract.address });
      setPruneLoading(false);
    } catch (err) {
      console.log({ err });
      console.log({ status: false });
    }
  };
  return {
    perPruneChunk: Math.min(
      PRUNE_BATCH_SIZE,
      userWinnings?.lotteryResult.length ?? 0,
    ),
  };
};

export default useEvilAddress;
