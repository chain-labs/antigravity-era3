"use client";
import Header from "@/components/global/Header";
import { motion } from "framer-motion";

export default function template({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
    >
      <div className="fixed top-0 left-0 w-full flex justify-center items-center z-50">
        <Header />
      </div>
      {children}
    </motion.div>
  );
}
