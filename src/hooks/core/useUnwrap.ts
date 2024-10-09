import { getAddress } from "viem";
import { useRestPost } from "../api/useRestClient";
import useTreasury from "./useTreasury";
import axios from "axios";
import { SUBGRAPH_URL } from "@/constants";
import { useEffect, useMemo, useState } from "react";
import { useAccount } from "wagmi";
import useEAContract from "@/abi/EvilAddress";
import { fetchUserFuelCellsMappingWithTotalYield } from "@/utils/unwrap";

const userOwnedFuelCellsQuery = (
  walletAddress: string,
  batchSize: number = 500,
  afterCursor?: string,
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
      }
    }
  }
}`;

const fetchUserOwnedFuelCellsPaginated = async (
  walletAddress: string,
  batchSize: number,
  cursor?: string,
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
          batchSize,
          cursor,
        ),
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    console.log({
      response,
      query: userOwnedFuelCellsQuery(checksumWalletAddress, batchSize, cursor),
    });
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

const useUnwrap = (inputValue: number) => {
  const TreasuryContract = useTreasury();
  const EAContract = useEAContract();
  const account = useAccount();

  const [totalData, setTotalData] = useState({});

  useEffect(() => {
    const fetchAllData = async () => {
      let hasNextPage = true;
      let tableData = [];
      while (hasNextPage) {
        const data = await fetchUserFuelCellsMappingWithTotalYield(
          // `${EAContract.address}`,
          `${account.address}`,
          500,
        );
        console.log({ data });
        hasNextPage = data.pageInfo.hasNextPage;
      }
    };
    if (account.address) {
      fetchAllData();
      // setTotalData(tableData);
    }
  }, [account.address]);

  const tableData = useMemo(() => {
    if (totalData) {
      // console.log({ totalData });
    }
  }, [totalData]);

  return { tableData };
};

export default useUnwrap;
