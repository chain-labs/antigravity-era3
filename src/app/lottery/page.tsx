"use client";

import useJackpotContract from "@/abi/Jackpot";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect } from "react";

export default function LotteryPage() {
  const JackpotContract = useJackpotContract();

  useEffect(() => {
    console.log({ JackpotContract });
  }, [JackpotContract]);
  return (
    <div>
      <h1>Lottery</h1>
      <ConnectButton />
    </div>
  );
}
