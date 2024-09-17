"use client";

import { IMAGEKIT_LOGOS } from "@/images";
import { Gradients } from "@/lib/tailwindClassCombinators";
import { cn } from "@/lib/tailwindUtils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  PiListDuotone,
  PiRocketDuotone,
  PiRocketLaunchDuotone,
  PiTreasureChestDuotone,
  PiWalletDuotone,
  PiXCircleDuotone,
} from "react-icons/pi";
import Button from "../html/Button";
import { useAccount } from "wagmi";
import HeaderUserconnectedSection from "./HeaderUserconnectedSection";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { motion } from "framer-motion";
import { HoverTextAnimation } from "../animation/SeperateText";
import {
  EVIL_ADDRESS_AVAILABLE,
  UNWRAP_AVAILABLE,
} from "@/constants";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const account = useAccount();
  const { openConnectModal } = useConnectModal();

  const data = {
    treasurydark: 500000,
    journey: 1,
    userdark: 23432443,
  };

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
          "hidden lg:grid",
          Gradients.redToBlue,
          "relative rounded-t-[8px] p-[2px] pb-0 mx-[16px] mt-[16px] lg:mt-[32px]",
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
            <motion.p initial="initial" whileHover="hover">
              <HoverTextAnimation.BounceReveal
                text={data.treasurydark.toLocaleString("en-US")}
              />
            </motion.p>
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
            <motion.p initial="initial" whileHover="hover">
              <HoverTextAnimation.BounceReveal
                text={data.journey.toLocaleString("en-US")}
              />
            </motion.p>
          </div>
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
            <motion.p initial="initial" whileHover="hover">
              <HoverTextAnimation.BounceReveal
                text={data.userdark.toLocaleString("en-US")}
              />
            </motion.p>
          </div>
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
          <motion.p initial="initial" whileHover="hover">
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
          </motion.p>

          <div className="flex justify-center items-center gap-[16px]">
            <motion.p
              initial="initial"
              whileHover="hover"
              className={cn(
                "font-sans uppercase font-extrabold text-[16px] leading-[16px] tracking-widest p-[8px] cursor-pointer",
              )}
            >
              <Link href="/lottery">
                <HoverTextAnimation.Fading text="Lottery" />
              </Link>
            </motion.p>

            <Link href="/treasury">
              <motion.p
                initial="initial"
                whileHover="hover"
                className={cn(
                  "font-sans uppercase font-extrabold text-[16px] leading-[16px] tracking-widest p-[8px] cursor-pointer",
                )}
              >
                <HoverTextAnimation.Fading text="Treasury" />
              </motion.p>
            </Link>
            {EVIL_ADDRESS_AVAILABLE && (
              <Link href="/evil-address">
                <motion.p
                  initial="initial"
                  whileHover="hover"
                  className={cn(
                    "font-sans uppercase font-extrabold text-[16px] leading-[16px] tracking-widest p-[8px] cursor-pointer",
                  )}
                >
                  <HoverTextAnimation.Fading text="Evil" />
                </motion.p>
              </Link>
            )}
            {UNWRAP_AVAILABLE && (
              <Link href="/unwrap">
                <motion.p
                  initial="initial"
                  whileHover="hover"
                  className={cn(
                    "font-sans uppercase font-extrabold text-[16px] leading-[16px] tracking-widest p-[8px] cursor-pointer",
                  )}
                >
                  <HoverTextAnimation.Fading text="Unwrap" />
                </motion.p>
              </Link>
            )}
            <Link href="https://test.agproject.io" target="_blank">
              <motion.p
                initial="initial"
                whileHover="hover"
                className={cn(
                  "font-sans uppercase font-extrabold text-[16px] leading-[16px] tracking-widest p-[8px] cursor-pointer",
                )}
              >
                <HoverTextAnimation.Fading text="test.agproject.io" />
              </motion.p>
            </Link>
          </div>

          {account.isConnected ? (
            <>
              <div className="w-[2px] h-[2.5rem] bg-gradient-to-b from-white via-[#999999] to-[#999999] rounded-full" />
              <HeaderUserconnectedSection />
            </>
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
                  href="/unwrap"
                >
                  Unwrap
                </Link>
              )}
              <Link
                className={cn(
                  Gradients.whiteGradientText,
                  "font-sans uppercase font-extrabold text-[24px] leading-[14px] tracking-widest p-[8px]",
                )}
                href="https://test.agproject.io"
                target="_blank"
              >
                test.agrpoject.io
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
