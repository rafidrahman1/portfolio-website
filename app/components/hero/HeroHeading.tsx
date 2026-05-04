import { motion } from "framer-motion";

type HeroHeadingProps = {
  name: string;
  subtitle: string;
};

export const HeroHeading = ({ name, subtitle }: HeroHeadingProps) => (
  <>
    <h1 className="text-2xl xs:text-3xl sm:text-5xl md:text-7xl font-bold mb-1 sm:mb-2 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent animate-gradient-x break-words">
      {name}
    </h1>
    <h2 className="text-base xs:text-lg sm:text-xl md:text-3xl text-muted-foreground mb-2 sm:mb-4 font-light animation-delay-200">
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        style={{ display: "inline-block" }}
      >
        {subtitle}
      </motion.span>
    </h2>
  </>
);
