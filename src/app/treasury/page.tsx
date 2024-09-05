"use client";

import useTreasuryContract from "@/abi/Treasury";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect } from "react";

export default function TreasuryPage() {
  const TreasuryContract = useTreasuryContract();

  useEffect(() => {
    console.log({ TreasuryContract });
  }, [TreasuryContract]);

  return (
    <div>
      <h1>Treasury</h1>
      <ConnectButton />
    </div>
  );
}
