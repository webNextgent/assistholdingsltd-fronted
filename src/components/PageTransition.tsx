/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  motion,
  AnimatePresence,
  TargetAndTransition,
  Variants,
} from "framer-motion";
import { usePathname } from "next/navigation";
import React from "react";

const NUM_PANELS = 7;
const PANEL_INDICES = Array.from({ length: NUM_PANELS }, (_, i) => i);

const panelVariants: Variants = {
  initial: { y: 0 },

  animate: (i: number): TargetAndTransition => ({
    y: "-100%",
    transition: {
      duration: 0.35, 
      ease: [0.45, 0, 0.55, 1] as any,
      delay: (NUM_PANELS - 1 - i) * 0.05, 
    },
  }),

  exit: (i: number): TargetAndTransition => ({
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.45, 0, 0.55, 1] as any,
      delay: i * 0.05, 
    },
  }),
};

export default function CurtainTransition() {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        className="fixed inset-0 z-9999 pointer-events-none"
      >
        {[...PANEL_INDICES].reverse().map((i) => (
          <motion.div
            key={i}
            custom={i}
            variants={panelVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute top-0 bottom-0 bg-black"
            style={{
              left: `${(i / NUM_PANELS) * 100}%`,
              width: `${(1 / NUM_PANELS) * 100}%`,
            }}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
