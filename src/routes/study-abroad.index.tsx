import { createFileRoute } from "@tanstack/react-router";
import { CountryCard } from "@/components/cards";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { CtaBand, Disclaimer, PageHero, Section } from "@/components/sections";
import { CounsellingButton } from "@/components/CounsellingDialog";
import { countries } from "@/data/countries";

const title = "Study Abroad Destinations | Dearm Scholars Abroad";
const description =
  "Explore 10+ study abroad destinations including the UK, USA, Canada, Australia, Germany, Ireland, New Zealand, France, Italy and UAE with courses, intakes and scholarship guidance.";

export const Route = createFileRoute("/study-abroad/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/study-abroad" },
    ],
    links: [{ rel: "canonical", href: "/study-abroad" }],
  }),
  component: StudyAbroadIndex,
});

function StudyAbroadIndex() {
  return (
    <>
      <PageHero
        eyebrow="Study Abroad"
        title="Find the destination that fits your profile"
        description="Compare popular study destinations by courses, intakes, entry requirements and scholarship availability."
      >
        <CounsellingButton variant="gold" size="lg" source="study-abroad-hero" />
      </PageHero>

      <Section>
        <SectionHeading
          eyebrow={`${countries.length} Destinations`}
          title="Popular study abroad countries"
          description="Each country page covers why students choose it, popular courses, requirements, intakes and visa basics."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {countries.map((country, index) => (
            <Reveal key={country.slug} delay={index * 40}>
              <CountryCard country={country} />
            </Reveal>
          ))}
        </div>
        <div className="mx-auto mt-12 max-w-3xl">
          <Disclaimer />
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
