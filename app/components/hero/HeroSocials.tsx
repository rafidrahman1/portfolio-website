import { Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export const HeroSocials = () => (
    <motion.div
        className="flex flex-col gap-3 w-full sm:flex-row sm:items-center sm:justify-center sm:gap-4 mb-4 sm:mb-8 animation-delay-800"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.8 }}
    >
        <Button
            variant="outline"
            size="lg"
            asChild
            className="w-full sm:w-auto hover:scale-105 transition-all duration-300 hover:shadow-md"
        >
            <a
                href="https://github.com/rafidrahman1"
                target="_blank"
                rel="noopener noreferrer"
            >
                <Github className="mr-2 h-4 w-4" />
                GitHub
            </a>
        </Button>
        <Button
            variant="outline"
            size="lg"
            asChild
            className="w-full sm:w-auto hover:scale-105 transition-all duration-300 hover:shadow-md"
        >
            <a
                href="https://linkedin.com/in/rafidrahman1"
                target="_blank"
                rel="noopener noreferrer"
            >
                <Linkedin className="mr-2 h-4 w-4" />
                LinkedIn
            </a>
        </Button>
    </motion.div>
);
