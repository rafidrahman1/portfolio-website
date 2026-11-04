import dynamic from "next/dynamic";
import Image from "next/image";
import { portfolio } from "@/lib/portfolio";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GitHubCalendarLoadingWrapper } from "@/components/ui/loading-wrapper";

const GitHubCalendar = dynamic(
  () => import("@/components/hero/githubCalendar/GitHubCalendar").then((m) => ({ default: m.GitHubCalendar })),
  {
    loading: () => <div className="min-h-[10rem] animate-pulse text-sm text-muted-foreground">Loading contributions…</div>,
  },
);

export const About = () => {
  const { about } = portfolio.sections;
  const [lead, ...rest] = about.summaryParagraphs;

  return (
    <section id="about" className="section-pad border-t border-border bg-surface">
      <div className="container-page">
        <SectionHeader index="04" label="About" title={<>Practical software, built to last.</>} />

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-7">
            <p className="text-title max-w-[28ch] !font-medium leading-[1.15] text-foreground">{about.subtitle}.</p>
            <div className="mt-10 max-w-2xl space-y-5 text-lead text-muted-foreground">
              <p>{lead}</p>
              {rest.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="space-y-10 lg:col-span-4 lg:col-start-9">
            <figure className="flex items-end gap-5">
              <div className="relative aspect-[4/5] w-36 shrink-0 overflow-hidden rounded-md border border-border sm:w-44">
                <Image
                  src="/images/Propic.png"
                  alt={`Portrait of ${portfolio.site.name}`}
                  fill
                  sizes="176px"
                  className="object-cover object-[50%_28%] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.04]"
                />
              </div>
              <figcaption className="eyebrow text-muted-foreground">
                {portfolio.site.name}
                <br />
                <span className="text-foreground/70">{portfolio.site.shortTitle}</span>
              </figcaption>
            </figure>
            <div>
              <h3 className="eyebrow mb-4 text-muted-foreground">{about.education.heading}</h3>
              <p className="font-medium">{about.education.degree}</p>
              <p className="text-muted-foreground">{about.education.schoolLine}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{about.education.coursework}</p>
            </div>
            <div>
              <h3 className="eyebrow mb-4 text-muted-foreground">Focus areas</h3>
              <ul className="space-y-2">
                {about.highlightBadges.map((b) => (
                  <li key={b} className="flex items-center gap-3 border-b border-border/60 pb-2">
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-16 sm:mt-24">
          <h3 className="eyebrow mb-6 text-muted-foreground">GitHub activity</h3>
          <div className="overflow-x-auto rounded-md border border-border bg-background p-4 sm:p-6">
            <GitHubCalendarLoadingWrapper>
              <GitHubCalendar />
            </GitHubCalendarLoadingWrapper>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
