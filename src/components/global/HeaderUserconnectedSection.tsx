"use client";

import { IMAGEKIT_LOGOS } from "@/images";
import { condenseAddress } from "@/lib/uiUtils";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { PiWarningCircle } from "react-icons/pi";
import { useAccount } from "wagmi";

export default function HeaderUserconnectedSection() {
  const account = useAccount();
  return (
    <div className="flex text-lg">
      <ConnectButton.Custom>
        {({ chain, openChainModal, mounted, openAccountModal }) => {
          if (chain && chain.unsupported) {
            return (
              <div className="flex justify-center items-center">
                <div
                  className="flex text-red-400 w-full h-full bg-agblack gap-2 items-center rounded-lg cursor-pointer focus:outline-none peer"
                  onClick={openChainModal}
                >
                  <PiWarningCircle className="text-brred w-8 h-8" />
                  <p className="uppercase font-extrabold text-brred bg-clip-text z-[100]">
                    {condenseAddress(`${account.address}`)}
                  </p>
                </div>
                <div className="peer-hover:flex hidden absolute bg-brred -bottom-8 z-10 rounded font-normal text-base px-8">
                  Wrong network
                </div>
              </div>
            );
          } else if (chain) {
            console.log("chain", chain);
            return (
              <>
                {/* desktop */}
                <div className="hidden lg:flex w-full h-full bg-agblack gap-2 items-center rounded-lg cursor-pointer focus:outline-none">
                  {chain.hasIcon ? (
                    <>
                      <Image
                        src={chain.iconUrl ?? ""}
                        alt={chain.name ?? ""}
                        width={40}
                        height={40}
                        className="w-[40px] h-[40px] rounded-full aspect-square"
                        onClick={openChainModal}
                      />
                      <p
                        className="flex flex-col justify-start items-start gap-0 text-[16px] leading-[16px] uppercase bg-gradient-to-b font-extrabold from-[#B4EBF8] to-[#789DFA] text-transparent bg-clip-text"
                        onClick={openAccountModal}
                      >
                        {condenseAddress(`${account.address}`)}
                      </p>
                    </>
                  ) : (
                    <>
                      <Image
                        src={IMAGEKIT_LOGOS.LOGO}
                        alt={chain.name ?? ""}
                        width={40}
                        height={40}
                        className="w-[40px] h-[40px] rounded-full aspect-square"
                        onClick={openChainModal}
                      />
                      <p
                        className="flex flex-col justify-start items-start gap-0 text-[16px] leading-[16px] uppercase bg-gradient-to-b font-extrabold from-[#B4EBF8] to-[#789DFA] text-transparent bg-clip-text"
                        onClick={openAccountModal}
                      >
                        {condenseAddress(`${account.address}`)}
                      </p>
                    </>
                  )}
                </div>
                {/* mobile */}
                <div className="flex flex-col lg:hidden w-full h-full bg-agblack gap-2 items-center rounded-lg cursor-pointer focus:outline-none">
                  {chain.hasIcon ? (
                    <>
                      <div className="flex justify-center items-center gap-2">
                        <Image
                          src={chain.iconUrl ?? ""}
                          alt={chain.name ?? ""}
                          width={40}
                          height={40}
                          className="w-[40px] h-[40px] rounded-full aspect-square"
                          onClick={openChainModal}
                        />
                        <p
                          className="flex flex-col justify-start items-start gap-0 text-[16px] leading-[16px] uppercase bg-gradient-to-b font-extrabold from-[#B4EBF8] to-[#789DFA] text-transparent bg-clip-text"
                          onClick={openAccountModal}
                        >
                          {condenseAddress(`${account.address}`)}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-center items-center gap-2">
                        <Image
                          src={IMAGEKIT_LOGOS.LOGO}
                          alt={chain.name ?? ""}
                          width={40}
                          height={40}
                          className="w-[40px] h-[40px] rounded-full aspect-square"
                          onClick={openChainModal}
                        />
                        <p
                          className="flex flex-col justify-start items-start gap-0 text-[16px] leading-[16px] uppercase bg-gradient-to-b font-extrabold from-[#B4EBF8] to-[#789DFA] text-transparent bg-clip-text"
                          onClick={openAccountModal}
                        >
                          {condenseAddress(`${account.address}`)}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </>
            );
          }
        }}
      </ConnectButton.Custom>
    </div>
  );
}
