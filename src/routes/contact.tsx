import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { SectionHeading } from "@/components/SectionHeading";
import { Disclaimer, FaqAccordion, PageHero, Section } from "@/components/sections";
import { Button } from "@/components/ui/button";
import { WhatsAppGlyph } from "@/components/WhatsAppButton";
import { generalFaqs } from "@/data/faqs";
import { siteConfig, whatsappLink } from "@/config/site";

const title = "Contact Us | Dearm Scholars Abroad Pvt. Ltd.";
const description =
  "Contact Dearm Scholars Abroad Pvt. Ltd. for free study abroad counselling. Call, email, message on WhatsApp or send an enquiry online.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact;
});

function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Book your free counselling session"
        description="Share your study abroad goals and a counsellor will get back to you with next steps."
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div className="space-y-4">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <h2 className="font-display text-lg font-bold text-foreground">Get in touch</h2>
              <ul className="mt-5 space-y-4 text-sm">
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                  <span className="text-muted-foreground">{siteConfig.contact.addressLines.join(", ")}</span>
                </li>
                <li className="flex gap-3">
                  <Phone className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                  <a
                    href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {siteConfig.contact.phone}
                  </a>
                </li>
                <li className="flex gap-3">
                  <Mail className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {siteConfig.contact.email}
                  </a>
                </li>
                <li className="flex gap-3">
                  <Clock className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                  <span className="text-muted-foreground">{siteConfig.contact.workingHours}</span>
                </li>
              </ul>
              <Button asChild variant="hero" className="mt-6 w-full">
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                  <WhatsAppGlyph className="size-5" /> Chat on WhatsApp
                </a>
              </Button>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border bg-secondary/50 shadow-card">
              {siteConfig.contact.mapsEmbedUrl ? (
                <iframe
                  src={siteConfig.contact.mapsEmbedUrl}
                  title="Office location map"
                  loading="lazy"
                  className="h-64 w-full border-0"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <div className="flex h-48 flex-col items-center justify-center gap-2 p-6 text-center">
                  <MapPin className="size-5 text-muted-foreground" aria-hidden="true" />
                  <p className="text-sm text-muted-foreground">
                    Office location map will appear here once the address is confirmed.
                  </p>
                </div>
              )}
            </div>

            <Disclaimer />
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-lift sm:p-8">
            <h2 className="font-display text-lg font-bold text-foreground">Send an enquiry</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Fields marked with an asterisk are required. We reply during working hours.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </Section>

      <Section tone="soft">
        <SectionHeading eyebrow="FAQs" title="Before you contact us" />
        <FaqAccordion faqs={generalFaqs} />
      </Section>
    </>
  );
}
