import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Server, Database, Wrench } from "lucide-react";

export const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend",
      icon: <Code className="h-5 w-5 sm:h-6 sm:w-6" />,
      skills: ["React.js", "Next.js", "HTML5", "CSS3", "JavaScript (ES6+)", "Responsive Design"],
      color: "bg-blue-500/10 text-blue-600 border-blue-200"
    },
    {
      title: "Backend",
      icon: <Server className="h-5 w-5 sm:h-6 sm:w-6" />,
      skills: ["Node.js", "Express.js", "Spring Boot", "ASP.NET", "RESTful APIs"],
      color: "bg-green-500/10 text-green-600 border-green-200"
    },
    {
      title: "Databases",
      icon: <Database className="h-5 w-5 sm:h-6 sm:w-6" />,
      skills: ["MongoDB", "MySQL", "Firebase"],
      color: "bg-purple-500/10 text-purple-600 border-purple-200"
    },
    {
      title: "Tools & Others",
      icon: <Wrench className="h-5 w-5 sm:h-6 sm:w-6" />,
      skills: ["Git", "WebStorm", "Vercel", "CI/CD", "API Integration", "AI-Agent", "Meta Graph API"],
      color: "bg-orange-500/10 text-orange-600 border-orange-200"
    }
  ];

  return (
    <section id="skills" className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Technical Skills</h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4 sm:px-0">
            Comprehensive expertise across modern web development technologies and tools
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {skillCategories.map((category, index) => (
            <Card key={index} className="p-4 sm:p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/20">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className={`rounded-lg p-2 sm:p-3 mr-3 flex-shrink-0 ${category.color}`}>
                  {category.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-foreground">{category.title}</h3>
              </div>

              <div className="space-y-2">
                {category.skills.map((skill, i) => (
                  <Badge 
                    key={i} 
                    variant="outline" 
                    className="w-full justify-center py-1.5 sm:py-2 text-xs sm:text-sm hover:bg-primary/5 transition-colors duration-200"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 sm:mt-16 text-center">
          <Card className="p-6 sm:p-8 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Specialized Expertise</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 text-left">
              <div>
                <h4 className="font-semibold text-primary mb-2 text-sm sm:text-base">AI Integration</h4>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  OpenAI API integration, automated content generation, and intelligent data processing
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-primary mb-2 text-sm sm:text-base">API Development</h4>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  RESTful services, third-party integrations, and scalable backend architectures
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-primary mb-2 text-sm sm:text-base">Performance Optimization</h4>
                <p className="text-muted-foreground text-xs sm:text-sm">
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
