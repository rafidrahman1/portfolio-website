import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { portfolio } from "@/lib/portfolio";
import { getSkillIcon } from "@/lib/cms-icons";

export const SkillsServer = () => {
  const { title, subtitle, expertiseTitle, expertise } = portfolio.sections.skills;
  const skillCategories = portfolio.skillCategories;

  return (
    <section id="skills" className="py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">{title}</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {skillCategories.map((category) => (
            <Card
              key={category.title}
              className="p-3 hover:shadow-md transition-all duration-300 hover:border-primary/20"
            >
              <div className="flex items-center mb-2">
                <div className={`rounded-md p-1.5 mr-2 ${category.color}`}>{getSkillIcon(category.icon)}</div>
                <h3 className="text-sm font-semibold text-foreground">{category.title}</h3>
              </div>

              <div className="flex flex-wrap gap-1">
                {category.skills.map((skill) => (
                  <Badge
                    key={skill}
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
          <h3 className="text-lg font-bold mb-2 text-center">{expertiseTitle}</h3>
          <div className="grid md:grid-cols-3 gap-3 text-left">
            {expertise.map((item) => (
              <div key={item.title}>
                <h4 className="font-semibold text-primary mb-1 text-sm">{item.title}</h4>
                <p className="text-muted-foreground text-xs">{item.description}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
};
