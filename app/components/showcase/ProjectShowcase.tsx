import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ExternalLink } from "lucide-react";
import { LaptopFrame } from "./LaptopFrame";
import { MobileFrame } from "./MobileFrame";
import { ShowcaseProject } from "./types";
import { motion } from "framer-motion";

export const ProjectShowcase = () => {
  const showcaseProjects: ShowcaseProject[] = [
    {
      title: "SewingTex React Conversion",
      description: "Modern React SPA conversion with improved performance and mobile experience",
      image: "screenshots/sewingtex.png",
      technologies: ["React", "SPA", "API Integration", "Performance Optimization"],
      category: "E-commerce",
      demoUrl: "https://sewingtexapparels.com/",
      deviceType: "laptop",
      featured: true
    },
    {
      title: "BetterThat Ecosystem",
      description: "Multiple React applications with reusable component libraries",
      image: "screenshots/betterthat.png",
      technologies: ["React", "Component Libraries", "State Management"],
      category: "Multi-Project E-commerce",
      demoUrl: "https://betterthat.com/",
      deviceType: "laptop"
    },
    {
      title: "Evocart",
      description: "Advanced e-commerce platform with AI-powered product generation and subdomain-specific layouts.",
      image: "screenshots/evocart.jpg",
      technologies: ["Next.js", "React", "OpenAI API", "RESTful APIs"],
      category: "E-commerce",
      demoUrl: "https://apple.nazarahnaturals.com/",
      deviceType: "mobile",
      featured: true
    },    
    {
      title: "Physics Department, BUET",
      description: "Enhanced departmental website with dynamic components and CMS",
      image: "screenshots/buetphy.png",
      technologies: ["React", "CMS", "Web Standards"],
      category: "Education",
      demoUrl: "https://phy.buet.ac.bd/",
      deviceType: "laptop"
    }
  ];

  return (
      <motion.section
        id="showcase"
        className="py-20 bg-gradient-to-br from-background via-background to-muted/30"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Projects</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A showcase of modern web development projects built with cutting-edge technologies
            </p>
          </div>
          <div className="space-y-32">
            {showcaseProjects.map((project, index) => (
                <div
                    key={index}
                    className={`flex flex-col ${
                        index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                    } items-center gap-16 lg:gap-24`}
                >
                  {/* Project mockup */}
                  <div className="flex-1 relative">
                    {project.deviceType === 'laptop' ? (
                        <LaptopFrame>
                          <AspectRatio ratio={16 / 10}>
                            <img
                                src={project.image}
                                alt={project.title}
                                className="object-cover w-full h-full"
                            />
                          </AspectRatio>
                        </LaptopFrame>
                    ) : (
                        <MobileFrame>
                          <AspectRatio ratio={9 / 16}>
                            <img
                                src={project.image}
                                alt={project.title}
                                className="object-cover w-full h-full"
                            />
                          </AspectRatio>
                        </MobileFrame>
                    )}
                  </div>
                  {/* Project details */}
                  <div className="flex-1 space-y-6">
                    <h3 className="text-3xl md:text-4xl font-bold text-foreground">
                      {project.title}
                    </h3>
                    <div className="bg-card/50 backdrop-blur-sm border rounded-lg p-6 shadow-lg">
                      <p className="text-muted-foreground leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => (
                          <span
                              key={i}
                              className="text-sm text-primary bg-primary/10 px-3 py-1 rounded-md font-medium"
                          >
                      {tech}
                    </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 pt-4">
                      <Button variant="outline" size="sm" asChild>
                        <a href={project.demoUrl} 
                        className="flex items-center gap-2"
                         target="_blank"
                         rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4" />
                          <span>Live Demo</span>
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </motion.section>
  );
};
