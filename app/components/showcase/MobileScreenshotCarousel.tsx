"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ChevronLeft, ChevronRight } from "lucide-react";

type MobileScreenshotCarouselProps = {
  title: string;
  images: string[];
  intervalMs?: number;
  priority?: boolean;
};

const preloadImage = (src: string) => {
  const img = new window.Image();
  img.src = src;
};

export const MobileScreenshotCarousel = ({
  title,
  images,
  intervalMs = 4000,
  priority = false,
}: MobileScreenshotCarouselProps) => {
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const preloadedRef = useRef<Set<string>>(new Set());

  const preload = useCallback((src: string) => {
    if (preloadedRef.current.has(src)) return;
    preloadedRef.current.add(src);
    preloadImage(src);
  }, []);

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
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
        }
      },
      { rootMargin: "240px" },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || images.length === 0) return;

    preload(images[0]);
    preload(images[1] ?? images[0]);

    const preloadRest = () => images.forEach((src) => preload(src));

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(preloadRest, { timeout: 2000 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = setTimeout(preloadRest, 300);
    return () => clearTimeout(timeoutId);
  }, [images, isVisible, preload]);

  useEffect(() => {
    if (images.length <= 1) return;

    preload(images[(index + 1) % images.length]);
    preload(images[(index - 1 + images.length) % images.length]);
  }, [images, index, preload]);

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

  const visibleIndexes = new Set([
    index,
    (index + 1) % images.length,
    (index - 1 + images.length) % images.length,
  ]);

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
          {Array.from(visibleIndexes).map((imageIndex) => (
            <div
              key={images[imageIndex]}
              className={`absolute inset-0 transition-opacity duration-200 ${
                imageIndex === index ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
              aria-hidden={imageIndex !== index}
            >
              <Image
                src={images[imageIndex]}
                alt={`${title} screenshot ${imageIndex + 1} of ${images.length}`}
                fill
                className="object-cover object-top"
                sizes="18rem"
                quality={75}
                priority={priority && imageIndex === 0}
                loading={priority && imageIndex === 0 ? "eager" : "lazy"}
              />
            </div>
          ))}
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
            className="absolute left-1 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/50 p-1.5 text-white opacity-0 transition-opacity hover:bg-black/70 group-hover:opacity-100 group-focus-within:opacity-100 sm:left-2 sm:p-2"
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
            className="absolute right-1 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/50 p-1.5 text-white opacity-0 transition-opacity hover:bg-black/70 group-hover:opacity-100 group-focus-within:opacity-100 sm:right-2 sm:p-2"
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>

          <div className="absolute bottom-2 right-2 z-20 rounded-md bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white/90 tabular-nums">
            {index + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  );
};
