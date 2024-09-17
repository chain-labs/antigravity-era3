"use client";

import Timer from "@/components/global/Timer";
import Button from "@/components/html/Button";
import Input from "@/components/html/Input";
import { IMAGEKIT_BACKGROUNDS, IMAGEKIT_ICONS } from "@/images";
import { Gradients, Shapes } from "@/lib/tailwindClassCombinators";
import { cn } from "@/lib/tailwindUtils";
import Image from "next/image";
import Link from "next/link";
import {
  PiAlignRight,
  PiCubeDuotone,
  PiTrophyDuotone,
  PiWrenchDuotone,
} from "react-icons/pi";
import { motion } from "framer-motion";
import { HoverTextAnimation } from "@/components/animation/SeperateText";
import { AGPROJECT_LINK } from "@/constants";

export default function TreasuryPage() {
  const data = {
    nextLotteryId: 2,
    currentJourneyId: 1,
    fuelCellsWon: 123,
  };
  return (
    <div
      style={{
        backgroundImage: `url(${IMAGEKIT_BACKGROUNDS.TREASURY_2})`,
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
            Treasury
          </h1>
        </div>

        <div className="flex flex-col justify-center items-center gap-[24px]">
          <div
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
              <div className="flex flex-col justify-start items-start">
                <small className="uppercase font-semibold">
                  TOTAL YIELD DISTRIBUTED
                </small>
                <p className="text-[32px]">100</p>
              </div>
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
                  alt="Unclaimed Dark X"
                  width={24}
                  height={24}
                  className="w-[24px] h-[24px] rounded-full"
                />
                <HoverTextAnimation.Fading text="Dark" />
              </motion.p>
            </div>
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
              <div className="flex flex-col justify-start items-start">
                <small className="uppercase font-semibold">
                  TOTAL ACTIVE FUEL CELLS
                </small>
                <p className="text-[32px]">100</p>
              </div>
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
                  src={IMAGEKIT_ICONS.FUEL_CELL}
                  alt="Fuel Cell"
                  width={24}
                  height={24}
                  className="w-[24px] h-[24px] mix-blend-multiply rounded-full"
                />
                <HoverTextAnimation.Fading text="Fuel Cells" />
              </motion.p>
            </div>
          </div>
          <div
            className={cn(
              "flex flex-col justify-start items-start gap-[8px]",
              "p-[8px] rounded-[6px]",
              "bg-agblack/30 backdrop-blur-lg",
              "font-extrabold",
            )}
          >
            <Timer timestamp="mintEndTimestamp" />
          </div>
          <Link
            href={AGPROJECT_LINK + "/minting"}
            target="_blank"
            className={cn(
              Gradients.redToBlue,
              "relative rounded-[8px] p-[2px] w-fit",
            )}
          >
            <motion.div
              initial="initial"
              whileHover="hover"
              className="underline underline-offset-2 text-agwhite font-sans font-semibold uppercase tracking-widest px-[16px] py-[8px] rounded-[6px] bg-agblack h-"
            >
              <HoverTextAnimation.RollingIn text="Mint Now!" />
            </motion.div>
          </Link>
        </div>
      </div>
    </div>
  );
}
