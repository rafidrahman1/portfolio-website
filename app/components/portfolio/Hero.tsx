
import { ArrowDown, Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  const scrollToAbout = () => {
    const aboutSection = document.querySelector("#about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Rafid Rahman
          </h1>
          <h2 className="text-xl md:text-3xl text-muted-foreground mb-8 font-light">
            Full-Stack Developer
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Passionate about building scalable web applications with React, Next.js, and Node.js. 
            Specializing in AI integration and creating user-centric digital experiences.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3">
              <Mail className="mr-2 h-4 w-4" />
              Get In Touch
            </Button>
            
            <div className="flex items-center gap-4">
              <Button variant="outline" size="lg" asChild>
                <a href="https://github.com/rafid0001" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </a>
              </Button>
              
              <Button variant="outline" size="lg" asChild>
                <a href="https://linkedin.com/in/rafid-rahman" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="mr-2 h-4 w-4" />
                  LinkedIn
                </a>
              </Button>
              
              <Button variant="outline" size="lg" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Portfolio
                </a>
              </Button>
            </div>
          </div>

          <button
            onClick={scrollToAbout}
            className="animate-bounce hover:text-primary transition-colors duration-200"
            aria-label="Scroll to about section"
          >
            <ArrowDown size={32} />
          </button>
        </div>
      </div>
    </section>
  );
};
