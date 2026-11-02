"use client";

import { ArrowUp } from "lucide-react";
import { portfolio } from "@/lib/portfolio";

export const Footer = () => {
  const { site, contact } = portfolio;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="container-page flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          © {year} {site.name}. {site.footerNote}
        </p>
        <ul className="flex items-center gap-6 text-sm">
          <li>
            <a href={contact.socialGithubUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-foreground">
              GitHub
            </a>
          </li>
          <li>
            <a href={contact.socialLinkedinUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-foreground">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={`mailto:${contact.email}`} className="text-muted-foreground transition-colors hover:text-foreground">
              Email
            </a>
          </li>
          <li>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-primary"
            >
              Back to top
              <ArrowUp aria-hidden className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
            </button>
          </li>
        </ul>
      </div>
    </footer>
  );
};
