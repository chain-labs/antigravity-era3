"use client";

import { IMAGEKIT_LOGOS } from "@/images";
import { Gradients } from "@/lib/tailwindClassCombinators";
import { cn } from "@/lib/tailwindUtils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  PiListDuotone,
  PiWalletDuotone,
  PiXCircleDuotone,
} from "react-icons/pi";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <header
      className={cn(
        Gradients.redToBlue,
        "relative rounded-[8px] p-[2px] mx-[16px] mt-[16px] lg:mt-[32px]",
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
        <div className="flex justify-center items-center">
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
        </div>

        <div className="flex justify-center items-center gap-[16px]">
          <Link
            className={cn(
              Gradients.whiteGradientText,
              "font-sans uppercase font-extrabold text-[16px] leading-[16px] tracking-widest p-[8px]",
            )}
            href="/lottery"
          >
            Lottery
          </Link>
          <Link
            className={cn(
              Gradients.whiteGradientText,
              "font-sans uppercase font-extrabold text-[16px] leading-[16px] tracking-widest p-[8px]",
            )}
            href="/treasury"
          >
            Treasury
          </Link>
          <Link
            className={cn(
              Gradients.whiteGradientText,
              "font-sans uppercase font-extrabold text-[16px] leading-[16px] tracking-widest p-[8px]",
            )}
            href="/unwrap"
          >
            Unwrap
          </Link>
        </div>

        <div>
          <button
            className={cn(
              "px-[16px] py-[12px]",
              "flex justify-center items-center gap-[8px]",
              "bg-brblue rounded-[4px]",
              "uppercase text-agwhite tracking-widest text-[16px] font-extrabold",
              "[&_svg]:text-[24px]",
            )}
          >
            <PiWalletDuotone />
            <span>Connect wallet</span>
          </button>
        </div>
      </div>

      {/* Mobile view */}
      <div className="flex lg:hidden justify-between items-center bg-agblack px-[16px] py-[8px] rounded-[inherit]">
        <div className="flex justify-center items-center">
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
        </div>

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
            <button
              className={cn(
                "px-[16px] py-[12px]",
                "flex justify-center items-center gap-[8px]",
                "bg-brblue rounded-[4px]",
                "uppercase text-agwhite tracking-widest text-[16px] font-extrabold",
                "[&_svg]:text-[24px]",
              )}
            >
              <PiWalletDuotone />
              <span>Connect wallet</span>
            </button>
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
            <Link
              className={cn(
                Gradients.whiteGradientText,
                "font-sans uppercase font-extrabold text-[24px] leading-[14px] tracking-widest p-[8px]",
              )}
              href="/unwrap"
            >
              Unwrap
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
