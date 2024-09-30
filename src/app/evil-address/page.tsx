"use client";

import { HoverTextAnimation } from "@/components/animation/SeperateText";
import Timer from "@/components/global/Timer";
import Button from "@/components/html/Button";
import Input from "@/components/html/Input";
import { BACKGROUNDS, EVIL_ADDRESS_AVAILABLE } from "@/constants";
import { IMAGEKIT_BACKGROUNDS } from "@/images";
import { Gradients, Shapes } from "@/lib/tailwindClassCombinators";
import { cn } from "@/lib/tailwindUtils";
import { notFound } from "next/navigation";
import { PiCubeDuotone, PiWrenchDuotone } from "react-icons/pi";
import { motion } from "framer-motion";
import { PiInfoDuotone } from "react-icons/pi";
import Tooltip from "@/components/global/Tooltip";
import useEvilAddress from "@/hooks/core/useEvilAddress";

function PruneAndRollOver({ data }: { data: number }) {
  return (
    <div className="border-[1px] border-agorange rounded-[6px] p-[8px] pb-[32px] bg-agwhite/30 backdrop-blur-lg w-full">
      <div className="flex justify-center items-center w-full gap-[8px] -translate-y-[calc(50%+8px)]">
        <motion.div
          initial="initial"
          whileHover="hover"
          className={cn(
            Gradients.darkBlue,
            "relative flex justify-center items-center gap-[8px]",
            "font-bold text-[14px] text-agwhite font-sans text-nowrap",
            "px-[8px] py-[4px] rounded-[6px]",
          )}
        >
          <HoverTextAnimation.Fading text="Prune & Roll Over" />{" "}
          <Tooltip
            trigger={<PiInfoDuotone />}
            positionClassName="absolute top-[calc(100%_+_8px)] right-0"
          >
            hello
          </Tooltip>
        </motion.div>
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
          <Button initial="initial" whileHover="hover" type="submit">
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
        </div>
      </form>
    </div>
  );
}

function MintFromEvilAddress({ data }: { data: number }) {
  return (
    <div className="border-[1px] border-agorange rounded-[6px] p-[8px] pb-[32px] bg-agwhite/30 backdrop-blur-lg w-full">
      <div className="flex justify-center items-center w-full gap-[8px] -translate-y-[calc(50%+8px)]">
        <motion.div
          initial="initial"
          whileHover="hover"
          className={cn(
            Gradients.darkBlue,
            "relative flex justify-center items-center gap-[8px]",
            "font-bold text-[14px] text-agwhite font-sans text-nowrap",
            "px-[8px] py-[4px] rounded-[6px]",
          )}
        >
          <HoverTextAnimation.Fading text="Mint From Evil Address" />{" "}
          <Tooltip
            trigger={<PiInfoDuotone />}
            positionClassName="absolute top-[calc(100%_+_8px)] right-0"
          >
            hello
          </Tooltip>
        </motion.div>
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
          <Button initial="initial" whileHover="hover" type="submit">
            <motion.div
              variants={{
                initial: { scale: 1 },
                hover: {
                  scale: 1.25,
                  transition: { duration: 0.25 },
                },
              }}
            >
              <PiCubeDuotone />
            </motion.div>
            <HoverTextAnimation.RollingIn text="Mint" />
          </Button>
        </div>
      </form>
    </div>
  );
}

export default function EvilAddressPage() {
  const { perPruneChunk } = useEvilAddress();
  if (EVIL_ADDRESS_AVAILABLE === false) {
    return notFound();
  }
  return (
    <div
      style={{
        backgroundImage: `url(${BACKGROUNDS.EVIL_ADDRESS ?? ""})`,
      }}
      className="flex justify-center items-center min-h-screen bg-cover bg-no-repeat"
    >
      <div
        className={cn(
          "flex flex-col items-center justify-center gap-[50px]",
          "lg:flex lg:flex-row lg:justify-start lg:items-start gap-[30px]",
          "pt-[100px]"
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
            Evil Address
          </h1>
        </div>
        <div className="flex flex-col justify-center items-center gap-[24px]">
          <PruneAndRollOver data={perPruneChunk} />
          <MintFromEvilAddress data={50} />
          <div
            className={cn(
              "flex flex-col justify-start items-start gap-[8px]",
              "p-[8px] rounded-[6px]",
              "bg-agblack/30 backdrop-blur-lg",
              "font-extrabold",
            )}
          >
            <Timer
              label="Time to next mint"
              timestamp={~~(new Date().getTime() / 1000 + 15000)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
