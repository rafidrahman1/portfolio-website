import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export const SectionHeader = ({
  index,
  label,
  title,
  children,
}: {
  index: string;
  label: string;
  title: ReactNode;
  children?: ReactNode;
}) => (
  <Reveal className="mb-14 sm:mb-20">
    <div className="eyebrow mb-6 flex items-center gap-3 text-muted-foreground">
      <span className="text-primary">{index}</span>
      <span aria-hidden className="h-px w-8 bg-border" />
      <span>{label}</span>
    </div>
    <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
      <h2 className="text-headline lg:col-span-8">{title}</h2>
      {children && <p className="text-lead text-muted-foreground lg:col-span-4">{children}</p>}
    </div>
  </Reveal>
);
