"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/** Subtle one-shot reveal on scroll. Reduced motion is handled globally by MotionConfig. */
export const Reveal = ({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
  >
    {children}
  </motion.div>
);
