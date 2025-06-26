import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Server, Database, Wrench } from "lucide-react";

export const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend",
      icon: <Code className="h-4 w-4" />,
      skills: ["React.js", "Next.js", "HTML5", "CSS3", "JavaScript (ES6+)", "Responsive Design"],
      color: "bg-blue-500/10 text-blue-600 border-blue-200"
    },
    {
      title: "Backend",
      icon: <Server className="h-4 w-4" />,
      skills: ["Node.js", "Express.js", "Spring Boot", "ASP.NET", "RESTful APIs"],
      color: "bg-green-500/10 text-green-600 border-green-200"
    },
    {
      title: "Databases",
      icon: <Database className="h-4 w-4" />,
      skills: ["MongoDB", "MySQL", "Firebase"],
      color: "bg-purple-500/10 text-purple-600 border-purple-200"
    },
    {
      title: "Tools & Others",
      icon: <Wrench className="h-4 w-4" />,
      skills: ["Git", "WebStorm", "Vercel", "CI/CD", "API Integration", "AI-Agent", "Meta Graph API"],
      color: "bg-orange-500/10 text-orange-600 border-orange-200"
    }
  ];

  return (
    <section id="skills" className="py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Technical Skills</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Comprehensive expertise across modern web development technologies
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {skillCategories.map((category, index) => (
            <Card key={index} className="p-3 hover:shadow-md transition-all duration-300 hover:border-primary/20">
              <div className="flex items-center mb-2">
                <div className={`rounded-md p-1.5 mr-2 ${category.color}`}> 
                  {category.icon}
                </div>
                <h3 className="text-sm font-semibold text-foreground">{category.title}</h3>
              </div>

              <div className="flex flex-wrap gap-1">
                {category.skills.map((skill, i) => (
                  <Badge 
                    key={i} 
                    variant="outline" 
                    className="text-xs px-2 py-0.5 hover:bg-primary/5 transition-colors duration-200"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-4 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
          <h3 className="text-lg font-bold mb-2 text-center">Specialized Expertise</h3>
          <div className="grid md:grid-cols-3 gap-3 text-left">
            <div>
              <h4 className="font-semibold text-primary mb-1 text-sm">AI Integration</h4>
              <p className="text-muted-foreground text-xs">
                OpenAI API, automated content generation, intelligent data processing
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-1 text-sm">API Development</h4>
              <p className="text-muted-foreground text-xs">
                RESTful services, third-party integrations, scalable architectures
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-1 text-sm">Performance Optimization</h4>
              <p className="text-muted-foreground text-xs">
                Code quality, database optimization, responsive design
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
