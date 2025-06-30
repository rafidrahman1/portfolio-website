import { motion } from "framer-motion";

export const HeroDescription = () => (
    <motion.p
        className="text-sm xs:text-base sm:text-lg md:text-xl text-muted-foreground mb-4 sm:mb-8 max-w-xs xs:max-w-md sm:max-w-2xl md:max-w-3xl mx-auto leading-relaxed animation-delay-400 break-words"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
    >
        Passionate about building scalable web applications with React, Next.js, and Node.js. Specializing in AI integration and creating user-centric digital experiences.
    </motion.p>
);
