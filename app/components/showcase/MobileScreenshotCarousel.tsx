"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ChevronLeft, ChevronRight } from "lucide-react";

type MobileScreenshotCarouselProps = {
  title: string;
  images: string[];
  intervalMs?: number;
  priority?: boolean;
};

export const MobileScreenshotCarousel = ({
  title,
  images,
  intervalMs = 4000,
  priority = false,
}: MobileScreenshotCarouselProps) => {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goNext = useCallback(() => {
    setIndex((current) => (current + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setIndex((current) => (current - 1 + images.length) % images.length);
  }, [images.length]);

  const resetAutoPlay = useCallback(() => {
    if (images.length <= 1) return;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(goNext, intervalMs);
  }, [goNext, images.length, intervalMs]);

  useEffect(() => {
    resetAutoPlay();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [resetAutoPlay]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
        resetAutoPlay();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
        resetAutoPlay();
      }
    };

    container.addEventListener("keydown", onKeyDown);
    return () => container.removeEventListener("keydown", onKeyDown);
  }, [goNext, goPrev, resetAutoPlay]);

  if (images.length === 0) return null;

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label={`${title} screenshots`}
      className="group relative outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-xl"
      onMouseEnter={() => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      }}
      onMouseLeave={resetAutoPlay}
    >
      <AspectRatio ratio={9 / 19.5}>
        <div className="relative h-full w-full overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={images[index]}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={images[index]}
                alt={`${title} screenshot ${index + 1} of ${images.length}`}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 75vw, (max-width: 1200px) 40vw, 18rem"
                priority={priority && index === 0}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </AspectRatio>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => {
              goPrev();
              resetAutoPlay();
            }}
            aria-label="Previous screenshot"
            className="absolute left-1 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-1.5 text-white opacity-0 transition-opacity hover:bg-black/70 group-hover:opacity-100 group-focus-within:opacity-100 sm:left-2 sm:p-2"
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>

          <button
            type="button"
            onClick={() => {
              goNext();
              resetAutoPlay();
            }}
            aria-label="Next screenshot"
            className="absolute right-1 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-1.5 text-white opacity-0 transition-opacity hover:bg-black/70 group-hover:opacity-100 group-focus-within:opacity-100 sm:right-2 sm:p-2"
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>

          <div className="absolute bottom-2 right-2 z-10 rounded-md bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white/90 tabular-nums">
            {index + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  );
};
