import { ArrowDown, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { GitHubCalendar } from "@/components/githubCalendar/GitHubCalendar";

export const Hero = () => {
  const scrollToAbout = () => {
    const aboutSection = document.querySelector("#about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden py-8 sm:py-16">
      {/* Enhanced background with animated gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent animate-pulse"></div>
      </div>

      {/* Floating elements - hidden on mobile for better performance */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float hidden sm:block"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-float-delayed hidden sm:block"></div>

      <div className="w-full max-w-md sm:max-w-2xl md:max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="flex flex-col items-center space-y-6 sm:space-y-10">
          {/* Profile Picture */}
          <div className="flex justify-center mt-12 mb-2 sm:mb-4">
            <Avatar className="w-20 h-20 xs:w-24 xs:h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 ring-4 ring-primary/20 shadow-2xl hover:scale-105 transition-all duration-500 hover:ring-primary/40">
              <AvatarImage
                src="https://lh3.googleusercontent.com/a/ACg8ocKD9J1t89kCMvX4aD1tzyVfXmilQnwaiwVHVJfP2aIjZOUN-44dDw=s288-c-no"
                alt="Rafid Rahman"
                className="object-cover"
              />
              <AvatarFallback className="text-lg xs:text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
                RR
              </AvatarFallback>
            </Avatar>
          </div>

          <h1 className="text-2xl xs:text-3xl sm:text-5xl md:text-7xl font-bold mb-1 sm:mb-2 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent animate-gradient-x break-words">
            Rafid Rahman
          </h1>
          <h2 className="text-base xs:text-lg sm:text-xl md:text-3xl text-muted-foreground mb-2 sm:mb-4 font-light animate-fade-in-up animation-delay-200">
            Full-Stack Developer
          </h2>
          <p className="text-sm xs:text-base sm:text-lg md:text-xl text-muted-foreground mb-4 sm:mb-8 max-w-xs xs:max-w-md sm:max-w-2xl md:max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-400 break-words">
            Passionate about building scalable web applications with React, Next.js, and Node.js. Specializing in AI integration and creating user-centric digital experiences.
          </p>

          <div className="w-full animate-fade-in-up animation-delay-600">
            <GitHubCalendar username="rafidrahman1" />
          </div>

          <div className="flex flex-col gap-3 w-full sm:flex-row sm:items-center sm:justify-center sm:gap-4 mb-4 sm:mb-8 animate-fade-in-up animation-delay-800">
            <Button variant="outline" size="lg" asChild className="w-full sm:w-auto hover:scale-105 transition-all duration-300 hover:shadow-md">
              <a href="https://github.com/rafidrahman1" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild className="w-full sm:w-auto hover:scale-105 transition-all duration-300 hover:shadow-md">
              <a href="https://linkedin.com/in/rafidrahman1" target="_blank" rel="noopener noreferrer">
                <Linkedin className="mr-2 h-4 w-4" />
                LinkedIn
              </a>
            </Button>
          </div>

          <button
            onClick={scrollToAbout}
            className="animate-bounce hover:text-primary transition-colors duration-200 hover:scale-110 transform animate-fade-in-up animation-delay-1000 mt-2"
            aria-label="Scroll to about section"
          >
            <ArrowDown size={28} className="sm:w-8 sm:h-8" />
          </button>
        </div>
      </div>
    </section>
  );
};
