import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Phone, Mail, MapPin } from "lucide-react";
import { portfolio } from "@/lib/portfolio";

export const AboutServer = () => {
  const about = portfolio.sections.about;
  const { education, aboutContactCard } = about;

  return (
    <section id="about" className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">{about.title}</h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4 sm:px-0">{about.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className="space-y-6">
            <h3 className="text-xl sm:text-2xl font-semibold mb-4">{about.summaryHeading}</h3>
            {about.summaryParagraphs.map((paragraph, index) => (
              <p key={index} className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {paragraph}
              </p>
            ))}

            <div className="flex flex-wrap gap-2 mt-6">
              {about.highlightBadges.map((badge) => (
                <Badge key={badge} variant="secondary" className="px-2 sm:px-3 py-1 text-xs sm:text-sm">
                  {badge}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <Card className="p-4 sm:p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 text-primary mr-3" />
                <h4 className="text-lg sm:text-xl font-semibold">{education.heading}</h4>
              </div>
              <div>
                <h5 className="font-medium text-sm sm:text-base">{education.degree}</h5>
                <p className="text-muted-foreground text-sm sm:text-base">{education.schoolLine}</p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-2">{education.coursework}</p>
              </div>
            </Card>

            <Card className="p-4 sm:p-6 hover:shadow-lg transition-shadow duration-300">
              <h4 className="text-lg sm:text-xl font-semibold mb-4">{aboutContactCard.heading}</h4>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 text-primary mr-3 flex-shrink-0" />
                  <span className="text-muted-foreground text-sm sm:text-base">{aboutContactCard.phone}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 text-primary mr-3 flex-shrink-0" />
                  <span className="text-muted-foreground text-sm sm:text-base break-all">{aboutContactCard.email}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-primary mr-3 flex-shrink-0" />
                  <span className="text-muted-foreground text-sm sm:text-base">{aboutContactCard.location}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
