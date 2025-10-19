import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ExternalLink } from "lucide-react";
import { LaptopFrame } from "./LaptopFrame";
import { MobileFrame } from "./MobileFrame";
import { getStaticProjects } from "@/lib/github-data";
import Image from "next/image";

export const ProjectShowcaseStatic = () => {
  const showcaseProjects = getStaticProjects();

  return (
      <section
        id="showcase"
        className="py-12 sm:py-16 lg:py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Featured Projects</h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              A showcase of modern web development projects built with cutting-edge technologies
            </p>
          </div>
          <div className="space-y-16 sm:space-y-24 lg:space-y-32">
            {showcaseProjects.map((project, index) => (
                <div
                    key={index}
                    className={`flex flex-col ${
                        index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                    } items-center gap-8 sm:gap-12 lg:gap-24`}
                >
                  {/* Project mockup */}
                  <div className="flex-1 relative w-full max-w-lg lg:max-w-none">
                    {project.deviceType === 'laptop' ? (
                        <LaptopFrame>
                          <AspectRatio ratio={16 / 10}>
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                priority={project.featured}
                            />
                          </AspectRatio>
                        </LaptopFrame>
                    ) : (
                        <MobileFrame>
                          <AspectRatio ratio={9 / 16}>
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                priority={project.featured}
                            />
                          </AspectRatio>
                        </MobileFrame>
                    )}
                  </div>
                  {/* Project details */}
                  <div className="flex-1 space-y-4 sm:space-y-6 w-full">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                      {project.title}
                    </h3>
                    <div className="bg-card/50 backdrop-blur-sm border rounded-lg p-4 sm:p-6 shadow-lg">
                      <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                        {project.description}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => (
                          <span
                              key={i}
                              className="text-xs sm:text-sm text-primary bg-primary/10 px-2 sm:px-3 py-1 rounded-md font-medium"
                          >
                      {tech}
                    </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 pt-2 sm:pt-4">
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
      </section>
  );
};
