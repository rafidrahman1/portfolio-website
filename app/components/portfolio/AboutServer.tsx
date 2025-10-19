import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Phone, Mail, MapPin } from "lucide-react";

export const AboutServer = () => {
  return (
    <section
      id="about"
      className="py-16 sm:py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">About Me</h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4 sm:px-0">
            Dedicated to crafting exceptional digital experiences through innovative technology solutions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className="space-y-6">
            <h3 className="text-xl sm:text-2xl font-semibold mb-4">Professional Summary</h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Full-Stack Developer with 1+ years of experience in building scalable and responsive web 
              applications using React, Next.js, and Node.js. Skilled in crafting clean user interfaces, 
              integrating RESTful APIs, and implementing AI-powered features.
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              I hold a Bachelor's in Computer Science with strong problem-solving abilities and a passion 
              for developing impactful, user-centric software that makes a difference in people's lives.
            </p>

            <div className="flex flex-wrap gap-2 mt-6">
              <Badge variant="secondary" className="px-2 sm:px-3 py-1 text-xs sm:text-sm">Problem Solving</Badge>
              <Badge variant="secondary" className="px-2 sm:px-3 py-1 text-xs sm:text-sm">API Integration</Badge>
              <Badge variant="secondary" className="px-2 sm:px-3 py-1 text-xs sm:text-sm">AI Implementation</Badge>
              <Badge variant="secondary" className="px-2 sm:px-3 py-1 text-xs sm:text-sm">Responsive Design</Badge>
              <Badge variant="secondary" className="px-2 sm:px-3 py-1 text-xs sm:text-sm">Team Collaboration</Badge>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="p-4 sm:p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 text-primary mr-3" />
                <h4 className="text-lg sm:text-xl font-semibold">Education</h4>
              </div>
              <div>
                <h5 className="font-medium text-sm sm:text-base">Bachelor of Science in Computer Science</h5>
                <p className="text-muted-foreground text-sm sm:text-base">BRAC University • 2018-2023</p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                  Relevant Coursework: Data Structures & Algorithms, Database Systems, 
                  Web Development, Software Engineering
                </p>
              </div>
            </Card>

            <Card className="p-4 sm:p-6 hover:shadow-lg transition-shadow duration-300">
              <h4 className="text-lg sm:text-xl font-semibold mb-4">Contact Information</h4>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 text-primary mr-3 flex-shrink-0" />
                  <span className="text-muted-foreground text-sm sm:text-base">+88 01303310566</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 text-primary mr-3 flex-shrink-0" />
                  <span className="text-muted-foreground text-sm sm:text-base break-all">rafid0001@gmail.com</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-primary mr-3 flex-shrink-0" />
                  <span className="text-muted-foreground text-sm sm:text-base">Dhaka, Bangladesh</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
