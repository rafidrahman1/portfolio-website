export interface PortfolioSite {
  name: string;
  title: string;
  shortTitle: string;
  description: string;
  url: string;
  author: string;
  twitterHandle: string;
  keywords: string[];
  metadataBaseUrl: string;
  ogImagePath: string;
  googleSiteVerification: string;
  footerYear: number;
  footerNote: string;
}

export interface PortfolioGithub {
  username: string;
  calendarUsername: string;
}

export interface NavItemConfig {
  label: string;
  href: string;
}

export interface PortfolioHero {
  description: string;
  socialGithubUrl: string;
  socialLinkedinUrl: string;
}

export interface SectionCopy {
  title: string;
  subtitle: string;
}

export interface SkillsSectionCopy extends SectionCopy {
  expertiseTitle: string;
  expertise: { title: string; description: string }[];
}

export interface AboutSectionCopy extends SectionCopy {
  summaryHeading: string;
  summaryParagraphs: string[];
  highlightBadges: string[];
  education: {
    heading: string;
    degree: string;
    schoolLine: string;
    coursework: string;
  };
  aboutContactCard: {
    heading: string;
    phone: string;
    email: string;
    location: string;
  };
}

export interface ContactSectionCopy extends SectionCopy {
  connectHeading: string;
  connectBody: string;
  formTitle: string;
}

export interface PortfolioSections {
  showcase: SectionCopy;
  projectsList: SectionCopy;
  skills: SkillsSectionCopy;
  experience: SectionCopy;
  about: AboutSectionCopy;
  contact: ContactSectionCopy;
}

export interface ShowcaseProject {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  demoUrl: string;
  codeUrl: string;
  deviceType: "laptop" | "mobile";
  codeButton: boolean;
  demoButton: boolean;
  featured: boolean;
}

export interface KeyProject {
  title: string;
  description: string;
  icon: string;
  features: string[];
  technologies: string[];
  category: string;
  codeUrl?: string;
  demoUrl?: string;
}

export interface SkillCategoryConfig {
  title: string;
  icon: string;
  skills: string[];
  color: string;
}

export interface ExperienceEntry {
  title: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface ContactDetails {
  email: string;
  phone: string;
  location: string;
  socialGithubUrl: string;
  socialLinkedinUrl: string;
}

export interface PortfolioContent {
  site: PortfolioSite;
  github: PortfolioGithub;
  navigation: NavItemConfig[];
  hero: PortfolioHero;
  sections: PortfolioSections;
  showcaseProjects: ShowcaseProject[];
  keyProjects: KeyProject[];
  skillCategories: SkillCategoryConfig[];
  experience: ExperienceEntry[];
  contact: ContactDetails;
}
