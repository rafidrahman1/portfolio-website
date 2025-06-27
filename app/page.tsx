"use client";

import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/portfolio/About";
import { Projects } from "@/components/portfolio/Projects";
import { Skills } from "@/components/portfolio/Skills";
import { Contact } from "@/components/portfolio/Contact";
import { Navigation } from "@/components/navigation/Navigation";
import { ProjectShowcase } from "@/components/showcase/ProjectShowcase";

export default function Home() {
    return (
        <div className="min-h-screen bg-background">
            <Navigation />
            <Hero />
            <About />
            <ProjectShowcase/>
            <Projects />
            <Skills />
            <Contact />
        </div>
    )
}