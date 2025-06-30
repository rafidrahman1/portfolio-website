import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Bot, Share2,MessageSquare} from "lucide-react";
import { motion } from "framer-motion";

export const Projects = () => {
  const projects = [
    {
      title: "AI Agent",
      description: "Intelligent AI solution for automated product analysis and content generation",
      icon: <Bot className="h-6 w-6" />,
      features: [
        "Product image analysis from URLs using OpenAI API",
        "Automated product name extraction",
        "Concise description generation",
        "Operational efficiency optimization"
      ],
      technologies: ["OpenAI API", "Image Processing", "AI/ML", "Automation"],
      category: "AI/ML",
      codeUrl: "https://github.com/rafidrahman1/ai_agent",
      demoUrl: "#"
    },
    {
      title: "Meta Post",
      description: "Cross-platform social media management tool with Meta Graph API integration",
      icon: <Share2 className="h-6 w-6" />,
      features: [
        "Meta Graph API integration",
        "Content scheduling and publishing",
        "Intuitive UI for social media management",
        "Cross-platform compatibility"
      ],
      technologies: ["React", "Meta Graph API", "Social Media APIs"],
      category: "Social Media",
      codeUrl: "https://github.com/rafidrahman1/meta_post.git",
      demoUrl: "#"

    },
    {
      title: "WhatsApp Bulk Messenger",
      description: "Comprehensive messaging solution for businesses with analytics and tracking",
      icon: <MessageSquare className="h-6 w-6" />,
      features: [
        "Bulk messaging capabilities",
        "Secure authentication system",
        "Message history tracking",
        "Analytics dashboard with insights"
      ],
      technologies: ["React", "Node.js", "WhatsApp API", "Analytics"],
      category: "Business Tools",
      codeUrl: "https://github.com/rafidrahman1/whatsapp.git",
      demoUrl: "#"


    },

  ];

  return (
      <motion.section
        id="projects"
        className="py-16 sm:py-20 bg-muted/30"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Key Projects</h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4 sm:px-0">
              Showcasing innovative solutions across e-commerce, AI, social media, and web development
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {projects.map((project, index) => (
                <Card key={index} className="flex flex-col p-4 sm:p-6 hover:shadow-xl transition-all duration-300 hover:border-primary/20 group">
                  <div className="flex items-start sm:items-center mb-4">
                    <div className="bg-primary/10 rounded-lg p-2 sm:p-3 mr-3 sm:mr-4 group-hover:bg-primary/20 transition-colors duration-300 flex-shrink-0">
                      {project.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1 sm:mb-0">{project.title}</h3>
                      <Badge variant="outline" className="mt-1 text-xs sm:text-sm">
                        {project.category}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="mb-4 sm:mb-6">
                    <h4 className="font-semibold mb-2 text-foreground text-sm sm:text-base">Key Features:</h4>
                    <ul className="space-y-1">
                      {project.features.map((feature, i) => (
                          <li key={i} className="flex items-start text-xs sm:text-sm">
                            <span className="text-primary mr-2 mt-1 flex-shrink-0">•</span>
                            <span className="text-muted-foreground">{feature}</span>
                          </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-4 sm:mb-6">
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech, i) => (
                          <Badge key={i} variant="secondary" className="text-xs px-2 py-1">
                            {tech}
                          </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 mt-auto">
                    {project.codeUrl && (
                        <Button asChild variant="outline" size="sm" className="flex-1">
                          <a href={project.codeUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="mr-2 h-4 w-4" />
                            Code
                          </a>
                        </Button>
                    )}
                    {project.demoUrl && (
                        <Button asChild variant="outline" size="sm" className="flex-1">
                          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Demo
                          </a>
                        </Button>
                    )}
                  </div>
                </Card>
            ))}
          </div>
        </div>
      </motion.section>
  );
};