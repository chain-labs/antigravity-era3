"use client";

import Timer from "@/components/global/Timer";
import Button from "@/components/html/Button";
import Input from "@/components/html/Input";
import Table from "@/components/html/Table";
import { IMAGEKIT_BACKGROUNDS, IMAGEKIT_ICONS, IMAGEKIT_LOGOS } from "@/images";
import { Backdrop, Gradients, Shapes } from "@/lib/tailwindClassCombinators";
import { cn } from "@/lib/tailwindUtils";
import Image from "next/image";
import {
  PiCheckCircle,
  PiCube,
  PiDropboxLogoDuotone,
  PiTrophyDuotone,
  PiWalletDuotone,
  PiWrenchDuotone,
} from "react-icons/pi";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { IoClose } from "react-icons/io5";
import { notFound } from "next/navigation";
import { BACKGROUNDS, UNWRAP_AVAILABLE } from "@/constants";
import {
  AutomaticTextAnimation,
  HoverTextAnimation,
} from "@/components/animation/SeperateText";
import useUnwrap from "@/hooks/core/useUnwrap";
import { table } from "console";
import { useAccount } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";

const RadioGroup = ({
  label,
  options,
  state,
  setState,
}: {
  label: string;
  options: { value: string; label: string }[];
  state: string;
  setState: (arg0: string) => void;
}) => {
  return (
    <div className="flex flex-col mt-2">
      <label className="text-xs font-semibold text-agwhite mb-1">{label}</label>
      <div className="flex space-x-2">
        {options.map((option) => (
          <label
            key={option.value}
            className={cn(
              "flex items-center justify-center px-2 py-1 text-xs font-semibold rounded cursor-pointer transition-all duration-200",
              state === option.value
                ? "bg-agyellow text-agblack"
                : "bg-agblack/50 text-agwhite hover:bg-agblack/70",
            )}
          >
            <input
              type="radio"
              value={option.value}
              checked={state === option.value}
              onChange={() => setState(option.value)}
              className="sr-only"
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default function UnwrapPage() {
  const [inputValue, setInputValue] = useState<number>(0);
  const [sortOption, setSortOption] = useState("recentYield");

  const optimized = useMemo(() => {
    switch (sortOption) {
      case "recentYield":
        return false;
      case "maxYield":
        return true;
      default:
        return false;
    }
  }, [sortOption]);

  const account = useAccount();
  const { openConnectModal } = useConnectModal();

  const { tableData, totalFuelCells, isApproved, unwrapFn, dataLoading } =
    useUnwrap(inputValue, optimized);

  const tableConfigs = {
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
    data: tableData,
  };

  const [tableReveal, setTableReveal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUnwrapSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (account.isConnected) {
      setLoading(true);
      await unwrapFn();
      setLoading(false);
    }
  };

  if (UNWRAP_AVAILABLE === false) {
    return notFound();
  }

  return (
    <div
      style={{
        backgroundImage: `url('${BACKGROUNDS.UNWRAP}')`,
      }}
      className="relative flex justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat"
    >
      <div className={cn(Backdrop.darkOverlay)}></div>
      <div
        className={cn(
          "flex flex-col items-center justify-center gap-[50px]",
          "lg:flex lg:flex-row lg:justify-start lg:items-start gap-[30px]",
          "pt-[100px]",
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
            Vaporize
          </h1>
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
                onSubmit={handleUnwrapSubmit}
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
                  <Input
                    className="w-[10ch]"
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                    max={totalFuelCells}
                    color="red"
                  />
                  <div>
                    <motion.div
                      initial="initial"
                      whileHover="hover"
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
                        <HoverTextAnimation.Fading text="Fuel&nbsp;Cells" />
                      </span>
                    </motion.div>
                    <p className="text-xs font-semibold mt-2 flex items-center gap-x-1">
                      Max:{" "}
                      <span className="text-agyellow font-bold flex items-center gap-x-1">
                        {dataLoading ? (
                          <AutomaticTextAnimation.Loading />
                        ) : (
                          totalFuelCells
                        )}{" "}
                        FuelCells
                      </span>
                    </p>
                    <div>
                      <RadioGroup
                        label="Sort Yield by"
                        options={[
                          { value: "recentYield", label: "Recent" },
                          { value: "maxYield", label: "Max" },
                        ]}
                        state={sortOption}
                        setState={setSortOption}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center gap-[8px]">
                  {account.isConnected ? (
                    <Button
                      initial="initial"
                      whileHover="hover"
                      type="submit"
                      disabled={loading || inputValue > totalFuelCells}
                      loading={loading}
                      loadingText="Vaporizing..."
                    >
                      <motion.div
                        variants={{
                          initial: { rotate: 0, scale: 1 },
                          hover: {
                            rotate: isApproved ? 180 : 0,
                            scale: isApproved ? 1 : 1.25,
                            transition: { duration: 0.25 },
                          },
                        }}
                      >
                        {isApproved ? (
                          <PiDropboxLogoDuotone />
                        ) : (
                          <PiCheckCircle />
                        )}
                      </motion.div>
                      <HoverTextAnimation.RollingIn
                        text={
                          isApproved
                            ? totalFuelCells >= inputValue
                              ? "Vaporize"
                              : "Insufficent Fuel Cells"
                            : "Approve Treasury"
                        }
                      />
                    </Button>
                  ) : (
                    <Button
                      onClick={openConnectModal}
                      initial="initial"
                      whileHover="hover"
                    >
                      <motion.div
                        variants={{
                          initial: { rotate: 0 },
                          hover: {
                            rotate: [0, 10, -10, 10, 0],
                            transition: { duration: 0.25 },
                          },
                        }}
                      >
                        <PiWalletDuotone />
                      </motion.div>
                      <HoverTextAnimation.RollingIn text="Connect wallet" />
                    </Button>
                  )}
                  {account.isConnected && (
                    <motion.button
                      initial="initial"
                      whileHover="hover"
                      type="button"
                      onClick={() => setTableReveal(true)}
                      className="bg-none underline text-agwhite font-sans font-semibold px-[16px] py-[4px] rounded-[6px] bg-agblack/50 backdrop-blur-lg"
                    >
                      <HoverTextAnimation.RollingIn text="View Selected Fuel Cells" />
                    </motion.button>
                  )}
                </div>
              </form>
              {/* <div
                className={cn(
                  "flex flex-col justify-start items-start gap-[8px]",
                  "p-[8px] rounded-[6px]",
                  "bg-agblack/50 backdrop-blur-lg",
                  "font-extrabold",
                )}
              >
                <Timer
                  label="Until we win"
                  timestamp={new Date().getTime() + 1000}
                />
              </div> */}
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
              <Table header={tableConfigs.header} body={tableConfigs.data} />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
