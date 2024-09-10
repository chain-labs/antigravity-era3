"use client";

import Timer from "@/components/global/Timer";
import Button from "@/components/html/Button";
import Input from "@/components/html/Input";
import { IMAGEKIT_BACKGROUNDS } from "@/images";
import { Gradients, Shapes } from "@/lib/tailwindClassCombinators";
import { cn } from "@/lib/tailwindUtils";
import { PiCubeDuotone, PiWrenchDuotone } from "react-icons/pi";

function PruneAndRollOver({ data }: { data: number }) {
  return (
    <div className="border-[1px] border-agorange rounded-[6px] p-[8px] pb-[32px] bg-agwhite/30 backdrop-blur-lg">
      <div className="flex justify-center items-center w-full gap-[8px] -translate-y-[calc(50%+8px)]">
        <div
          className={cn(
            Gradients.darkBlue,
            "flex justify-center items-center",
            "font-bold text-[14px] text-agwhite font-sans text-nowrap",
            "px-[8px] py-[4px] rounded-[6px]",
          )}
        >
          Prune & Roll Over
        </div>
      </div>
      <form
        className={cn(
          "flex flex-col justify-center items-center gap-[8px] ",
          "w-full md:w-[400px]",
        )}
      >
        <div
          className={cn(
            Gradients.tableBlue,
            Shapes.dataCard,
            "border-[1px] border-agyellow",
            "grid grid-flow-col gap-[8px]",
            "font-extrabold",
            "w-full",
            "flex justify-between items-center",
          )}
        >
          <p className="text-agwhite text-[32px] leading-[32px] font-sans w-full">
            {data.toLocaleString("en-US")}
          </p>
          <Button type="submit">
            <PiWrenchDuotone /> Prune
          </Button>
        </div>
      </form>
    </div>
  );
}

function MintFromEvilAddress({ data }: { data: number }) {
  return (
    <div className="border-[1px] border-agorange rounded-[6px] p-[8px] pb-[32px] bg-agwhite/30 backdrop-blur-lg">
      <div className="flex justify-center items-center w-full gap-[8px] -translate-y-[calc(50%+8px)]">
        <div
          className={cn(
            Gradients.darkBlue,
            "flex justify-center items-center",
            "font-bold text-[14px] text-agwhite font-sans text-nowrap",
            "px-[8px] py-[4px] rounded-[6px]",
          )}
        >
          Mint From Evil Address
        </div>
      </div>
      <form
        className={cn(
          "flex flex-col justify-center items-center gap-[8px] ",
          "w-full md:w-[400px]",
        )}
      >
        <div
          className={cn(
            Gradients.tableBlue,
            Shapes.dataCard,
            "border-[1px] border-agyellow",
            "grid grid-flow-col gap-[8px]",
            "font-extrabold",
            "w-full",
            "flex justify-between items-center",
          )}
        >
          <p className="text-agwhite text-[32px] leading-[32px] font-sans w-full">
            {data.toLocaleString("en-US")}
          </p>
          <Button type="submit">
            <PiCubeDuotone /> Mint
          </Button>
        </div>
      </form>
    </div>
  );
}

export default function EvilAddressPage() {
  const data = {
    nextLotteryId: 2,
    currentJourneyId: 1,
    fuelCellsWon: 123,
    pruneAndRollover: 1000,
    mintFromEvilAddress: 500,
  };
  return (
    <div
      style={{
        backgroundImage: `url(${IMAGEKIT_BACKGROUNDS.EVIL_ADDRESS_1})`,
      }}
      className="flex justify-center items-center min-h-screen bg-[70%_50%] [background-size:120%] bg-no-repeat"
    >
      <div
        className={cn(
          "flex flex-col items-center justify-center gap-[50px]",
          "lg:flex lg:flex-row lg:justify-start lg:items-start gap-[30px]",
        )}
      >
        <div
          className={cn(
            "flex flex-col justify-start items-start gap-[8px]",
            "p-[8px] rounded-[6px]",
            "bg-agwhite/30 backdrop-blur-lg",
            "text-agblack",
          )}
        >
          <h1
            className={cn(
              Gradients.whiteGradientText,
              "text-[64px] leading-[64px] font-sans font-extrabold",
            )}
          >
            Evil Address
          </h1>
          <p className="text-[14px] leading-[14px]">
            Next Lottery ID: {data.nextLotteryId}
          </p>
          <p className="text-[14px] leading-[14px]">
            Current Journey ID: {data.currentJourneyId}
          </p>
        </div>
        <div className="flex flex-col justify-center items-center gap-[24px]">
          <PruneAndRollOver data={data.pruneAndRollover} />
          <MintFromEvilAddress data={data.mintFromEvilAddress} />
          <div
            className={cn(
              "flex flex-col justify-start items-start gap-[8px]",
              "p-[8px] rounded-[6px]",
              "bg-agblack/30 backdrop-blur-lg",
              "font-extrabold",
            )}
          >
            <Timer />
          </div>
        </div>
      </div>
    </div>
  );
}
