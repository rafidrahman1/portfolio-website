import type { AnchorHTMLAttributes, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

const base =
  "group inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-medium transition-[background-color,color,border-color,transform] duration-200 active:scale-[0.97]";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode };

export const PrimaryLink = ({ children, className = "", ...props }: Props) => (
  <a
    {...props}
    className={`${base} bg-primary text-primary-foreground hover:bg-foreground ${className}`}
  >
    {children}
    <ArrowUpRight
      aria-hidden
      className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
    />
  </a>
);

export const GhostLink = ({ children, className = "", ...props }: Props) => (
  <a
    {...props}
    className={`${base} border border-border text-foreground hover:border-foreground/60 ${className}`}
  >
    {children}
  </a>
);
