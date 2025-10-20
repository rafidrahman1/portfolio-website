"use client";

import { Hero } from "@/components/hero/Hero";
import { AboutWithAnimation } from "@/components/portfolio/AboutWithAnimation";
import { Projects } from "@/components/portfolio/Projects";
import { SkillsWithAnimation } from "@/components/portfolio/SkillsWithAnimation";
import { Contact } from "@/components/portfolio/Contact";
import { Navigation } from "@/components/navigation/Navigation";


import { ProjectShowcaseHybrid } from "@/components/showcase/ProjectShowcaseHybrid";

export default function Home() {
    return (
        <div className="min-h-screen">
            <Navigation />
            <Hero />
            <AboutWithAnimation />
            <ProjectShowcaseHybrid />
            <Projects />
            <SkillsWithAnimation />
            <Contact />
        </div>
    )
}