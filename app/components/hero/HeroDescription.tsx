import { motion } from "framer-motion";

type HeroDescriptionProps = {
  text: string;
};

export const HeroDescription = ({ text }: HeroDescriptionProps) => (
  <motion.p
    className="text-sm xs:text-base sm:text-lg md:text-xl text-muted-foreground mb-4 sm:mb-8 max-w-xs xs:max-w-md sm:max-w-2xl md:max-w-3xl mx-auto leading-relaxed animation-delay-400 break-words"
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
  >
    {text}
  </motion.p>
);
