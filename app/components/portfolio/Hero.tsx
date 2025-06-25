
import { ArrowDown, Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { GitHubCalendar } from "@/components/github-calendar/GitHubCalendar";

export const Hero = () => {
  const scrollToAbout = () => {
    const aboutSection = document.querySelector("#about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden py-20">
        {/* Enhanced background with animated gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent animate-pulse"></div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-float-delayed"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="space-y-12">
            <div className="animate-fade-in-up">
              {/* Profile Picture */}
              <div className="flex justify-center mb-8 animate-fade-in-up">
                <Avatar className="w-32 h-32 md:w-40 md:h-40 ring-4 ring-primary/20 shadow-2xl hover:scale-105 transition-all duration-500 hover:ring-primary/40">
                  <AvatarImage
                      src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400&h=400&fit=crop&crop=face"
                      alt="Rafid Rahman"
                      className="object-cover"
                  />
                  <AvatarFallback className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
                    RR
                  </AvatarFallback>
                </Avatar>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent animate-gradient-x">
                Rafid Rahman
              </h1>
              <h2 className="text-xl md:text-3xl text-muted-foreground mb-8 font-light animate-fade-in-up animation-delay-200">
                Full-Stack Developer
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-400">
                Passionate about building scalable web applications with React, Next.js, and Node.js.
                Specializing in AI integration and creating user-centric digital experiences.
              </p>
            </div>

            <div className="animate-fade-in-up animation-delay-600">
              <GitHubCalendar username="rafidrahman1" />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in-up animation-delay-800">

              <div className="flex items-center gap-4">
                <Button variant="outline" size="lg" asChild className="hover:scale-105 transition-all duration-300 hover:shadow-md">
                  <a href="https://github.com/rafidrahman1" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </a>
                </Button>

                <Button variant="outline" size="lg" asChild className="hover:scale-105 transition-all duration-300 hover:shadow-md">
                  <a href="https://linkedin.com/in/rafidrahman1" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="mr-2 h-4 w-4" />
                    LinkedIn
                  </a>
                </Button>

              </div>
            </div>

            <button
                onClick={scrollToAbout}
                className="animate-bounce hover:text-primary transition-colors duration-200 hover:scale-110 transform animate-fade-in-up animation-delay-1000"
                aria-label="Scroll to about section"
            >
              <ArrowDown size={32} />
            </button>
          </div>
        </div>
      </section>
  );
};
