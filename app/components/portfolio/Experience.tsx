
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Calendar } from "lucide-react";

export const Experience = () => {
  const experiences = [
    {
      title: "Fullstack Developer",
      company: "Vista Systech",
      period: "August 2024 – Present",
      description: "A software development company specializing in web and mobile solutions",
      achievements: [
        "Developed and maintained 4+ production-ready applications across diverse industries",
        "Built dynamic frontend interfaces with React.js that enhanced user experience and responsiveness",
        "Integrated third-party APIs and services to extend application functionality",
        "Implemented AI agent functionality using OpenAI API for automating content generation",
        "Contributed to backend services using Node.js and Express, creating RESTful endpoints"
      ],
      technologies: ["React.js", "Node.js", "Express.js", "OpenAI API", "RESTful APIs"]
    },
    {
      title: "Developer",
      company: "ANA-Soft",
      period: "May 2024 - August 2024",
      description: "Web development and software solutions",
      achievements: [
        "Developed and maintained dynamic websites using ASP.NET",
        "Contributed to the UGC Equivalence portal, implementing responsive UI components and backend functionality",
        "Collaborated with senior developers to optimize database queries",
        "Participated in code reviews and implemented best practices, improving overall code quality"
      ],
      technologies: ["ASP.NET", "Database Optimization", "Responsive Design", "Code Reviews"]
    }
  ];

  return (
    <section id="experience" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Professional Experience</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Building impactful solutions and growing expertise across diverse technology stacks
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <Card key={index} className="p-8 hover:shadow-lg transition-all duration-300 hover:border-primary/20">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                <div className="flex items-start mb-4 md:mb-0">
                  <div className="bg-primary/10 rounded-lg p-3 mr-4">
                    <Briefcase className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">{exp.title}</h3>
                    <h4 className="text-xl text-primary font-semibold">{exp.company}</h4>
                    <p className="text-muted-foreground mt-1">{exp.description}</p>
                  </div>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="font-medium">{exp.period}</span>
                </div>
              </div>

              <div className="mb-6">
                <h5 className="font-semibold mb-3 text-foreground">Key Achievements:</h5>
                <ul className="space-y-2">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-primary mr-2 mt-1.5">•</span>
                      <span className="text-muted-foreground leading-relaxed">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="font-semibold mb-3 text-foreground">Technologies Used:</h5>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, i) => (
                    <Badge key={i} variant="outline" className="px-3 py-1">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
