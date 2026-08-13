import { createFileRoute } from "@tanstack/react-router";
import { ServiceCard } from "@/components/cards";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { AdmissionProcess, CtaBand, Disclaimer, PageHero, Section } from "@/components/sections";
import { CounsellingButton } from "@/components/CounsellingDialog";
import { services } from "@/data/services";

const title = "Our Services | Dream Scholars Abroad";
const description =
  "Counselling, university shortlisting, application support, SOP and LOR guidance, scholarship assistance, visa guidance, accommodation and pre-departure support.";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesIndex,
});

function ServicesIndex() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="End-to-end study abroad support"
        description="From your first counselling session to pre-departure preparation, every stage of the process is supported."
      >
        <CounsellingButton variant="gold" size="lg" source="services-hero" />
      </PageHero>

      <Section>
        <SectionHeading eyebrow={`${services.length} Services`} title="What we help you with" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.slug} delay={index * 40}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
        <div className="mx-auto mt-12 max-w-3xl">
          <Disclaimer />
        </div>
      </Section>

      <AdmissionProcess />
      <CtaBand />
    </>
  );
}
