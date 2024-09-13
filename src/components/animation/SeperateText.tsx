import {
  AnimationProps,
  motion,
  MotionProps,
  Variant,
  Variants,
} from "framer-motion";

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
      {text.split("").map((letter, index) => (
        <motion.span
          key={index}
          style={{ display: "inline-block" }}
          variants={variants.children}
        >
          {letter}
        </motion.span>
      ))}
    </motion.div>
  );
}
