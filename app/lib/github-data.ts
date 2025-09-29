// Static data fetching for GitHub contributions
export interface GitHubContribution {
  level: number;
  count: number;
  date: string;
}

export async function getGitHubContributions(username: string): Promise<GitHubContribution[]> {
  try {
    const response = await fetch(`https://github-contributions-api.vercel.app/api/v1/${username}`, {
      next: { revalidate: 3600 } // Revalidate every hour (ISR)
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch GitHub contributions');
    }
    
    const data = await response.json();
    return data.contributions || [];
  } catch (error) {
    console.error('Error fetching GitHub contributions:', error);
    // Return empty array as fallback
    return [];
  }
}

// Static project data
export interface ProjectData {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  demoUrl: string;
  deviceType: 'laptop' | 'mobile';
  featured: boolean;
}

export const getStaticProjects = (): ProjectData[] => [
  {
    title: "SewingTex React Conversion",
    description: "Modern React SPA conversion with improved performance and mobile experience",
    image: "/screenshots/sewingtex.png",
    technologies: ["React", "SPA", "API Integration", "Performance Optimization"],
    category: "E-commerce",
    demoUrl: "https://sewingtexapparels.com/",
    deviceType: "laptop",
    featured: true
  },
  {
    title: "BetterThat Ecosystem",
    description: "Multiple React applications with reusable component libraries",
    image: "/screenshots/betterthat.png",
    technologies: ["React", "Component Libraries", "State Management"],
    category: "Multi-Project E-commerce",
    demoUrl: "https://betterthat.com/",
    deviceType: "laptop",
    featured: false

  },
  {
    title: "Evocart",
    description: "Advanced e-commerce platform with AI-powered product generation and subdomain-specific layouts.",
    image: "/screenshots/evocart.jpg",
    technologies: ["Next.js", "React", "OpenAI API", "RESTful APIs"],
    category: "E-commerce",
    demoUrl: "https://apple.nazarahnaturals.com/",
    deviceType: "mobile",
    featured: true
  },    
  {
    title: "Physics Department, BUET",
    description: "Enhanced departmental website with dynamic components and CMS",
    image: "/screenshots/buetphy.png",
    technologies: ["React", "CMS", "Web Standards"],
    category: "Education",
    demoUrl: "https://phy.buet.ac.bd/",
    deviceType: "laptop",
    featured: false

  }
];

// Static skills data
export interface SkillCategory {
  title: string;
  icon: string;
  skills: string[];
  color: string;
}

export const getStaticSkills = (): SkillCategory[] => [
  {
    title: "Frontend",
    icon: "Code",
    skills: ["React.js", "Next.js", "HTML5", "CSS3", "JavaScript (ES6+)", "Responsive Design"],
    color: "bg-blue-500/10 text-blue-600 border-blue-200"
  },
  {
    title: "Backend",
    icon: "Server",
    skills: ["Node.js", "Express.js", "Spring Boot", "ASP.NET", "RESTful APIs"],
    color: "bg-green-500/10 text-green-600 border-green-200"
  },
  {
    title: "Databases",
    icon: "Database",
    skills: ["MongoDB", "MySQL", "Firebase"],
    color: "bg-purple-500/10 text-purple-600 border-purple-200"
  },
  {
    title: "Tools & Others",
    icon: "Wrench",
    skills: ["Git", "WebStorm", "Vercel", "CI/CD", "API Integration", "AI-Agent", "Meta Graph API"],
    color: "bg-orange-500/10 text-orange-600 border-orange-200"
  }
];
