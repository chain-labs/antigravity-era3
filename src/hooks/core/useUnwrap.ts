import { getAddress } from "viem";
import { useRestPost } from "../api/useRestClient";
import useTreasury from "./useTreasury";
import axios from "axios";
import { SUBGRAPH_URL } from "@/constants";

const userOwnedFuelCellsQuery = (
  walletAddress: string,
  afterCursor: string,
  batchSize: number = 500,
) => `query MyQuery {
      users(where: { address: "${walletAddress}" }) {
        items {
          ownedFuelCells(after: ${
            afterCursor ? `"${afterCursor}"` : null
          }, limit: ${batchSize}) {
            items {
              journeyId
              tokenId
      }
    }`;

const fetchUserOwnedFuelCellsPaginated = async (
  walletAddress: string,
  cursor: string,
  batchSize: number,
) => {
  let userOwnedFuelCells: { journeyId: number; tokenId: number }[] = [];
  let pageInfo = {};

  const checksumWalletAddress = getAddress(walletAddress);

  try {
    const response = await axios.post(
      SUBGRAPH_URL,
      {
        query: userOwnedFuelCellsQuery(
          checksumWalletAddress,
          cursor,
          batchSize,
        ),
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const currentFuelCells: { journeyId: string; tokenId: string }[] =
      response?.data?.data?.users?.items?.[0]?.ownedFuelCells?.items || [];
    pageInfo =
      response?.data?.data?.users?.items?.[0]?.ownedFuelCells?.pageInfo || {};

    userOwnedFuelCells = currentFuelCells.map((fuelCell) => {
      return {
        journeyId: parseInt(fuelCell.journeyId, 10),
        tokenId: parseInt(fuelCell.tokenId, 10),
      };
    });
  } catch (e) {
    console.error("Error while fetching mints from subgraph: ", e);
  }
  return { userOwnedFuelCells, pageInfo };
};

const useUnwrap = () => {
    const TreasuryContract = useTreasury();
    
    
};
