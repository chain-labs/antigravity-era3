"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/tailwindUtils";
import { Gradients } from "@/lib/tailwindClassCombinators";
import { IMAGEKIT_BACKGROUNDS, IMAGEKIT_LOGOS } from "@/images";
import Button from "@/components/html/Button";
import { PiRocketDuotone } from "react-icons/pi";

export default function Error() {
  return (
    <div
      style={{
        backgroundImage: `url(${IMAGEKIT_BACKGROUNDS.INTERNAL_ERROR})`,
      }}
      className={`fixed left-0 h-screen w-screen overflow-hidden bg-gradient-to-b from-[#030404] to-[#131A1A] z-[10000] bg-[70%_50%] bg-cover bg-no-repeat`}
    >
      <div className="absolute top-0 left-0 flex justify-center items-center gap-[16px] px-[16px] py-[32px] md:py-[48px] md:px-[96px] w-full md:w-fit">
        <Link href="/lottery" className="flex justify-center items-center">
          <Image
            src={IMAGEKIT_LOGOS.LOGO}
            alt="logo"
            width={45.19}
            height={45.19}
            className="w-[53.51px] h-[53.51px] md:w-[45.19px] md:h-[45.19px]"
          />
          <h1
            className={cn(
              Gradients.whiteGradientText,
              "uppercase text-[24px] leading-[24px] md:text-[19px] font-sans font-extrabold",
            )}
          >
            Antigravity
          </h1>
        </Link>
      </div>

      <div className="absolute bottom-0 left-0 flex flex-col justify-start items-start gap-[8px] p-[16px] md:py-[48px] md:px-[96px]">
        <h1
          className={cn(
            Gradients.whiteGradientText,
            "text-[48px] leading-[46.08px] md:text-[64px] md:leading-[61.44px] font-sans font-black",
          )}
        >
          Oops!
          <br className="hidden md:block" /> Looks like our spaceship&apos;s
          broken.
        </h1>
        <p className="font-sans">
          Sorry! The page you were trying to access is down right now because of
          a server issue. Try again later.
        </p>
        <Link href="/lottery" className="w-full">
          <Button>
            <PiRocketDuotone /> Refresh
          </Button>
        </Link>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#000] via-[#00000000] to-[#000] -z-[1] opacity-70"></div>
    </div>
  );
}
