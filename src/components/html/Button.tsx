"use client";

import { cn } from "@/lib/tailwindUtils";
import React from "react";
import { AnimationProps, motion, MotionProps } from "framer-motion";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps & MotionProps> = ({
  className,
  children,
  ...buttonProps
}) => {
  return (
    <motion.button
      className={cn(
        "px-[16px] py-[12px] rounded-[4px]",
        "bg-brblue shadow-[0_4px_0_black] hover:shadow-[0_0_0_black] hover:translate-y-[4px] transition-all duration-150",
        "text-agwhite font-sans font-extrabold text-[16px] uppercase tracking-widest",
        "grid place-items-center grid-flow-col gap-[8px]",
        "[&_svg]:text-[24px]",
        "disabled:opacity-[0.5] disabled:cursor-not-allowed disabled:select-none",
        "active:bg-agblack",
        className, // Merge the passed className with the default classes
      )}
      {...buttonProps}
    >
      {children}
    </motion.button>
  );
};

export default Button;
