"use client";

import Timer from "@/components/global/Timer";
import Button from "@/components/html/Button";
import Input from "@/components/html/Input";
import Table from "@/components/html/Table";
import { IMAGEKIT_BACKGROUNDS, IMAGEKIT_ICONS } from "@/images";
import { Backdrop, Gradients, Shapes } from "@/lib/tailwindClassCombinators";
import { cn } from "@/lib/tailwindUtils";
import Image from "next/image";
import {
  PiCube,
  PiDropboxLogoDuotone,
  PiTrophyDuotone,
  PiWrenchDuotone,
} from "react-icons/pi";
import { motion } from "framer-motion";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

export default function UnwrapPage() {
  const data = {
    nextLotteryId: 2,
    currentJourneyId: 1,
    fuelCellsWon: 123,
  };

  const tableData = {
    header: [
      <>
        <Image
          src={IMAGEKIT_ICONS.FUEL_CELL}
          alt="Fuel Cell"
          width={24}
          height={24}
          className="min-w-[24px] min-h-[24px]"
        />
        Fuel cell Id
      </>,
      <>
        <PiCube />
        Journey ID
      </>,
      <>
        <Image
          src={IMAGEKIT_ICONS.PILL_DARK_X_CLAIMED}
          alt="Fuel Cell"
          width={24}
          height={24}
          className="min-w-[24px] min-h-[24px]"
        />
        Total Dark locked
      </>,
    ],
    data: [
      [1, 1, 100],
      [2, 1, 200],
      [3, 2, 300],
      [3, 2, 300],
      [3, 2, 300],
      [3, 2, 300],
      [3, 2, 300],
      [3, 2, 300],
      [3, 2, 300],
      [3, 2, 300],
      [3, 2, 300],
      [3, 2, 300],
      [3, 2, 300],
      [3, 2, 300],
      [3, 2, 300],
      [3, 2, 300],
      [3, 2, 300],
      [3, 2, 300],
      [3, 2, 300],
      [3, 2, 300],
      [3, 2, 300],
      [3, 2, 300],
      [3, 2, 300],
    ],
  };

  const [tableReveal, setTableReveal] = useState(false);

  return (
    <div
      style={{
        backgroundImage: `url(${IMAGEKIT_BACKGROUNDS.UNWRAPPING_1})`,
      }}
      className="relative flex justify-center items-center min-h-screen bg-[50%_30%] bg-opacity-15 z-0 "
    >
      <div className={cn(Backdrop.darkOverlay)}></div>
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
            Unwrap
          </h1>
          <p className="text-[14px] leading-[14px]">
            Next Lottery ID: {data.nextLotteryId}
          </p>
          <p className="text-[14px] leading-[14px]">
            Current Journey ID: {data.currentJourneyId}
          </p>
        </div>

        <motion.div className="group [perspective:2000px]">
          <div className="relative transition-all duration-300 [transform-style:preserve-3d] cursor-pointer">
            <motion.div
              animate={{
                rotateY: tableReveal ? 180 : 0,
              }}
              className="flex flex-col justify-center items-center gap-[24px] [backface-visibility:hidden]"
            >
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
                  <Input className="bg-none" />
                  <p
                    className={cn(
                      Gradients.lightBlue,
                      Shapes.pill,
                      "grid grid-cols-[24px_auto]",
                    )}
                  >
                    <Image
                      src={IMAGEKIT_ICONS.FUEL_CELL}
                      alt="Fuel Cell"
                      width={24}
                      height={24}
                      className="w-[24px] h-[24px] mix-blend-multiply"
                    />
                    <span className="text-agblack font-semibold font-general-sans">
                      Fuel&nbsp;Cells
                    </span>
                  </p>
                </div>
                <div className="flex flex-col justify-center items-center gap-[8px]">
                  <Button type="submit">
                    <PiDropboxLogoDuotone /> Unwrap
                  </Button>
                  <button
                    type="button"
                    onClick={() => setTableReveal(true)}
                    className="bg-none underline text-agwhite font-sans font-semibold px-[16px] py-[4px] rounded-[6px] bg-agblack/50 backdrop-blur-lg"
                  >
                    View Selected Fuel Cells
                  </button>
                </div>
              </form>
              <div
                className={cn(
                  "flex flex-col justify-start items-start gap-[8px]",
                  "p-[8px] rounded-[6px]",
                  "bg-agblack/50 backdrop-blur-lg",
                  "font-extrabold",
                )}
              >
                <Timer />
              </div>
            </motion.div>

            <motion.div
              animate={{
                rotateY: tableReveal ? 0 : 180,
              }}
              className="absolute inset-0 w-fit h-full mx-auto [backface-visibility:hidden]"
            >
              <button
                type="button"
                onClick={() => setTableReveal(false)}
                className={cn(
                  "absolute top-0 right-0 translate-x-full -translate-y-full",
                  "border-[1px] border-agpurple bg-agblack/50 backdrop-blur-xl",
                  "text-agwhite font-black text-[24px]",
                  "p-[4px] bg-none rounded-[6px]",
                )}
              >
                <IoClose />
              </button>
              <Table header={tableData.header} body={tableData.data} />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
