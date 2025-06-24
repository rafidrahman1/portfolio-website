"use client";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Experience } from "@/components/portfolio/Experience";
import { Projects } from "@/components/portfolio/Projects";
import { Skills } from "@/components/portfolio/Skills";
import { Contact } from "@/components/portfolio/Contact";
import { Navigation } from "@/components/portfolio/Navigation";

export default function Home() {
    return (
        <div className="min-h-screen bg-background">
            <Navigation />
            <Hero />
            <About />
            <Experience />
            <Projects />
            <Skills />
            <Contact />
        </div>
    )
}