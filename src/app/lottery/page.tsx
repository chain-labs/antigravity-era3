"use client";

import Timer from "@/components/global/Timer";
import Button from "@/components/html/Button";
import Input from "@/components/html/Input";
import { IMAGEKIT_BACKGROUNDS, IMAGEKIT_ICONS } from "@/images";
import { Gradients, Shapes } from "@/lib/tailwindClassCombinators";
import { cn } from "@/lib/tailwindUtils";
import Image from "next/image";
import { PiTrophyDuotone, PiWrenchDuotone } from "react-icons/pi";

export default function LotteryPage() {
  const data = {
    fuelcells: 122223,
    nextLotteryId: 2,
    currentJourneyId: 1,
    fuelCellsWon: 123,
  };
  return (
    <div
      style={{
        backgroundImage: `url(${IMAGEKIT_BACKGROUNDS.LOTTERY_2})`,
      }}
      className="flex justify-center items-center min-h-screen [background-size:120%] bg-[80%_50%]"
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
            "bg-agblack/30 backdrop-blur-lg",
            "text-agwhite",
          )}
        >
          <h1
            className={cn(
              Gradients.whiteGradientText,
              "text-[64px] leading-[64px] font-sans font-extrabold",
            )}
          >
            Prune Lottery
          </h1>
          <p className="text-[14px] leading-[14px]">
            Next Lottery ID: {data.nextLotteryId}
          </p>
          <p className="text-[14px] leading-[14px]">
            Current Journey ID: {data.currentJourneyId}
          </p>
        </div>

        <div className="flex flex-col justify-center items-center gap-[24px]">
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
              )}
            >
              <p className="text-agwhite text-[32px] leading-[32px] font-sans w-full">
                {data.fuelcells.toLocaleString("en-US")}
              </p>
              <div className="flex flex-col justify-end items-end gap-[8px]">
                <p className={cn(Gradients.lightBlue, Shapes.pill)}>
                  <Image
                    src={IMAGEKIT_ICONS.FUEL_CELL}
                    alt="Fuel Cell"
                    width={24}
                    height={24}
                    className="w-[24px] h-[24px] mix-blend-multiply"
                  />
                  <span className="text-agblack font-semibold font-general-sans">
                    Fuel Cells
                  </span>
                </p>
                <div className="flex justify-center items-center gap-[4px] text-[12px] leading-[12px] font-general-sans font-semibold uppercase">
                  <PiTrophyDuotone className="text-[16px]" />
                  <span>{data.fuelCellsWon} Fuel cells won</span>
                </div>
              </div>
            </div>
            <Button type="submit">
              <PiWrenchDuotone /> Prune
            </Button>
          </form>
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
