"use client";

import { IMAGEKIT_LOGOS } from "@/images";
import { Gradients } from "@/lib/tailwindClassCombinators";
import { cn } from "@/lib/tailwindUtils";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import {
  PiListDuotone,
  PiRocketDuotone,
  PiRocketLaunchDuotone,
  PiTreasureChestDuotone,
  PiWalletDuotone,
  PiWarningDuotone,
  PiXCircleDuotone,
} from "react-icons/pi";
import Button from "../html/Button";
import { useAccount } from "wagmi";
import HeaderUserconnectedSection from "./HeaderUserconnectedSection";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { motion } from "framer-motion";
import {
  AutomaticTextAnimation,
  HoverTextAnimation,
} from "../animation/SeperateText";
import {
  AGPROJECT_LINK,
  EVIL_ADDRESS_AVAILABLE,
  UNWRAP_AVAILABLE,
} from "@/constants";
import useHeaderStats from "./useHeaderStats";
import { IoClose } from "react-icons/io5";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const account = useAccount();
  const { openConnectModal } = useConnectModal();
  const [isWarningOpen, setIsWarningOpen] = useState(true);

  const { treasuryDark, journey, userDark } = useHeaderStats();

  return (
    <header
      className={cn(
        "flex flex-col justify-center items-center",
        "mx-[16px] mt-[16px]",
        "w-full max-w-[1000px]",
      )}
    >
      <div
        className={cn(
          "grid",
          "bg-agyellow",
          "relative rounded-[8px] p-[2px] mx-[16px] my-[8px] lg:mt-[8px]",
          "text-agblack font-sans uppercase font-extrabold text-[10px] md:text-[14px] tracking-widest",
          "[&_svg]:text-[16px] md:[&_svg]:text-[24px]",
          "overflow-hidden",
          isWarningOpen ? "block" : "hidden",
        )}
      >
        <div className="grid grid-flow-col gap-[16px] px-[8px] md:px-[16px] py-[4px] rounded-[inherit] place-items-center text-center">
          <PiWarningDuotone /> Notice: Some features may be temporarily
          unavailable. Please refresh the page or check back later for updates.{" "}
          <PiWarningDuotone />
          <button
            className="absolute top-0 right-0 m-[4px] text-[16px] md:text-[16px] [&_svg]:text-[16px] md:[&_svg]:text-[16px]"
            onClick={() => setIsWarningOpen(false)}
          >
            <IoClose />
          </button>
        </div>
      </div>
      <div
        style={{
          marginTop: isWarningOpen ? "0px" : "32px",
        }}
        className={cn(
          "hidden lg:grid",
          Gradients.redToBlue,
          "relative rounded-t-[8px] p-[2px] mx-[16px]",
          "text-agwhite/[0.66] font-sans uppercase font-extrabold text-[16px] tracking-widest",
          "[&_svg]:text-[24px]",
          "overflow-hidden",
        )}
      >
        <div className="grid grid-flow-col gap-[16px] px-[16px] py-[8px] bg-agblack rounded-[inherit]">
          <div className="flex justify-center items-center gap-[8px]">
            <motion.div
              initial="initial"
              whileHover="hover"
              variants={{
                initial: { rotate: 0 },
                hover: {
                  rotate: [0, 10, -10, 10, 0],
                  transition: { duration: 0.25 },
                },
              }}
            >
              <PiTreasureChestDuotone />
            </motion.div>
            <p>Treasury $DARK:</p>
            <motion.div initial="initial" whileHover="hover">
              {treasuryDark >= 0 ? (
                <HoverTextAnimation.BounceReveal
                  text={treasuryDark.toLocaleString("en-US")}
                />
              ) : (
                <AutomaticTextAnimation.Loading />
              )}
            </motion.div>
          </div>
          <div className="flex justify-center items-center gap-[8px]">
            <motion.div initial="initial" whileHover="hover">
              <motion.div
                variants={{
                  initial: { opacity: 1, x: 0, y: 0 },
                  hover: {
                    opacity: [1, 0, 0, 0, 1],
                    x: [0, "100%", "-100%", 0],
                    y: [0, "-100%", "100%", 0],
                    transition: { duration: 1 },
                  },
                }}
              >
                <PiRocketLaunchDuotone />
              </motion.div>
            </motion.div>
            <p>Journey:</p>
            <motion.div initial="initial" whileHover="hover">
              {journey ? (
                <HoverTextAnimation.BounceReveal
                  text={journey.toLocaleString("en-US")}
                />
              ) : (
                <AutomaticTextAnimation.Loading />
              )}
            </motion.div>
          </div>
          {account.isConnected && (
            <div className="flex justify-center items-center gap-[8px]">
              <motion.div
                initial="initial"
                whileHover="hover"
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
              <p>User $DARK:</p>
              <motion.div initial="initial" whileHover="hover">
                {userDark >= 0 ? (
                  <HoverTextAnimation.BounceReveal
                    text={userDark.toLocaleString("en-US")}
                  />
                ) : (
                  <AutomaticTextAnimation.Loading />
                )}
              </motion.div>
            </div>
          )}
        </div>
      </div>
      <div
        className={cn(
          Gradients.redToBlue,
          "relative rounded-[8px] p-[2px] w-full",
        )}
      >
        {/* Desktop view */}
        <div
          className={cn(
            "hidden lg:flex justify-between items-center",
            "bg-agblack rounded-[inherit]",
            "px-[16px] py-[8px]",
          )}
        >
          <motion.div initial="initial" whileHover="hover">
            <Link href="/lottery" className="flex justify-center items-center">
              <Image
                src={IMAGEKIT_LOGOS.LOGO}
                alt="Antigravity"
                height={24}
                width={24}
                className="w-[42px] h-[42px]"
              />
              <h1
                className={cn(
                  Gradients.whiteGradientText,
                  "text-[14px] leading-[14px] font-extrabold font-sans uppercase",
                )}
              >
                <HoverTextAnimation.Fading text="Antigravity" />
              </h1>
            </Link>
          </motion.div>

          <div className="flex justify-center items-center gap-[16px]">
            <motion.div
              initial="initial"
              whileHover="hover"
              className={cn(
                Gradients.whiteGradientText,
                "font-sans uppercase font-extrabold text-[16px] leading-[16px] tracking-widest p-[8px]",
              )}
            >
              <Link href="/lottery" replace={true}>
                <HoverTextAnimation.Fading text="Lottery" />
              </Link>
            </motion.div>

            <Link href="/treasury" replace={true}>
              <motion.div
                initial="initial"
                whileHover="hover"
                className={cn(
                  "font-sans uppercase font-extrabold text-[16px] leading-[16px] tracking-widest p-[8px] cursor-pointer",
                )}
              >
                <HoverTextAnimation.Fading text="Treasury" />
              </motion.div>
            </Link>
            {EVIL_ADDRESS_AVAILABLE && (
              <Link href="/evil-address">
                <motion.div
                  initial="initial"
                  whileHover="hover"
                  className={cn(
                    "font-sans uppercase font-extrabold text-[16px] leading-[16px] tracking-widest p-[8px] cursor-pointer",
                  )}
                >
                  <HoverTextAnimation.Fading text="Evil" />
                </motion.div>
              </Link>
            )}
            {UNWRAP_AVAILABLE && (
              <Link href="/vaporize">
                <motion.div
                  initial="initial"
                  whileHover="hover"
                  className={cn(
                    "font-sans uppercase font-extrabold text-[16px] leading-[16px] tracking-widest p-[8px] cursor-pointer",
                  )}
                >
                  <HoverTextAnimation.Fading text="Vaporize" />
                </motion.div>
              </Link>
            )}
            <Link href={AGPROJECT_LINK} target="_blank">
              <motion.div
                initial="initial"
                whileHover="hover"
                className={cn(
                  "font-sans uppercase font-extrabold text-[16px] leading-[16px] tracking-widest p-[8px] cursor-pointer",
                )}
              >
                <HoverTextAnimation.Fading text="agproject.io" />
              </motion.div>
            </Link>
          </div>

          {account.isConnected ? (
            <div className="flex justify-center items-center gap-[16px]">
              <div className="w-[2px] h-[2.5rem] bg-gradient-to-b from-white via-[#999999] to-[#999999] rounded-full" />
              <HeaderUserconnectedSection />
            </div>
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
        </div>

        {/* Mobile view */}
        <div className="flex lg:hidden justify-between items-center bg-agblack px-[16px] py-[8px] rounded-[inherit]">
          <Link href="/lottery" className="flex justify-center items-center">
            <Image
              src={IMAGEKIT_LOGOS.LOGO}
              alt="Antigravity"
              height={24}
              width={24}
              className="w-[42px] h-[42px]"
            />
            <h1
              className={cn(
                Gradients.whiteGradientText,
                "text-[14px] leading-[14px] font-extrabold font-sans uppercase",
              )}
            >
              Antigravity
            </h1>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-agwhite text-[24px]"
          >
            {mobileMenuOpen ? <PiXCircleDuotone /> : <PiListDuotone />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div
            className={cn(
              Gradients.redToBlue,
              "absolute top-full mt-[16px]",
              "w-[calc(100%-4px)]",
              "p-[2px] rounded-[8px]",
              "block lg:hidden",
            )}
          >
            <div className="flex flex-col justify-center items-center gap-[32px] bg-agblack p-[32px] rounded-[inherit]">
              {account.isConnected ? (
                <HeaderUserconnectedSection />
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
                  <span>Connect wallet</span>
                </Button>
              )}
              <div
                className={cn(
                  Gradients.whiteToGrey,
                  "w-full h-[1px] rounded-full",
                )}
              ></div>
              <Link
                className={cn(
                  Gradients.whiteGradientText,
                  "font-sans uppercase font-extrabold text-[24px] leading-[14px] tracking-widest p-[8px]",
                )}
                href="/lottery"
              >
                Lottery
              </Link>
              <Link
                className={cn(
                  Gradients.whiteGradientText,
                  "font-sans uppercase font-extrabold text-[24px] leading-[14px] tracking-widest p-[8px]",
                )}
                href="/treasury"
              >
                Treasury
              </Link>
              {EVIL_ADDRESS_AVAILABLE && (
                <Link
                  className={cn(
                    Gradients.whiteGradientText,
                    "font-sans uppercase font-extrabold text-[24px] leading-[14px] tracking-widest p-[8px]",
                  )}
                  href="/evil-address"
                >
                  EVIL
                </Link>
              )}
              {UNWRAP_AVAILABLE && (
                <Link
                  className={cn(
                    Gradients.whiteGradientText,
                    "font-sans uppercase font-extrabold text-[24px] leading-[14px] tracking-widest p-[8px]",
                  )}
                  href="/vaporize"
                >
                  Vaporize
                </Link>
              )}
              <Link
                className={cn(
                  Gradients.whiteGradientText,
                  "font-sans uppercase font-extrabold text-[24px] leading-[14px] tracking-widest p-[8px]",
                )}
                href={AGPROJECT_LINK}
                target="_blank"
              >
                agrpoject.io
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

//
