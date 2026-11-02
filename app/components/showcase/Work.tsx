import { ArrowUpRight } from "lucide-react";
import { portfolio } from "@/lib/portfolio";
import { getStaticProjects } from "@/lib/github-data";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AppDownloadsBadge } from "@/components/stats/TotalDownloads";
import { MobileFrame } from "./MobileFrame";
import { MobileScreenshotCarousel } from "./MobileScreenshotCarousel";

const linkClass =
  "group inline-flex items-center gap-1.5 border-b border-foreground/30 pb-0.5 text-sm font-medium transition-colors hover:border-primary hover:text-primary";

const demoLabel = (url: string) => (url.includes("play.google.com") ? "View on Google Play" : "View live");

const ProjectLinks = ({ title, demoUrl, codeUrl }: { title: string; demoUrl?: string; codeUrl?: string }) => {
  if (!demoUrl && !codeUrl) return null;
  return (
    <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
      {demoUrl && (
        <a href={demoUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {demoLabel(demoUrl)}
          <span className="sr-only"> — {title}</span>
          <ArrowUpRight aria-hidden className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      )}
      {codeUrl && (
        <a href={codeUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
          Source on GitHub
          <span className="sr-only"> — {title}</span>
          <ArrowUpRight aria-hidden className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      )}
    </div>
  );
};

export const Work = () => {
  const featured = getStaticProjects();
  const featuredTitles = new Set(featured.map((p) => p.title));
  const more = portfolio.keyProjects.filter((p) => !featuredTitles.has(p.title));

  return (
    <section id="work" className="section-pad">
      <div className="container-page">
        <SectionHeader index="01" label="Selected work" title={<>Products I&apos;ve shipped.</>}>
          Production apps built with Flutter — from field-ready enterprise tooling to apps on Google Play.
        </SectionHeader>

        <div>
          {featured.map((project, i) => {
            const flip = i % 2 === 1;
            const num = String(i + 1).padStart(2, "0");
            return (
              <Reveal key={project.title}>
                <article className="group grid gap-10 border-t border-border py-12 sm:py-16 lg:grid-cols-12 lg:gap-12">
                  <div
                    className={`relative overflow-hidden rounded-md border border-border bg-[#111111] lg:col-span-7 ${
                      flip ? "lg:order-2" : ""
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`pointer-events-none absolute top-4 select-none font-semibold leading-none tracking-tighter text-white/[0.04] ${
                        flip ? "right-4" : "left-4"
                      } text-[5rem] sm:text-[9rem]`}
                    >
                      {num}
                    </span>
                    <div className="relative px-4 py-12 transition-transform duration-500 ease-out group-hover:scale-[1.02] sm:py-16">
                      <MobileFrame>
                        <MobileScreenshotCarousel
                          title={project.title}
                          images={project.images ?? [project.image]}
                          priority={i === 0}
                        />
                      </MobileFrame>
                    </div>
                  </div>

                  <div className={`flex flex-col justify-center lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
                    <p className="eyebrow mb-5 flex items-center gap-3 text-muted-foreground">
                      <span className="text-primary">{num}</span>
                      <span aria-hidden className="h-px w-6 bg-border" />
                      {project.category}
                    </p>
                    <h3 className="text-title">{project.title}</h3>
                    <div className="mt-2 min-h-5">
                      <AppDownloadsBadge title={project.title} />
                    </div>
                    <p className="mt-5 leading-relaxed text-muted-foreground">{project.description}</p>
                    <ul className="mt-6 flex flex-wrap gap-x-2 gap-y-1 font-mono text-xs text-foreground/70" aria-label="Technologies">
                      {project.technologies.map((tech, t) => (
                        <li key={tech}>
                          {tech}
                          {t < project.technologies.length - 1 && <span aria-hidden className="ml-2 text-border">/</span>}
                        </li>
                      ))}
                    </ul>
                    <ProjectLinks
                      title={project.title}
                      demoUrl={project.demoButton ? project.demoUrl : undefined}
                      codeUrl={project.codeButton ? project.codeUrl : undefined}
                    />
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {more.length > 0 && (
          <Reveal className="mt-8">
            <h3 className="eyebrow mb-6 text-muted-foreground">Also built</h3>
            <ul className="border-t border-border">
              {more.map((p) => (
                <li
                  key={p.title}
                  className="grid gap-3 border-b border-border py-6 transition-colors hover:bg-white/[0.02] lg:grid-cols-12 lg:gap-8"
                >
                  <div className="lg:col-span-4">
                    <div className="text-xl font-semibold tracking-tight">{p.title}</div>
                    <div className="eyebrow mt-1 text-muted-foreground">{p.category}</div>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground lg:col-span-5">{p.description}</p>
                  <div className="flex flex-col gap-3 lg:col-span-3 lg:items-end">
                    <span className="font-mono text-xs text-foreground/70 lg:text-right">
                      {p.technologies.join(" / ")}
                    </span>
                    {(p.codeUrl || p.demoUrl) && (
                      <a
                        href={p.demoUrl || p.codeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={linkClass}
                      >
                        {p.demoUrl ? "View live" : "Source on GitHub"}
                        <span className="sr-only"> — {p.title}</span>
                        <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </section>
  );
};
