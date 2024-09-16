"use client";

import { motion, MotionProps, Variants } from "framer-motion";

interface SeperateTextProps extends MotionProps {
  text: string;
  variants: {
    container: Variants;
    children: Variants;
  };
}

export default function SeperateText({
  text,
  variants,
  ...props
}: SeperateTextProps) {
  return (
    <motion.div {...props} variants={variants.container}>
      <span className="sr-only">{text}</span>
      {text.split("").map((letter, index) => (
        <motion.span
          key={index}
          style={{ display: "inline-block", whiteSpace: "pre" }}
          variants={variants.children}
          className="not-sr-only"
        >
          {letter}
        </motion.span>
      ))}
    </motion.div>
  );
}

export class HoverTextAnimation {
  static Fading({ text }: { text: string }) {
    return (
      <SeperateText
        text={text}
        variants={{
          container: {
            initial: {},
            hover: {
              transition: { staggerChildren: 0.05 },
            },
          },
          children: {
            initial: { filter: "blur(0)" },
            hover: {
              filter: ["blur(0)", "blur(2px)", "blur(0)"],
            },
          },
        }}
      />
    );
  }

  static BounceReveal({ text }: { text: string }) {
    return (
      <SeperateText
        text={text}
        variants={{
          container: {
            initial: {},
            hover: {
              transition: { staggerChildren: 0.1 },
            },
          },
          children: {
            initial: { scale: 1 },
            hover: {
              scale: [0, 1],
            },
          },
        }}
      />
    );
  }

  static RollingIn({ text }: { text: string }) {
    return (
      <SeperateText
        text={text}
        variants={{
          container: {
            initial: {},
            hover: {
              overflow: "hidden",
              transition: { staggerChildren: 0.5 / text.length },
            },
          },
          children: {
            initial: { opacity: 1, y: 0 },
            hover: { opacity: [1, 0, 0, 0, 1], y: [0, 20, -20, 0] },
          },
        }}
      />
    );
  }
}
