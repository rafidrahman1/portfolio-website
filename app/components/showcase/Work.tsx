import { ArrowUpRight } from "lucide-react";
import { portfolio } from "@/lib/portfolio";
import { getStaticProjects } from "@/lib/github-data";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AppDownloadsBadge } from "@/components/stats/TotalDownloads";
import { MobileFrame } from "./MobileFrame";
import { MobileScreenshotCarousel } from "./MobileScreenshotCarousel";
import { StaticPhone } from "./StaticPhone";

type Project = ReturnType<typeof getStaticProjects>[number];

const linkClass =
  "group inline-flex items-center gap-1.5 border-b border-foreground/30 pb-0.5 text-sm font-medium transition-colors duration-200 hover:border-primary hover:text-primary";

const arrow =
  "h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5";

const demoLabel = (url: string) => (url.includes("play.google.com") ? "View on Google Play" : "View live");

const ProjectLinks = ({ project }: { project: Project }) => {
  const demoUrl = project.demoButton ? project.demoUrl : undefined;
  const codeUrl = project.codeButton ? project.codeUrl : undefined;
  if (!demoUrl && !codeUrl) return null;
  return (
    <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
      {demoUrl && (
        <a href={demoUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {demoLabel(demoUrl)}
          <span className="sr-only"> — {project.title}</span>
          <ArrowUpRight aria-hidden className={arrow} />
        </a>
      )}
      {codeUrl && (
        <a href={codeUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
          Source on GitHub
          <span className="sr-only"> — {project.title}</span>
          <ArrowUpRight aria-hidden className={arrow} />
        </a>
      )}
    </div>
  );
};

const Tech = ({ items }: { items: string[] }) => (
  <ul className="flex flex-wrap gap-x-2 gap-y-1 font-mono text-xs text-foreground/70" aria-label="Technologies">
    {items.map((tech, t) => (
      <li key={tech}>
        {tech}
        {t < items.length - 1 && <span aria-hidden className="ml-2 text-border">/</span>}
      </li>
    ))}
  </ul>
);

const Meta = ({ num, category }: { num: string; category: string }) => (
  <p className="eyebrow mb-5 flex items-center gap-3 text-muted-foreground">
    <span className="text-primary">{num}</span>
    <span aria-hidden className="h-px w-6 bg-border" />
    {category}
  </p>
);

const Details = ({ project, num, big = false }: { project: Project; num: string; big?: boolean }) => (
  <>
    <Meta num={num} category={project.category} />
    <h3 className={big ? "text-headline" : "text-title"}>{project.title}</h3>
    <div className="mt-2 min-h-5">
      <AppDownloadsBadge title={project.title} />
    </div>
    <p className="mt-5 leading-relaxed text-muted-foreground">{project.description}</p>
    <div className="mt-6">
      <Tech items={project.technologies} />
    </div>
    <ProjectLinks project={project} />
  </>
);

const hoverScale = "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025]";

/* ---------- NextCart: retail "product stage" ---------- */
const NextCartVisual = ({ project }: { project: Project }) => {
  const imgs = project.images ?? [project.image];
  return (
    <div className="relative overflow-hidden rounded-md border border-border bg-surface">
      <div aria-hidden className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/15 bg-primary/[0.05] sm:h-[44rem] sm:w-[44rem]" />
      <div aria-hidden className="absolute left-1/2 top-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/10 sm:h-[30rem] sm:w-[30rem]" />
      <p className="eyebrow absolute left-5 top-5 z-10 text-muted-foreground">English / বাংলা</p>
      <div className={`relative flex items-end justify-center gap-6 px-4 pb-14 pt-20 sm:gap-10 lg:gap-14 ${hoverScale}`}>
        <div className="hidden translate-y-10 md:block">
          <StaticPhone src={imgs[2] ?? imgs[0]} alt={`${project.title} product list screen`} className="w-44 lg:w-52" />
        </div>
        <MobileFrame className="w-[15.5rem] shrink-0 sm:w-[17rem] lg:w-[18.5rem]">
          <MobileScreenshotCarousel title={project.title} images={imgs} priority />
        </MobileFrame>
        <div className="hidden translate-y-10 md:block">
          <StaticPhone src={imgs[4] ?? imgs[1] ?? imgs[0]} alt={`${project.title} sales orders screen`} className="w-44 lg:w-52" />
        </div>
      </div>
    </div>
  );
};

/* ---------- MotoHealth: technical, dashboard-inspired ---------- */
const readouts = ["Odometer", "Mileage", "Maintenance", "Costs", "Papers"];

const Bracket = ({ pos }: { pos: string }) => (
  <span aria-hidden className={`absolute h-3 w-3 border-primary/60 ${pos}`} />
);

const MotoHealthVisual = ({ project }: { project: Project }) => (
  <div className="relative overflow-hidden rounded-md border border-border bg-surface">
    <div
      aria-hidden
      className="absolute inset-0 opacity-100"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }}
    />
    <Bracket pos="left-3 top-3 border-l border-t" />
    <Bracket pos="right-3 top-3 border-r border-t" />
    <Bracket pos="bottom-3 left-3 border-b border-l" />
    <Bracket pos="bottom-3 right-3 border-b border-r" />
    <p className="eyebrow absolute left-7 top-6 z-10 text-muted-foreground">Local-first</p>

    <div className="relative grid items-center gap-6 px-6 py-16 md:grid-cols-[1fr_auto_1fr] md:px-10">
      <ul className="hidden space-y-5 md:block" aria-hidden>
        {readouts.slice(0, 3).map((r, i) => (
          <li key={r} className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            <span className="text-primary">0{i + 1}</span>
            {r}
            <span className="h-px flex-1 bg-border" />
          </li>
        ))}
      </ul>
      <div className={hoverScale}>
        <MobileFrame>
          <MobileScreenshotCarousel title={project.title} images={project.images ?? [project.image]} />
        </MobileFrame>
      </div>
      <ul className="hidden space-y-5 md:block" aria-hidden>
        {readouts.slice(3).map((r, i) => (
          <li key={r} className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            <span className="h-px flex-1 bg-border" />
            {r}
            <span className="text-primary">0{i + 4}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

/* ---------- Gram Adalat / AMS: compact cards with a cropped phone ---------- */
const CroppedCard = ({
  project,
  num,
  tone,
}: {
  project: Project;
  num: string;
  tone: "light" | "dark";
}) => {
  const light = tone === "light";
  return (
    <article className="group flex h-full flex-col">
      <div
        className={`relative h-[24rem] overflow-hidden rounded-md border sm:h-[28rem] ${
          light ? "border-transparent bg-[#E9EBE6]" : "border-border bg-surface"
        }`}
      >
        <span
          className={`eyebrow absolute left-5 top-5 z-10 ${light ? "text-black/60" : "text-muted-foreground"}`}
        >
          {light ? "Accessible by design" : "Field-ready"}
        </span>
        <div className={`absolute inset-x-0 top-16 flex justify-center ${hoverScale}`}>
          <MobileFrame>
            <MobileScreenshotCarousel title={project.title} images={project.images ?? [project.image]} />
          </MobileFrame>
        </div>
      </div>
      <div className="mt-8 flex flex-1 flex-col">
        <Details project={project} num={num} />
      </div>
    </article>
  );
};

export const Work = () => {
  const featured = getStaticProjects();
  const featuredTitles = new Set(featured.map((p) => p.title));
  const more = portfolio.keyProjects.filter((p) => !featuredTitles.has(p.title));
  const byTitle = (t: string) => featured.find((p) => p.title === t);

  const nextcart = byTitle("NextCart");
  const moto = byTitle("MotoHealth");
  const gram = byTitle("Gram Adalat");
  const ams = byTitle("Asset Management System");
  const rest = featured.filter((p) => !["NextCart", "MotoHealth", "Gram Adalat", "Asset Management System"].includes(p.title));
  const num = (p?: Project) => String(featured.findIndex((x) => x.title === p?.title) + 1).padStart(2, "0");

  return (
    <section id="work" className="section-pad">
      <div className="container-page">
        <SectionHeader index="01" label="Selected work" title={<>Products I&apos;ve shipped.</>}>
          Production apps built with Flutter — from retail and field-ready enterprise tooling to apps on Google Play.
        </SectionHeader>

        {nextcart && (
          <Reveal>
            <article className="group border-t border-border pt-10 sm:pt-14">
              <NextCartVisual project={nextcart} />
              <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-6">
                  <Meta num={num(nextcart)} category={nextcart.category} />
                  <h3 className="text-headline">{nextcart.title}</h3>
                  <div className="mt-2 min-h-5">
                    <AppDownloadsBadge title={nextcart.title} />
                  </div>
                </div>
                <div className="lg:col-span-6 lg:pt-10">
                  <p className="text-lead text-muted-foreground">{nextcart.description}</p>
                  <div className="mt-6">
                    <Tech items={nextcart.technologies} />
                  </div>
                  <ProjectLinks project={nextcart} />
                </div>
              </div>
            </article>
          </Reveal>
        )}

        {moto && (
          <Reveal className="mt-20 sm:mt-28">
            <article className="group grid gap-10 border-t border-border pt-10 sm:pt-14 lg:grid-cols-12 lg:gap-12">
              <div className="flex flex-col justify-center lg:col-span-5">
                <Details project={moto} num={num(moto)} big />
              </div>
              <div className="lg:col-span-7">
                <MotoHealthVisual project={moto} />
              </div>
            </article>
          </Reveal>
        )}

        {(gram || ams) && (
          <div className="mt-20 grid gap-x-12 gap-y-20 border-t border-border pt-10 sm:mt-28 sm:pt-14 lg:grid-cols-12">
            {gram && (
              <Reveal className="lg:col-span-7">
                <CroppedCard project={gram} num={num(gram)} tone="light" />
              </Reveal>
            )}
            {ams && (
              <Reveal delay={0.1} className="lg:col-span-5 lg:mt-24">
                <CroppedCard project={ams} num={num(ams)} tone="dark" />
              </Reveal>
            )}
          </div>
        )}

        {rest.map((p) => (
          <Reveal key={p.title} className="mt-20">
            <article className="border-t border-border pt-10">
              <Details project={p} num={num(p)} />
            </article>
          </Reveal>
        ))}

        {more.length > 0 && (
          <Reveal className="mt-20 sm:mt-28">
            <h3 className="eyebrow mb-6 text-muted-foreground">Also built</h3>
            <ul className="border-t border-border">
              {more.map((p) => (
                <li
                  key={p.title}
                  className="grid gap-3 border-b border-border py-6 transition-colors duration-200 hover:bg-white/[0.02] lg:grid-cols-12 lg:gap-8"
                >
                  <div className="lg:col-span-4">
                    <div className="text-xl font-semibold tracking-tight">{p.title}</div>
                    <div className="eyebrow mt-1 text-muted-foreground">{p.category}</div>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground lg:col-span-5">{p.description}</p>
                  <div className="flex flex-col gap-3 lg:col-span-3 lg:items-end">
                    <span className="font-mono text-xs text-foreground/70 lg:text-right">{p.technologies.join(" / ")}</span>
                    {(p.codeUrl || p.demoUrl) && (
                      <a href={p.demoUrl || p.codeUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                        {p.demoUrl ? "View live" : "Source on GitHub"}
                        <span className="sr-only"> — {p.title}</span>
                        <ArrowUpRight aria-hidden className={arrow} />
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
