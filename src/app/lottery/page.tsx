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
import {
  PiInfoDuotone,
  PiTrophyDuotone,
  PiWrenchDuotone,
} from "react-icons/pi";
import { formatUnits } from "viem";
import { AnimatePresence, motion } from "framer-motion";
import SeperateText, {
  HoverTextAnimation,
} from "@/components/animation/SeperateText";
import { BACKGROUNDS } from "@/constants";
import ProgressingStates, { STEPPERS } from "./ProgressingStates";
import Table from "@/components/html/Table";

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

  const LotteryAdditionalInfo = {
    jackpotContractBalance: 10002903892,
    totalActiveFuelCells: 1232320,
    amountPerFuelCell: 109293,
    lottriesWinnings: {
      big: 100,
      bigger: 100,
      biggest: 100,
    },
  };

  const [fuelCellsInfoModal, setFuelCellsInfoModal] = useState(false);
  const [fuelCellsInfoModalOpening, setFuelCellsInfoModalOpening] =
    useState(false);

  useEffect(() => {
    // add 300ms delay for modal opening
    const timeout = setTimeout(() => {
      if (fuelCellsInfoModal) {
        setFuelCellsInfoModalOpening(true);
      } else {
        setFuelCellsInfoModalOpening(false);
      }
    }, 300);

    return () => {
      clearTimeout(timeout);
      setFuelCellsInfoModalOpening(false);
    };
  }, [fuelCellsInfoModal]);

  const tableConfig = {
    header: [
      <div key="lottery header" className="flex flex-col">
        Lottery <br />
        <div
          style={{
            opacity: 0,
          }}
        >
          ej3w {/* This is a dummy text to fix the height of the header   */}
        </div>
      </div>,
      <>
        payout / fuelcell <br /> (in $Dark)
      </>,
      <>
        Winners <br /> (in FuelCells)
      </>,
      <>
        Total won by user <br /> (in $Dark)
      </>,
      <>
        won by user <br /> (in $Dark)
      </>,
    ],
    data: [
      ["big", 13123, 10, 100, 1000],
      ["bigger", 12312, 10, 100, 1000],
      ["biggest", 3223, 10, 100, 1000],
    ],
  };

  return (
    <div
      style={{
        backgroundImage: `url(${BACKGROUNDS.LOTTERY ?? ""})`,
      }}
      className="relative flex justify-center items-center min-h-screen bg-center bg-cover bg-no-repeat pt-[130px]"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[black] via-[#0000] to-[black]"></div>
      <div
        className={cn(
          "flex flex-col items-center justify-center gap-[50px] z-[1]",
          "lg:flex lg:flex-row lg:justify-start lg:items-start gap-[30px]",
        )}
      >
        {/* Left side */}
        <div className="flex flex-col gap-[8px] w-full">
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
          <div className="grid grid-flow-row md:grid-flow-col place-items-center gap-2 w-full">
            <div className="bg-gradient-to-b from-[#B4EBF8] to-[#789DFA] p-[1px] rounded-[3px] w-full">
              <div
                className={cn(
                  Gradients.tableBlue,
                  "relative border border-1 border-agyellow rounded-[3px] px-[16px] py-[8px]",
                )}
              >
                <h3 className="uppercase font-sans tracking-widest text-[12px]">
                  Jackpot contract balance
                </h3>
                <p className="font-general-sans font-bold text-[18px]">
                  {Number(
                    LotteryAdditionalInfo.jackpotContractBalance,
                  ).toLocaleString("en-US")}
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-b from-[#B4EBF8] to-[#789DFA] p-[1px] rounded-[3px] w-full">
              <div
                className={cn(
                  Gradients.tableBlue,
                  "relative border border-1 border-agyellow rounded-[3px] px-[16px] py-[8px]",
                )}
              >
                <h3 className="uppercase font-sans tracking-widest text-[12px]">
                  Total Active FuelCells
                </h3>
                <p className="font-general-sans font-bold text-[18px]">
                  {Number(
                    LotteryAdditionalInfo.totalActiveFuelCells,
                  ).toLocaleString("en-US")}
                </p>
              </div>
            </div>
          </div>
          <Table
            header={tableConfig.header}
            body={tableConfig.data}
            className="hidden lg:block lg:w-full max-w-full"
            bodyClassName="text-center flex justify-center items-center"
          />
        </div>

        {/* Right side */}
        <div className="lg:w-[400px] flex flex-col justify-center items-center gap-[24px] mb-[16px] lg:mb-0 w-full">
          <form
            className={cn(
              "flex flex-col justify-center items-center gap-[8px] ",
              "w-full",
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
                "relative",
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
                <div
                  onMouseEnter={() => setFuelCellsInfoModal(true)}
                  onMouseLeave={() => setFuelCellsInfoModal(false)}
                  className="flex justify-center items-center gap-[4px] text-[12px] leading-[12px] font-general-sans font-semibold uppercase"
                >
                  <PiTrophyDuotone className="text-[16px]" />
                  <span>{fuelCellsWon} Fuel cells won</span>
                  {/* <PiInfoDuotone className="text-[16px]" /> */}
                  {/* hidden for a while since implementation is underway  */}
                  {/* <AnimatePresence>
                    {fuelCellsInfoModalOpening && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className={cn(
                          Gradients.redToBlue,
                          "absolute top-full right-0 p-[1px] rounded-[6px] text-agwhite z-50",
                        )}
                      >
                        <div className="flex flex-col justify-center items-center gap-[8px] text-[16px] leading-[16px] py-[8px] px-[16px] rounded-[inherit] bg-agblack normal-case font-normal">
                          <p className="text-center text-[14px]">
                            Your Fuel cells winnings in different lotteries
                          </p>
                          <div className="grid grid-flow-col gap-[8px] px-[8px] w-full">
                            {Object.keys(
                              LotteryAdditionalInfo.lottriesWinnings,
                            ).map((key) => (
                              <div
                                key={key}
                                className="flex flex-col justify-between items-center"
                              >
                                <span className="uppercase text-[12px] font-normal">
                                  {key}
                                </span>
                                <span className="font-bold">
                                  {
                                    LotteryAdditionalInfo.lottriesWinnings[
                                      key as keyof typeof LotteryAdditionalInfo.lottriesWinnings
                                    ]
                                  }
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence> */}
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
              "flex flex-col justify-start items-start gap-[8px]",
              "p-[8px] rounded-[6px]",
              "bg-agblack/30 backdrop-blur-lg",
              "font-extrabold",
              "w-full",
            )}
          >
            <Timer label="Next Lottery in" timestamp={nextLotteryTimestamp} />
          </div>
          <div
            className={cn(
              "flex flex-col justify-start items-start gap-[8px] w-full",
              "px-[16px] py-[16px] rounded-[6px]",
              "bg-agblack/30 backdrop-blur-lg",
              "font-extrabold",
            )}
          >
            <ProgressingStates
              states={lotteryState}
              journeyId={`${lotteriesInfo?.journeyId}`}
            />
          </div>

          <Table
            header={tableConfig.header}
            body={tableConfig.data}
            className="block lg:hidden"
            bodyClassName="text-center flex justify-center items-center"
          />
        </div>
      </div>
    </div>
  );
}
