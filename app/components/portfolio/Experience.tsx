import { portfolio } from "@/lib/portfolio";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const Experience = () => {
  const experiences = portfolio.experience;

  return (
    <section id="experience" className="section-pad border-t border-border bg-[#111111]">
      <div className="container-page">
        <SectionHeader index="02" label="Experience" title={<>Where I&apos;ve worked.</>} />

        <ol>
          {experiences.map((job, i) => {
            const current = i === 0;
            return (
              <li key={`${job.company}-${job.period}`}>
                <Reveal>
                  <article className="grid gap-6 border-t border-border py-10 lg:grid-cols-12 lg:gap-8 lg:py-14">
                    <header className="lg:col-span-4">
                      <p className="eyebrow flex items-center gap-2 text-muted-foreground">
                        {current && <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-primary" />}
                        {job.period}
                      </p>
                      <h3 className={`mt-4 font-semibold tracking-tight ${current ? "text-title" : "text-2xl"}`}>
                        {job.company}
                      </h3>
                      <p className="mt-2 text-muted-foreground">{job.title}</p>
                    </header>

                    <div className="lg:col-span-8">
                      <p className={current ? "text-lead" : "text-muted-foreground"}>{job.description}</p>
                      <ul className="mt-6 space-y-4">
                        {job.achievements.map((a) => (
                          <li key={a} className="flex gap-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                            <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-primary" />
                            <span>{a}</span>
                          </li>
                        ))}
                      </ul>
                      <ul className="mt-6 flex flex-wrap gap-x-2 gap-y-1 font-mono text-xs text-foreground/70" aria-label="Technologies">
                        {job.technologies.map((t, k) => (
                          <li key={t}>
                            {t}
                            {k < job.technologies.length - 1 && <span aria-hidden className="ml-2 text-border">/</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};
