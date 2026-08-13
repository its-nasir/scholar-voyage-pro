import { createFileRoute } from "@tanstack/react-router";
import { TestimonialCard } from "@/components/cards";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { CtaBand, Disclaimer, PageHero, Section } from "@/components/sections";
import { CounsellingButton } from "@/components/CounsellingDialog";
import { testimonials } from "@/data/testimonials";

const title = "Success Stories | Dream Scholars Abroad";
const description =
  "Student experiences of studying abroad with counselling, application and scholarship guidance from Dream Scholars Abroad.";

export const Route = createFileRoute("/success-stories")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/success-stories" },
    ],
    links: [{ rel: "canonical", href: "/success-stories" }],
  }),
  component: SuccessStories,
});

function SuccessStories() {
  return (
    <>
      <PageHero
        eyebrow="Success Stories"
        title="Student experiences"
        description="The stories below are placeholder content for layout purposes. Real, consented student testimonials will be published here."
      >
        <CounsellingButton variant="gold" size="lg" source="stories-hero" />
      </PageHero>

      <Section>
        <SectionHeading eyebrow="Testimonials" title="What students say" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.id} delay={index * 40}>
              <TestimonialCard testimonial={testimonial} />
            </Reveal>
          ))}
        </div>
        <div className="mx-auto mt-12 max-w-3xl">
          <Disclaimer>
            Testimonials describe individual experiences only. Outcomes vary and admission, scholarship and visa
            decisions rest with universities, scholarship providers and immigration authorities.
          </Disclaimer>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
