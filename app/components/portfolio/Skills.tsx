
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Server, Database, Wrench } from "lucide-react";

export const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend",
      icon: <Code className="h-6 w-6" />,
      skills: ["React.js", "Next.js", "HTML5", "CSS3", "JavaScript (ES6+)", "Responsive Design"],
      color: "bg-blue-500/10 text-blue-600 border-blue-200"
    },
    {
      title: "Backend",
      icon: <Server className="h-6 w-6" />,
      skills: ["Node.js", "Express.js", "Spring Boot", "ASP.NET", "RESTful APIs"],
      color: "bg-green-500/10 text-green-600 border-green-200"
    },
    {
      title: "Databases",
      icon: <Database className="h-6 w-6" />,
      skills: ["MongoDB", "MySQL", "Firebase"],
      color: "bg-purple-500/10 text-purple-600 border-purple-200"
    },
    {
      title: "Tools & Others",
      icon: <Wrench className="h-6 w-6" />,
      skills: ["Git", "WebStorm", "Vercel", "CI/CD", "API Integration", "AI-Agent", "Meta Graph API"],
      color: "bg-orange-500/10 text-orange-600 border-orange-200"
    }
  ];

  return (
    <section id="skills" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Technical Skills</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive expertise across modern web development technologies and tools
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/20">
              <div className="flex items-center mb-6">
                <div className={`rounded-lg p-3 mr-3 ${category.color}`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground">{category.title}</h3>
              </div>

              <div className="space-y-2">
                {category.skills.map((skill, i) => (
                  <Badge 
                    key={i} 
                    variant="outline" 
                    className="w-full justify-center py-2 hover:bg-primary/5 transition-colors duration-200"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Card className="p-8 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
            <h3 className="text-2xl font-bold mb-4">Specialized Expertise</h3>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div>
                <h4 className="font-semibold text-primary mb-2">AI Integration</h4>
                <p className="text-muted-foreground text-sm">
                  OpenAI API integration, automated content generation, and intelligent data processing
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-primary mb-2">API Development</h4>
                <p className="text-muted-foreground text-sm">
                  RESTful services, third-party integrations, and scalable backend architectures
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-primary mb-2">Performance Optimization</h4>
                <p className="text-muted-foreground text-sm">
                  Code quality improvements, database optimization, and responsive design implementation
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
