import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { CounsellingButton } from "@/components/CounsellingDialog";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { WhatsAppGlyph } from "@/components/WhatsAppButton";
import { admissionSteps } from "@/data/services";
import type { Faq } from "@/data/faqs";
import { siteConfig, whatsappLink } from "@/config/site";
import worldMap from "@/assets/world-map.jpg";

export function Section({
  children,
  className = "",
  id,
  tone = "default",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "default" | "soft" | "navy";
}) {
  const toneClass =
    tone === "navy" ? "bg-navy text-navy-foreground" : tone === "soft" ? "bg-gradient-soft" : "bg-background";
  return (
    <section id={id} className={`${toneClass} py-16 sm:py-20 ${className}`}>
      <div className="container-page">{children}</div>
    </section>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-navy py-16 text-navy-foreground sm:py-20">
      <img
        src={worldMap}
        alt=""
        aria-hidden="true"
        loading="lazy"
        width={1600}
        height={900}
        className="pointer-events-none absolute inset-0 size-full object-cover opacity-25"
      />
      <div className="container-page relative">
        <div className="max-w-3xl">
          {eyebrow ? (
            <p className="mb-3 inline-flex rounded-full border border-navy-foreground/25 bg-navy-foreground/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-gold">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="text-balance text-3xl font-bold leading-tight sm:text-5xl">{title}</h1>
          {description ? (
            <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-navy-foreground/80 sm:text-lg">
              {description}
            </p>
          ) : null}
          {children ? <div className="mt-7 flex flex-wrap gap-3">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}

export function FaqAccordion({ faqs, id }: { faqs: Faq[]; id?: string }) {
  return (
    <Accordion type="single" collapsible id={id} className="mx-auto mt-10 max-w-3xl">
      {faqs.map((faq, index) => (
        <AccordionItem key={faq.q} value={`item-${index}`} className="border-b border-border">
          <AccordionTrigger className="text-left text-base font-semibold text-foreground hover:no-underline">
            {faq.q}
          </AccordionTrigger>
          <AccordionContent className="text-sm leading-relaxed text-muted-foreground">{faq.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export function AdmissionProcess() {
  return (
    <Section tone="soft" id="admission-process">
      <SectionHeading
        eyebrow="Admission Process"
        title="Your Journey to Studying Abroad"
        description="A structured nine-step process, so you always know what happens next."
      />
      <ol className="relative mt-12 grid gap-6 md:grid-cols-3">
        {admissionSteps.map((step, index) => (
          <Reveal key={step.step} delay={index * 60}>
            <li className="flex h-full gap-4 rounded-2xl border border-border bg-card p-5 shadow-card">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-gradient-royal font-display text-sm font-bold text-primary-foreground">
                {step.step}
              </span>
              <div>
                <h3 className="text-sm font-semibold text-foreground">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

export function CtaBand({
  title = "Not sure where to begin?",
  description = "Talk to a counsellor about suitable countries, universities and scholarship options for your profile.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-navy px-6 py-12 text-navy-foreground sm:px-12">
          <div className="relative max-w-2xl">
            <h2 className="text-balance text-2xl font-bold sm:text-3xl">{title}</h2>
            <p className="mt-3 text-pretty text-navy-foreground/80">{description}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <CounsellingButton variant="gold" size="lg" source="cta-band" />
              <Button asChild variant="onNavy" size="lg">
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                  <WhatsAppGlyph className="size-5" /> Talk to an Expert
                </a>
              </Button>
            </div>
            <p className="mt-6 text-xs text-navy-foreground/60">{siteConfig.disclaimer}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Disclaimer({ children }: { children?: ReactNode }) {
  return (
    <p className="rounded-xl border border-border bg-secondary/60 p-4 text-xs leading-relaxed text-muted-foreground">
      {children ?? siteConfig.disclaimer}
    </p>
  );
}

export function BreadcrumbTrail({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-1.5">
            {item.to ? (
              <Link to={item.to} className="hover:text-foreground">
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground">{item.label}</span>
            )}
            {index < items.length - 1 ? <span aria-hidden="true">/</span> : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
