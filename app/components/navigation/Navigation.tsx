"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { portfolio } from "@/lib/portfolio";

export const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const links = portfolio.navigation;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled || open
          ? "border-b border-border bg-background/80 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav aria-label="Primary" className="container-page flex h-16 items-center justify-between">
        <a
          href="#home"
          aria-label="Rafid Rahman — home"
          className="flex items-center gap-2 text-sm font-semibold tracking-tight"
        >
          <span className="grid h-8 w-8 place-items-center rounded-md bg-foreground text-xs font-bold text-background">
            RR
          </span>
          <span className="hidden sm:inline">{portfolio.site.name}</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative py-1 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="/CV-1.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 items-center rounded-full border border-foreground/40 px-4 text-sm font-medium transition-colors hover:bg-foreground hover:text-background"
            >
              Resume
            </a>
          </li>
        </ul>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-md border border-border md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="container-page border-t border-border pb-8 pt-4 md:hidden">
          <ul>
            {links.map((link, i) => (
              <li key={link.href} className="border-b border-border">
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 py-5 text-3xl font-semibold tracking-tight"
                >
                  <span className="eyebrow text-primary">0{i + 1}</span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-center justify-between">
            <p className="eyebrow flex items-center gap-2 text-muted-foreground">
              <span aria-hidden className="h-2 w-2 rounded-full bg-primary" />
              Available for work
            </p>
            <a
              href="/CV-1.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="inline-flex h-10 items-center rounded-full border border-foreground/40 px-5 text-sm font-medium"
            >
              Resume
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
