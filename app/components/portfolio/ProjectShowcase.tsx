
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ExternalLink, Github } from "lucide-react";

type DeviceType = 'laptop' | 'mobile';

interface ShowcaseProject {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  demoUrl: string;
  githubUrl: string;
  deviceType: DeviceType;
  featured?: boolean;
}

export const ProjectShowcase = () => {
  const showcaseProjects: ShowcaseProject[] = [
    {
      title: "Purrfect",
      description: "Pet Adoption Website! This project is a showcase of modern web development technologies including Next.js 13, Prisma, Next-Auth, Tailwind and many more.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
      technologies: ["Next.js", "Prisma", "Next-Auth", "Leaflet", "Zustand", "Tailwind"],
      category: "Pet Adoption",
      demoUrl: "#",
      githubUrl: "#",
      deviceType: "laptop" as const,
      featured: true
    },
    {
      title: "Book Valley",
      description: "A book resale website where buyer and seller can buy and sell books. This project has features like Buy and sell, add to wishlist, manage books, payment with stripe.",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop",
      technologies: ["React Router", "React Query", "Firebase", "Stripe", "Mantine", "React"],
      category: "E-commerce",
      demoUrl: "#",
      githubUrl: "#",
      deviceType: "laptop" as const,
      featured: true
    },
    {
      title: "Evocart (Beta)",
      description: "Advanced e-commerce platform with AI-powered product generation and subdomain-specific layouts",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop",
      technologies: ["Next.js", "React", "OpenAI API", "RESTful APIs"],
      category: "E-commerce",
      demoUrl: "#",
      githubUrl: "#",
      deviceType: "mobile" as const
    },
    {
      title: "AI Agent",
      description: "Intelligent AI solution for automated product analysis and content generation",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=600&fit=crop",
      technologies: ["OpenAI API", "Image Processing", "AI/ML", "Automation"],
      category: "AI/ML",
      demoUrl: "#",
      githubUrl: "#",
      deviceType: "mobile" as const
    }
  ];

  const LaptopFrame = ({ children }: { children: React.ReactNode }) => (
    <div className="relative mx-auto max-w-4xl">
      {/* Laptop base */}
      <div className="relative bg-gray-900 rounded-t-2xl p-4 shadow-2xl">
        {/* Screen bezel */}
        <div className="bg-black rounded-t-xl p-6">
          {/* Screen content */}
          <div className="bg-white rounded-lg overflow-hidden shadow-inner">
            {children}
          </div>
        </div>
        {/* Laptop base */}
        <div className="h-6 bg-gray-800 rounded-b-2xl shadow-lg relative">
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gray-600 rounded-full"></div>
        </div>
      </div>
      {/* Laptop shadow */}
      <div className="absolute -bottom-4 left-4 right-4 h-4 bg-black/20 rounded-full blur-lg"></div>
    </div>
  );

  const MobileFrame = ({ children }: { children: React.ReactNode }) => (
    <div className="relative mx-auto w-72">
      {/* Mobile Frame */}
      <div className="relative bg-gray-900 rounded-3xl p-3 shadow-2xl">
        {/* Screen */}
        <div className="bg-black rounded-2xl p-2">
          <div className="bg-white rounded-xl overflow-hidden">
            {children}
          </div>
        </div>
        {/* Home indicator */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gray-600 rounded-full"></div>
      </div>
      {/* Mobile shadow */}
      <div className="absolute -bottom-4 left-4 right-4 h-4 bg-black/20 rounded-full blur-lg"></div>
    </div>
  );

  return (
    <section id="showcase" className="py-20 bg-gradient-to-br from-background via-background to-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            03. Things I have Built
          </div>
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
                {project.featured && (
                  <div className="text-primary font-medium text-lg">
                    FEATURED PROJECT #{index + 1}
                  </div>
                )}
                
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
                    <a href={project.githubUrl} className="flex items-center gap-2">
                      <Github className="h-4 w-4" />
                      <span>View Code</span>
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.demoUrl} className="flex items-center gap-2">
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