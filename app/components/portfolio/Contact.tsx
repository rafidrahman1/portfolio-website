"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { portfolio } from "@/lib/portfolio";
import { Reveal } from "@/components/ui/Reveal";
import { PrimaryLink } from "@/components/ui/cta";

export const Contact = () => {
  const details = portfolio.contact;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        let message = 'Failed to send message.';
        try {
          const data = await response.json();
          const apiError = (data as { error?: unknown })?.error;
          if (typeof apiError === 'string') {
            message = apiError;
          } else if (apiError && typeof apiError === 'object' && 'message' in (apiError as Record<string, unknown>)) {
            const detailed = (apiError as { message?: unknown }).message;
            if (typeof detailed === 'string' && detailed.trim().length > 0) {
              message = detailed;
            }
          }
        } catch {
          // If parsing fails, keep the default message
        }
        throw new Error(message);
      }

      toast({
        title: "Message Sent!",
        description: "Thank you for your message. I'll get back to you soon!",
      });

      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      const description = error instanceof Error && error.message
        ? error.message
        : "There was a problem with your request. Please try again.";
      // Intentionally log to help diagnose unexpected failures from the client
      // (e.g., network errors, CORS). This will not be visible to end users.
      console.error('Contact form submission failed:', error);
      toast({
        title: "Uh oh! Something went wrong.",
        description,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const links = [
    { label: "LinkedIn", href: details.socialLinkedinUrl },
    { label: "GitHub", href: details.socialGithubUrl },
  ].filter((l) => l.href);

  const fieldClass =
    "h-12 rounded-none border-0 border-b border-border bg-transparent px-0 text-base focus-visible:border-primary focus-visible:ring-0 focus-visible:ring-offset-0";

  return (
    <section id="contact" className="section-pad border-t border-border">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow mb-6 flex items-center gap-3 text-muted-foreground">
            <span className="text-primary">05</span>
            <span aria-hidden className="h-px w-8 bg-border" />
            Contact
          </p>
          <h2 className="text-display max-w-[16ch]">
            Have something <span className="text-primary">worth building?</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-14 sm:mt-20 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-5">
            <p className="text-lead max-w-md text-muted-foreground">{portfolio.sections.contact.connectBody}</p>
            <div className="mt-8">
              <PrimaryLink href={`mailto:${details.email}`}>Email me</PrimaryLink>
            </div>
            <dl className="mt-12 space-y-6 border-t border-border pt-8">
              <div>
                <dt className="eyebrow mb-1 text-muted-foreground">Email</dt>
                <dd>
                  <a href={`mailto:${details.email}`} className="break-all text-lg hover:text-primary">
                    {details.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow mb-1 text-muted-foreground">Phone</dt>
                <dd>
                  <a href={`tel:${details.phone.replace(/\s/g, "")}`} className="text-lg hover:text-primary">
                    {details.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow mb-1 text-muted-foreground">Elsewhere</dt>
                <dd className="flex flex-wrap gap-x-6 gap-y-2">
                  {links.map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1 text-lg hover:text-primary"
                    >
                      {l.label}
                      <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  ))}
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
            <h3 className="eyebrow mb-6 text-muted-foreground">{portfolio.sections.contact.formTitle}</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="eyebrow text-muted-foreground">Name</label>
                  <Input id="name" name="name" value={formData.name} onChange={handleChange} autoComplete="name" required className={fieldClass} />
                </div>
                <div>
                  <label htmlFor="email" className="eyebrow text-muted-foreground">Email</label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} autoComplete="email" required className={fieldClass} />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="eyebrow text-muted-foreground">Subject</label>
                <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} required className={fieldClass} />
              </div>
              <div>
                <label htmlFor="message" className="eyebrow text-muted-foreground">Message</label>
                <Textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="min-h-[8rem] rounded-none border-0 border-b border-border bg-transparent px-0 text-base focus-visible:border-primary focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-foreground/40 px-6 text-sm font-medium transition-colors hover:bg-foreground hover:text-background disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 aria-hidden className="h-4 w-4 animate-spin" /> Sending…
                  </>
                ) : (
                  "Send message"
                )}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
