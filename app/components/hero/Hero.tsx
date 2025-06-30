import { GitHubCalendar } from "@/components/hero/githubCalendar/GitHubCalendar";
import { HeroAvatar } from "./HeroAvatar";
import { HeroHeading } from "./HeroHeading";
import { HeroDescription } from "./HeroDescription";
import { HeroSocials } from "./HeroSocials";
import { HeroBackground } from "./HeroBackground";
import { AskMeAnythingBubble } from "./AskMeAnythingBubble";
import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <>
      <motion.section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden py-8 sm:py-16 bg-gradient-to-br from-[#181c26] via-[#191b23] to-[#1c202a]"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <HeroBackground />
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
          <div className="flex items-center gap-4 justify-center sm:justify-start">
            <HeroAvatar />
            <div className="hidden sm:block">
              <AskMeAnythingBubble />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-center md:items-start">
            {/* LEFT COLUMN */}
            <div className="text-center md:text-left">
              <HeroHeading />
              <HeroDescription />
            </div>
            {/* RIGHT COLUMN */}
            <div className="flex-1 flex flex-col items-center md:items-end w-full space-y-8">
              <div className="w-full max-w-lg  rounded-xl shadow-lg p-4 md:p-6">
                <GitHubCalendar username="rafidrahman1" />
              </div>
              <div className="w-full flex justify-center md:justify-end">
                <HeroSocials />
              </div>
            </div>
          </div>
        </div>
      </motion.section>
      {/* Mobile AskMeAnythingBubble fixed at bottom */}
      <div className="block sm:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
        <div className="pointer-events-auto max-w-xs w-full flex justify-center">
          <AskMeAnythingBubble />
        </div>
      </div>
    </>
  );
};
