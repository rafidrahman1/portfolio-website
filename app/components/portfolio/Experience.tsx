"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { portfolio } from "@/lib/portfolio";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

type Job = (typeof portfolio.experience)[number];

const TimelineItem = ({ job, current, index }: { job: Job; current: boolean; index: number }) => {
  const ref = useRef<HTMLLIElement>(null);
  const seen = useInView(ref, { once: true, margin: "0px 0px -35% 0px" });

  return (
    <li ref={ref} className="relative pl-8 sm:pl-12">
      <span
        aria-hidden
        className={`absolute left-0 top-12 h-3 w-3 -translate-x-1/2 rounded-full border transition-[background-color,border-color,box-shadow] duration-500 lg:top-16 ${
          seen || current
            ? "border-primary bg-primary shadow-[0_0_0_4px_hsl(var(--background))]"
            : "border-muted-foreground bg-background"
        }`}
      />
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: index === 0 ? 0 : 0.05 }}
        className="grid gap-6 py-10 lg:grid-cols-12 lg:gap-8 lg:py-14"
      >
        <header className="lg:col-span-4">
          <p className="eyebrow flex items-center gap-2 text-muted-foreground">
            {current && <span className="rounded-sm bg-primary px-1.5 py-0.5 text-[10px] font-medium text-primary-foreground">Current</span>}
            {job.period}
          </p>
          <h3 className={`mt-4 font-semibold tracking-tight ${current ? "text-title" : "text-2xl"}`}>{job.company}</h3>
          <p className="mt-2 text-muted-foreground">{job.title}</p>
        </header>

        <div className="lg:col-span-8">
          <p className={current ? "text-lead" : "text-muted-foreground"}>{job.description}</p>
          <ul className="mt-6 space-y-4">
            {job.achievements.map((a) => (
              <li key={a} className="flex gap-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-primary" />
                <span>{a}</span>
              </li>
            ))}
          </ul>
          <ul className="mt-6 flex flex-wrap gap-x-2 gap-y-1 font-mono text-xs text-foreground/70" aria-label="Technologies">
            {job.technologies.map((t, k) => (
              <li key={t}>
                {t}
                {k < job.technologies.length - 1 && <span aria-hidden className="ml-2 text-border">/</span>}
              </li>
            ))}
          </ul>
        </div>
      </motion.article>
    </li>
  );
};

export const Experience = () => {
  const experiences = portfolio.experience;
  const listRef = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 65%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  return (
    <section id="experience" className="section-pad border-t border-border bg-surface">
      <div className="container-page">
        <SectionHeader index="02" label="Experience" title={<>Where I&apos;ve worked.</>} />

        <Reveal>
          <ol ref={listRef} className="relative ml-1.5 border-t border-transparent">
            {/* base rail + scroll-drawn accent rail */}
            <span aria-hidden className="absolute bottom-0 left-0 top-0 w-px bg-border" />
            <motion.span
              aria-hidden
              className="absolute bottom-0 left-0 top-0 w-px origin-top bg-primary"
              style={{ scaleY: reduce ? 1 : progress }}
            />
            {experiences.map((job, i) => (
              <TimelineItem key={`${job.company}-${job.period}`} job={job} current={i === 0} index={i} />
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
};
