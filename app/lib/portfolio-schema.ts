import { z } from "zod";
import type { PortfolioContent } from "./portfolio-types";

/**
 * Runtime schema for content/portfolio.json. It mirrors `portfolio-types.ts`
 * (the `satisfies` check at the bottom fails to compile if they drift), and it
 * catches bad CMS edits at build time instead of as a runtime crash.
 */
const sectionCopy = { title: z.string(), subtitle: z.string() };

const showcaseProject = z.object({
  title: z.string(),
  description: z.string(),
  image: z.string(),
  images: z.array(z.string()).optional(),
  technologies: z.array(z.string()),
  category: z.string(),
  demoUrl: z.string(),
  codeUrl: z.string(),
  deviceType: z.enum(["laptop", "mobile"]),
  codeButton: z.boolean(),
  demoButton: z.boolean(),
  featured: z.boolean(),
});

export const portfolioSchema = z.object({
  site: z.object({
    name: z.string(),
    title: z.string(),
    shortTitle: z.string(),
    description: z.string(),
    url: z.string(),
    author: z.string(),
    twitterHandle: z.string(),
    keywords: z.array(z.string()),
    metadataBaseUrl: z.string().url(),
    ogImagePath: z.string(),
    googleSiteVerification: z.string(),
    footerYear: z.number(),
    footerNote: z.string(),
  }),
  github: z.object({ username: z.string(), calendarUsername: z.string().min(1) }),
  navigation: z.array(z.object({ label: z.string(), href: z.string() })),
  hero: z.object({
    description: z.string(),
    socialGithubUrl: z.string(),
    socialLinkedinUrl: z.string(),
  }),
  sections: z.object({
    showcase: z.object(sectionCopy),
    projectsList: z.object(sectionCopy),
    skills: z.object({
      ...sectionCopy,
      expertiseTitle: z.string(),
      expertise: z.array(z.object({ title: z.string(), description: z.string() })),
    }),
    experience: z.object(sectionCopy),
    about: z.object({
      ...sectionCopy,
      summaryHeading: z.string(),
      summaryParagraphs: z.array(z.string()),
      highlightBadges: z.array(z.string()),
      education: z.object({
        heading: z.string(),
        degree: z.string(),
        schoolLine: z.string(),
        coursework: z.string(),
      }),
      aboutContactCard: z.object({
        heading: z.string(),
        phone: z.string(),
        email: z.string(),
        location: z.string(),
      }),
    }),
    contact: z.object({
      ...sectionCopy,
      connectHeading: z.string(),
      connectBody: z.string(),
      formTitle: z.string(),
    }),
  }),
  showcaseProjects: z.array(showcaseProject),
  keyProjects: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      icon: z.string(),
      features: z.array(z.string()),
      technologies: z.array(z.string()),
      category: z.string(),
      codeUrl: z.string().optional(),
      demoUrl: z.string().optional(),
    }),
  ),
  skillCategories: z.array(
    z.object({ title: z.string(), icon: z.string(), skills: z.array(z.string()), color: z.string() }),
  ),
  experience: z.array(
    z.object({
      title: z.string(),
      company: z.string(),
      period: z.string(),
      description: z.string(),
      achievements: z.array(z.string()),
      technologies: z.array(z.string()),
    }),
  ),
  contact: z.object({
    email: z.string(),
    phone: z.string(),
    location: z.string(),
    socialGithubUrl: z.string(),
    socialLinkedinUrl: z.string(),
  }),
}) satisfies z.ZodType<PortfolioContent>;

export function parsePortfolio(raw: unknown): PortfolioContent {
  const result = portfolioSchema.safeParse(raw);
  if (!result.success) {
    const details = result.error.issues.map((i) => `  - ${i.path.join(".") || "(root)"}: ${i.message}`).join("\n");
    throw new Error(`content/portfolio.json is invalid:\n${details}`);
  }
  return result.data;
}
