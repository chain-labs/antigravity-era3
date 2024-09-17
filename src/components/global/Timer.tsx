"use client";

import useTimer from "@/hooks/useTimer";
import { cn } from "@/lib/tailwindUtils";
import RollingCounter from "../animation/RollingCounter";

function NumberAndLabel({ number, label }: { number: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-[4px] px-[8px]">
      <RollingCounter num={number} className="text-[40px] leading-[40px]" />
      <div>{label}</div>
    </div>
  );
}

export default function Timer({
  timestamp,
}: {
  timestamp: Parameters<typeof useTimer>[0];
}) {
  const time = useTimer("mintEndTimestamp");
  const title = {
    mintEndTimestamp: `time to next mint`,
    nextJourneyTimestamp: "time till next lottery",
  }[timestamp];
  return (
    <div
      className={cn(
        "flex flex-col justify-center items-center gap-[8px]",
        "text-agwhite uppercase font-sans tracking-widest text-[12px] lg:text-[16px] font-extrabold",
      )}
    >
      <div>{title}</div>
      <div className="grid grid-flow-col gap-[8px]">
        <NumberAndLabel number={time.countdown.days} label="Days" />
        <div className="h-full w-[1px] bg-agwhite"></div>
        <NumberAndLabel number={time.countdown.hours} label="Hours" />
        <div className="h-full w-[1px] bg-agwhite"></div>
        <NumberAndLabel number={time.countdown.minutes} label="Minutes" />
        <div className="h-full w-[1px] bg-agwhite"></div>
        <NumberAndLabel number={time.countdown.seconds} label="Seconds" />
      </div>
    </div>
  );
}
