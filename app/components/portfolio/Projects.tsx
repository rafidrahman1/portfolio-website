import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Zap, Bot, Share2, Smartphone, ShoppingCart, MessageSquare, Building, Atom } from "lucide-react";

export const Projects = () => {
  const projects = [
    {
      title: "Evocart (Beta)",
      description: "Advanced e-commerce platform with AI-powered product generation and subdomain-specific layouts",
      icon: <ShoppingCart className="h-6 w-6" />,
      features: [
        "Subdomain-specific layout logic with Next.js",
        "Responsive UI with React components",
        "AI agent functionality with OpenAI API integration",
        "RESTful API endpoints for seamless data flow"
      ],
      technologies: ["Next.js", "React", "OpenAI API", "RESTful APIs"],
      category: "E-commerce",
      // codeUrl: "#",
      demoUrl: "https://apple.nazarahnaturals.com/"
    },
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
      // demoUrl: "#"
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
      // demoUrl: "#"
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
      // demoUrl: "#"
    },
    {
      title: "SewingTex React Conversion",
      description: "Modern React SPA conversion with improved performance and mobile experience",
      icon: <Zap className="h-6 w-6" />,
      features: [
        "Static HTML to React SPA conversion",
        "Improved page load speed",
        "API integrations for dynamic content",
        "Enhanced mobile user experience"
      ],
      technologies: ["React", "SPA", "API Integration", "Performance Optimization"],
      category: "Web Development",
      // codeUrl: "#",
      demoUrl: "https://sewingtexapparels.com/"
    },
    {
      title: "BetterThat Ecosystem",
      description: "Multiple React applications with reusable component libraries",
      icon: <Building className="h-6 w-6" />,
      features: [
        "Food for Change platform",
        "Fishing in Godzone application",
        "Ditybit Auctions system",
        "Auckland Rescue website"
      ],
      technologies: ["React", "Component Libraries", "State Management"],
      category: "Multi-Project",
      // codeUrl: "#",
      demoUrl: "https://betterthat.com/"
    },
    {
      title: "Physics Department, BUET",
      description: "Enhanced departmental website with dynamic components and CMS",
      icon: <Atom className="h-6 w-6" />,
      features: [
        "Static to dynamic React components conversion",
        "Content management system implementation",
        "Improved update efficiency",
        "Modern web standards compliance"
      ],
      technologies: ["React", "CMS", "Web Standards"],
      category: "Education",
      // codeUrl: "#",
      demoUrl: "https://phy.buet.ac.bd/"
    }
  ];

  return (
      <section id="projects" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Key Projects</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Showcasing innovative solutions across e-commerce, AI, social media, and web development
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
                <Card key={index} className="flex flex-col p-6 hover:shadow-xl transition-all duration-300 hover:border-primary/20 group">
                  <div className="flex items-center mb-4">
                    <div className="bg-primary/10 rounded-lg p-3 mr-4 group-hover:bg-primary/20 transition-colors duration-300">
                      {project.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{project.title}</h3>
                      <Badge variant="outline" className="mt-1">
                        {project.category}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="font-semibold mb-2 text-foreground">Key Features:</h4>
                    <ul className="space-y-1">
                      {project.features.map((feature, i) => (
                          <li key={i} className="flex items-start text-sm">
                            <span className="text-primary mr-2 mt-1">•</span>
                            <span className="text-muted-foreground">{feature}</span>
                          </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech, i) => (
                          <Badge key={i} variant="secondary" className="text-xs px-2 py-1">
                            {tech}
                          </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 mt-auto">
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
      </section>
  );
};