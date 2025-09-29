"use client";

import { motion } from "framer-motion";
import { AboutServer } from "./AboutServer";

export const AboutWithAnimation = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{ willChange: "transform, opacity" }}
    >
      <AboutServer />
    </motion.div>
  );
};
