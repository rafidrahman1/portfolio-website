
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Phone, Mail, MapPin } from "lucide-react";

export const About = () => {
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">About Me</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Dedicated to crafting exceptional digital experiences through innovative technology solutions
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-4">Professional Summary</h3>
            <p className="text-muted-foreground leading-relaxed">
              Full-Stack Developer with 1+ years of experience in building scalable and responsive web 
              applications using React, Next.js, and Node.js. Skilled in crafting clean user interfaces, 
              integrating RESTful APIs, and implementing AI-powered features.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              I hold a Bachelor's in Computer Science with strong problem-solving abilities and a passion 
              for developing impactful, user-centric software that makes a difference in people's lives.
            </p>

            <div className="flex flex-wrap gap-2 mt-6">
              <Badge variant="secondary" className="px-3 py-1">Problem Solving</Badge>
              <Badge variant="secondary" className="px-3 py-1">API Integration</Badge>
              <Badge variant="secondary" className="px-3 py-1">AI Implementation</Badge>
              <Badge variant="secondary" className="px-3 py-1">Responsive Design</Badge>
              <Badge variant="secondary" className="px-3 py-1">Team Collaboration</Badge>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <GraduationCap className="h-6 w-6 text-primary mr-3" />
                <h4 className="text-xl font-semibold">Education</h4>
              </div>
              <div>
                <h5 className="font-medium">Bachelor of Science in Computer Science</h5>
                <p className="text-muted-foreground">BRAC University • 2018-2023</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Relevant Coursework: Data Structures & Algorithms, Database Systems, 
                  Web Development, Software Engineering
                </p>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
              <h4 className="text-xl font-semibold mb-4">Contact Information</h4>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 text-primary mr-3" />
                  <span className="text-muted-foreground">+88 01303310566</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 text-primary mr-3" />
                  <span className="text-muted-foreground">rafid0001@gmail.com</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-primary mr-3" />
                  <span className="text-muted-foreground">Dhaka, Bangladesh</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
