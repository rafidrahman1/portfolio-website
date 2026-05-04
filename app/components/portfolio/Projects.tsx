import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";
import { portfolio } from "@/lib/portfolio";
import { getProjectIcon } from "@/lib/cms-icons";

export const Projects = () => {
  const { title, subtitle } = portfolio.sections.projectsList;
  const projects = portfolio.keyProjects;

  return (
    <motion.section
      id="projects"
      className="py-16 sm:py-20"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">{title}</h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4 sm:px-0">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project) => (
            <Card
              key={project.title}
              className="flex flex-col p-4 sm:p-6 hover:shadow-xl transition-all duration-300 hover:border-primary/20 group"
            >
              <div className="flex items-start sm:items-center mb-4">
                <div className="bg-primary/10 rounded-lg p-2 sm:p-3 mr-3 sm:mr-4 group-hover:bg-primary/20 transition-colors duration-300 flex-shrink-0">
                  {getProjectIcon(project.icon)}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1 sm:mb-0">{project.title}</h3>
                  <Badge variant="outline" className="mt-1 text-xs sm:text-sm">
                    {project.category}
                  </Badge>
                </div>
              </div>

              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">{project.description}</p>

              <div className="mb-4 sm:mb-6">
                <h4 className="font-semibold mb-2 text-foreground text-sm sm:text-base">Key Features:</h4>
                <ul className="space-y-1">
                  {project.features.map((feature) => (
                    <li key={feature} className="flex items-start text-xs sm:text-sm">
                      <span className="text-primary mr-2 mt-1 flex-shrink-0">•</span>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-4 sm:mb-6">
                <div className="flex flex-wrap gap-1">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs px-2 py-1">
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
