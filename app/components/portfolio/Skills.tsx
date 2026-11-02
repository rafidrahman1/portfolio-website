import { portfolio } from "@/lib/portfolio";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const Skills = () => {
  const { skillCategories, sections } = portfolio;
  const { expertise } = sections.skills;

  return (
    <section id="skills" className="section-pad border-t border-border">
      <div className="container-page">
        <SectionHeader index="03" label="Technical expertise" title={<>What I work with.</>}>
          {sections.skills.subtitle}
        </SectionHeader>

        <div className="grid gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((cat, i) => (
            <Reveal key={cat.title} delay={i * 0.08} className="bg-background">
              <div className="h-full p-6 sm:p-8">
                <h3 className="eyebrow mb-6 flex items-center gap-3 text-muted-foreground">
                  <span className="text-primary">0{i + 1}</span>
                  {cat.title}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {cat.skills.map((s) => (
                    <li
                      key={s}
                      className="rounded-sm border border-border px-3 py-1.5 text-sm transition-colors duration-200 hover:border-primary/50 hover:text-primary"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 sm:mt-24">
          <h3 className="eyebrow mb-6 text-muted-foreground">{sections.skills.expertiseTitle}</h3>
          <dl className="border-t border-border">
            {expertise.map((e) => (
              <div key={e.title} className="grid gap-2 border-b border-border py-6 lg:grid-cols-12 lg:gap-8">
                <dt className="text-xl font-semibold tracking-tight lg:col-span-5">{e.title}</dt>
                <dd className="text-muted-foreground lg:col-span-7">{e.description}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
};
