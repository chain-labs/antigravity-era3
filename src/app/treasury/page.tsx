"use client";

import Timer from "@/components/global/Timer";
import { IMAGEKIT_BACKGROUNDS, IMAGEKIT_ICONS } from "@/images";
import { Gradients, Shapes } from "@/lib/tailwindClassCombinators";
import { cn } from "@/lib/tailwindUtils";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { HoverTextAnimation } from "@/components/animation/SeperateText";
import { AGPROJECT_LINK, BACKGROUNDS } from "@/constants";
import useTreasury from "@/hooks/core/useTreasury";

export default function TreasuryPage() {
  const {
    fuelCellSupply,
    totalYieldDistributed,
    isMintActive,
    nextMintTimestamp,
    nextPhaseTimestamp,
    userMinted,
  } = useTreasury();
  return (
    <div
      style={{
        backgroundImage: `url(${BACKGROUNDS.TREASURY ?? ""})`,
      }}
      className="relative flex justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat"
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
          <h4 className="font-bold text-agyellow">
            Total Minted:{" "}
            <span className="text-agwhite">{userMinted} Fuel Cells</span>
          </h4>
          {/* <h4 className="font-bold text-agyellow">
            Total Yield Accumulated:{" "}
            <span className="text-agwhite">{2} $DARK</span>
          </h4> */}
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
                <p className="text-[32px]">
                  {Number(totalYieldDistributed.toFixed(2)).toLocaleString(
                    "en-US",
                  )}
                </p>
              </div>
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
                  alt="Unclaimed Dark X"
                  width={24}
                  height={24}
                  className="w-[24px] h-[24px] rounded-full"
                />
                <HoverTextAnimation.Fading text="Dark" />
              </motion.div>
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
                <p className="text-[32px]">
                  {fuelCellSupply?.toLocaleString("en-US")}
                </p>
              </div>
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
                  src={IMAGEKIT_ICONS.FUEL_CELL}
                  alt="Fuel Cell"
                  width={24}
                  height={24}
                  className="w-[24px] h-[24px] mix-blend-multiply rounded-full"
                />
                <HoverTextAnimation.Fading text="Fuel Cells" />
              </motion.div>
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
            <Timer
              label={
                isMintActive ? "Minting Active for" : "Next Mint starts in"
              }
              timestamp={
                isMintActive
                  ? Number(nextPhaseTimestamp)
                  : Number(nextMintTimestamp)
              }
            />
          </div>
          {isMintActive && (
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
          )}
        </div>
      </div>
    </div>
  );
}
