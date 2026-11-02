import { MapPin } from "lucide-react";
import { portfolio } from "@/lib/portfolio";
import { PrimaryLink, GhostLink } from "@/components/ui/cta";
import { TotalDownloads } from "@/components/stats/TotalDownloads";
import { AskMeAnythingBubble } from "./AskMeAnythingBubble";
import { HeroDiagram } from "./HeroDiagram";

const Line = ({ i, children }: { i: number; children: React.ReactNode }) => (
  <span className="line-mask">
    <span style={{ ["--i" as string]: i }}>{children}</span>
  </span>
);

export const Hero = () => {
  const { site, contact, experience } = portfolio;
  const current = experience[0];

  return (
    <>
      <section id="home" className="relative overflow-hidden pb-16 pt-32 sm:pt-40 lg:pb-24">
        <div aria-hidden className="bg-grid pointer-events-none absolute inset-0" />

        <div className="container-page relative">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <div className="eyebrow animate-fade-in-up mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground sm:mb-10">
                <p className="flex items-center gap-2 text-foreground">
                  <span aria-hidden className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60 motion-reduce:animate-none" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                  </span>
                  Available for work
                </p>
                <p className="flex items-center gap-2">
                  <MapPin aria-hidden className="h-3.5 w-3.5" />
                  {contact.location.split(",").slice(0, 2).join(",").trim()}
                </p>
              </div>

              <p className="eyebrow animate-fade-in-up mb-5 text-primary">{site.title}</p>

              <h1 className="text-display">
                <Line i={0}>Building mobile</Line>
                <Line i={1}>experiences that</Line>
                <Line i={2}>
                  work in the <span className="text-primary">real&nbsp;world.</span>
                </Line>
              </h1>

              <p className="text-lead animate-fade-in-up mt-8 max-w-xl text-muted-foreground [animation-delay:350ms] sm:mt-10">
                I&apos;m <span className="text-foreground">{site.name}</span>, a Flutter developer focused on building
                reliable, performant, and user-centered applications.
              </p>

              <div className="animate-fade-in-up mt-8 flex flex-col gap-3 [animation-delay:450ms] sm:flex-row sm:items-center">
                <PrimaryLink href="#work">Explore my work</PrimaryLink>
                <GhostLink href="#contact">Get in touch</GhostLink>
                <a
                  href="/CV-1.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center px-2 text-sm text-muted-foreground underline underline-offset-4 transition-colors duration-200 hover:text-foreground"
                >
                  Résumé
                </a>
              </div>

              <div className="mt-8 hidden sm:block">
                <AskMeAnythingBubble />
              </div>
            </div>

            <div className="animate-fade-in-up [animation-delay:250ms] lg:col-span-5 lg:mt-24">
              <HeroDiagram />
            </div>
          </div>
        </div>

        <div className="container-page relative mt-16 lg:mt-24">
          <dl className="grid grid-cols-1 gap-8 border-t border-border pt-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <dt className="eyebrow mb-3 text-muted-foreground">Currently</dt>
              <dd>
                <div className="font-medium">{current.title}</div>
                <div className="text-sm text-muted-foreground">{current.company}</div>
              </dd>
            </div>
            <div>
              <dt className="eyebrow mb-3 text-muted-foreground">Focus</dt>
              <dd className="text-sm leading-relaxed text-muted-foreground">
                Flutter development, application architecture, performance optimization, and real-world product
                development.
              </dd>
            </div>
            <div>
              <dt className="eyebrow mb-3 text-muted-foreground">Based in</dt>
              <dd className="font-medium">{contact.location}</dd>
            </div>
            <div>
              <dt className="eyebrow mb-3 text-muted-foreground">Shipped</dt>
              <dd className="min-h-[3.25rem]">
                <TotalDownloads />
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Mobile: Ask-me-anything pinned to the bottom */}
      <div className="pointer-events-none fixed bottom-4 left-1/2 z-30 block -translate-x-1/2 sm:hidden">
        <div className="pointer-events-auto flex w-full max-w-xs justify-center">
          <AskMeAnythingBubble />
        </div>
      </div>
    </>
  );
};
