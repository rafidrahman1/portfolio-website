import Image from "next/image";
import { MapPin } from "lucide-react";
import { portfolio } from "@/lib/portfolio";
import { PrimaryLink, GhostLink } from "@/components/ui/cta";
import { TotalDownloads } from "@/components/stats/TotalDownloads";
import { AskMeAnythingBubble } from "./AskMeAnythingBubble";

export const Hero = () => {
  const { site, contact, experience } = portfolio;
  const current = experience[0];

  return (
    <>
      <section id="home" className="relative pb-16 pt-32 sm:pt-40 lg:pb-24">
        <div className="container-page">
          <div className="eyebrow animate-fade-in-up mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground sm:mb-12">
            <p className="flex items-center gap-2">
              <MapPin aria-hidden className="h-3.5 w-3.5 text-primary" />
              {site.title} — {contact.location.split(",").slice(-2).join(",").trim()}
            </p>
            <p className="flex items-center gap-2 text-foreground">
              <span aria-hidden className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Available for work
            </p>
          </div>

          <h1 className="text-display animate-fade-in-up max-w-[14ch] [animation-delay:80ms] sm:max-w-none">
            <span className="lg:block">I build mobile</span>{" "}
            <span className="lg:block">experiences that</span>{" "}
            <span className="lg:block">
              work in the <span className="text-primary">real&nbsp;world.</span>
            </span>
          </h1>

          <div className="mt-14 grid gap-12 sm:mt-20 lg:grid-cols-12 lg:gap-8">
            <div className="animate-fade-in-up [animation-delay:180ms] lg:col-span-6 lg:col-start-1">
              <p className="text-lead max-w-xl text-muted-foreground">
                I&apos;m <span className="text-foreground">{site.name}</span>, a Flutter developer focused on building
                reliable, performant, and user-centered mobile applications.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <PrimaryLink href="#work">Explore my work</PrimaryLink>
                <GhostLink href="#contact">Get in touch</GhostLink>
                <GhostLink href="/CV-1.pdf" target="_blank" rel="noopener noreferrer" className="border-transparent text-muted-foreground underline underline-offset-4 hover:text-foreground">
                  Download résumé
                </GhostLink>
              </div>
              <div className="mt-10 hidden sm:block">
                <AskMeAnythingBubble />
              </div>
            </div>

            <figure className="animate-fade-in-up flex items-end gap-5 [animation-delay:260ms] lg:col-span-4 lg:col-start-9 lg:flex-col lg:items-stretch">
              <div className="relative aspect-[4/5] w-36 shrink-0 overflow-hidden rounded-md border border-border sm:w-44 lg:w-full">
                <Image
                  src="/images/profile.jpg"
                  alt={`Portrait of ${site.name}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 176px, 340px"
                  className="object-cover object-[50%_28%]"
                />
              </div>
              <figcaption className="eyebrow text-muted-foreground">
                {site.name}
                <br />
                <span className="text-foreground/70">{site.shortTitle}</span>
              </figcaption>
            </figure>
          </div>
        </div>

        <div className="container-page mt-16 lg:mt-24">
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
              <dd>
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
