"use client";

import Timer from "@/components/global/Timer";
import Button from "@/components/html/Button";
import Input from "@/components/html/Input";
import useLottery from "@/hooks/core/useLottery";
import { IMAGEKIT_BACKGROUNDS, IMAGEKIT_ICONS } from "@/images";
import { Gradients, Shapes } from "@/lib/tailwindClassCombinators";
import { cn } from "@/lib/tailwindUtils";
import Image from "next/image";
import { useEffect, useState } from "react";
import { PiTrophyDuotone, PiWrenchDuotone } from "react-icons/pi";
import { formatUnits } from "viem";
import { motion } from "framer-motion";
import SeperateText, {
  HoverTextAnimation,
} from "@/components/animation/SeperateText";
import { BACKGROUNDS } from "@/constants";
import ProgressingStates, { STEPPERS } from "./ProgressingStates";

export default function LotteryPage() {
  const [lotteryState, setLotteryState] = useState<STEPPERS>({
    big: "success",
    bigger: "pending",
    biggest: "pending",
  });

  const {
    nextLotteryTimestamp,
    lotteryPayout,
    fuelCellsWon,
    pruneBatch,
    pruneLoading,
    currentPhase,
    currentJourney,
    lotteriesInfo,
    batchPrune,
  } = useLottery();

  const handlePruneWinnings = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    batchPrune();
  };

  useEffect(() => {
    const lotteryIdAnnounced = lotteriesInfo?.lotteryId;

    switch (lotteryIdAnnounced) {
      case "1": {
        setLotteryState({
          big: "success",
          bigger: "progress",
          biggest: "pending",
        });
        return;
      }
      case "2": {
        setLotteryState({
          big: "success",
          bigger: "success",
          biggest: "progress",
        });
        return;
      }
      case "3": {
        setLotteryState(
          currentJourney === Number(lotteriesInfo?.journeyId)
            ? {
                big: "success",
                bigger: "success",
                biggest: "success",
              }
            : { big: "progress", bigger: "pending", biggest: "pending" },
        );
        return;
      }
      default: {
        setLotteryState({
          big: "progress",
          bigger: "pending",
          biggest: "pending",
        });
        return;
      }
    }
  }, [lotteriesInfo]);

  return (
    <div
      style={{
        backgroundImage: `url(${BACKGROUNDS.LOTTERY ?? ""})`,
      }}
      className="relative flex justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat pt-[100px]"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[black] via-[#0000] to-[black]"></div>
      <div
        className={cn(
          "flex flex-col items-center justify-center gap-[50px] z-[1]",
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
              "text-[32px] leading-[32px] lg:text-[64px] lg:leading-[64px] font-sans font-extrabold",
            )}
          >
            Congratulations!
            <br /> Prune your winnings
          </h1>
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
                {Number(formatUnits(BigInt(lotteryPayout), 18)).toLocaleString(
                  "en-US",
                )}
              </p>
              <div className="flex flex-col justify-end items-end gap-[8px]">
                <motion.div
                  initial="initial"
                  whileHover="hover"
                  className={cn(
                    Gradients.lightBlue,
                    Shapes.pill,
                    "text-agblack font-semibold font-general-sans",
                  )}
                >
                  <Image
                    src={IMAGEKIT_ICONS.PILL_DARK_X_CLAIMED}
                    alt="Fuel Cell"
                    width={24}
                    height={24}
                    className="w-[24px] h-[24px] rounded-full"
                  />
                  <HoverTextAnimation.Fading text="Dark Matter" />
                </motion.div>
                <div className="flex justify-center items-center gap-[4px] text-[12px] leading-[12px] font-general-sans font-semibold uppercase">
                  <PiTrophyDuotone className="text-[16px]" />
                  <span>{fuelCellsWon} Fuel cells won</span>
                </div>
              </div>
            </div>
            <Button
              onClick={handlePruneWinnings}
              initial="initial"
              whileHover="hover"
              loading={pruneLoading}
              loadingText={`${pruneBatch.from}-${pruneBatch.to}/${pruneBatch.total}`}
            >
              <motion.div
                variants={{
                  initial: { rotate: 0 },
                  hover: {
                    rotate: [0, -10, -10, -10, -20, -20, -20, -30, -30, -30, 0],
                    transition: { duration: 1 },
                  },
                }}
                className="origin-top-right"
              >
                <PiWrenchDuotone />
              </motion.div>
              <HoverTextAnimation.RollingIn text="Prune" />
            </Button>
          </form>
          <div
            className={cn(
              "flex flex-col justify-start items-start gap-[8px] w-full",
              "py-[8px] px-[16px] rounded-[6px]",
              "bg-agblack/30 backdrop-blur-lg",
              "font-extrabold",
            )}
          >
            <ProgressingStates
              states={lotteryState}
              journeyId={`${lotteriesInfo?.journeyId}`}
            />
          </div>
          <div
            className={cn(
              "flex flex-col justify-start items-start gap-[8px]",
              "p-[8px] rounded-[6px]",
              "bg-agblack/30 backdrop-blur-lg",
              "font-extrabold",
            )}
          >
            <Timer label="Next Lottery in" timestamp={nextLotteryTimestamp} />
          </div>
        </div>
      </div>
    </div>
  );
}
