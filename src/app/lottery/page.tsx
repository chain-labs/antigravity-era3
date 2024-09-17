"use client";

import Timer from "@/components/global/Timer";
import Button from "@/components/html/Button";
import Input from "@/components/html/Input";
import { IMAGEKIT_BACKGROUNDS, IMAGEKIT_ICONS } from "@/images";
import { Gradients, Shapes } from "@/lib/tailwindClassCombinators";
import { cn } from "@/lib/tailwindUtils";
import Image from "next/image";
import { PiTrophyDuotone, PiWrenchDuotone } from "react-icons/pi";
import { motion } from "framer-motion";
import SeperateText, {
  HoverTextAnimation,
} from "@/components/animation/SeperateText";

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
      className="relative flex justify-center items-center min-h-screen xl:[background-size:120%] xl:bg-[80%_50%] bg-cover bg-center bg-no-repeat"
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
              "text-[64px] leading-[64px] font-sans font-extrabold",
            )}
          >
            Congratulations!
            <br /> Prune your winnings!
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
                {data.fuelcells.toLocaleString("en-US")}
              </p>
              <div className="flex flex-col justify-end items-end gap-[8px]">
                <motion.p
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
                  <HoverTextAnimation.Fading text="Fuel Cells" />
                </motion.p>
                <div className="flex justify-center items-center gap-[4px] text-[12px] leading-[12px] font-general-sans font-semibold uppercase">
                  <PiTrophyDuotone className="text-[16px]" />
                  <span>{data.fuelCellsWon} Fuel Cells won</span>
                </div>
              </div>
            </div>
            <Button type="submit" initial="initial" whileHover="hover">
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
              "flex flex-col justify-start items-start gap-[8px]",
              "p-[8px] rounded-[6px]",
              "bg-agblack/30 backdrop-blur-lg",
              "font-extrabold",
            )}
          >
            <Timer timestamp="nextJourneyTimestamp" />
          </div>
        </div>
      </div>
    </div>
  );
}
