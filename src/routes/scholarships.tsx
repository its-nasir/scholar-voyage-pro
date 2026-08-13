import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ScholarshipCard } from "@/components/cards";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { CtaBand, Disclaimer, FaqAccordion, PageHero, Section } from "@/components/sections";
import { CounsellingButton } from "@/components/CounsellingDialog";
import { ScholarshipEligibilityForm } from "@/components/forms/ScholarshipEligibilityForm";
import { selectClass } from "@/components/forms/fields";
import { scholarships } from "@/data/scholarships";
import { generalFaqs } from "@/data/faqs";

const title = "Scholarships & Financial Aid | Dearm Scholars Abroad";
const description =
  "Explore scholarship types for studying abroad, understand eligibility factors and check your scholarship eligibility with guidance from Dearm Scholars Abroad.";

export const Route = createFileRoute("/scholarships")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/scholarships" },
    ],
    links: [{ rel: "canonical", href: "/scholarships" }],
  }),
  component: Scholarships,
});

const scholarshipTypes = [
  { title: "Merit-based scholarships", text: "Awarded on academic performance and overall profile strength." },
  { title: "Need-based scholarships", text: "Consider a student's financial background alongside academics." },
  { title: "Country-specific schemes", text: "Government or national programmes for international students." },
  { title: "University scholarships", text: "Institution-funded awards, often applied automatically with admission." },
  { title: "Course-specific awards", text: "Departmental or subject awards for selected programmes." },
  { title: "Sports & cultural awards", text: "Recognition for achievement outside academics, where offered." },
];

function Scholarships() {
  const [country, setCountry] = useState("All");
  const [level, setLevel] = useState("All");

  const countryOptions = useMemo(() => ["All", ...new Set(scholarships.map((s) => s.country))], []);
  const levelOptions = useMemo(() => ["All", ...new Set(scholarships.map((s) => s.degreeLevel))], []);

  const filtered = scholarships.filter(
    (s) => (country === "All" || s.country === country) && (level === "All" || s.degreeLevel === level),
  );

  return (
    <>
      <PageHero
        eyebrow="Scholarships"
        title="Scholarship guidance for eligible students"
        description="Scholarships reduce the cost of studying abroad, but each has its own criteria and deadlines. We help you understand which options suit your profile and how to present a stronger application."
      >
        <CounsellingButton variant="gold" size="lg" source="scholarships-hero" />
      </PageHero>

      <Section>
        <SectionHeading eyebrow="Types" title="Common types of scholarships" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {scholarshipTypes.map((item, index) => (
            <Reveal key={item.title} delay={index * 50}>
              <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-card">
                <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="soft">
        <SectionHeading
          eyebrow="Sample Listings"
          title="Scholarship listings"
          description="The entries below are clearly labelled demo content that show the listing format. Verified scholarships will be published here."
        />
        <div className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
          <label className="flex-1">
            <span className="sr-only">Filter by country</span>
            <select value={country} onChange={(e) => setCountry(e.target.value)} className={selectClass}>
              {countryOptions.map((option) => (
                <option key={option} value={option}>
                  {option === "All" ? "All countries" : option}
                </option>
              ))}
            </select>
          </label>
          <label className="flex-1">
            <span className="sr-only">Filter by degree level</span>
            <select value={level} onChange={(e) => setLevel(e.target.value)} className={selectClass}>
              {levelOptions.map((option) => (
                <option key={option} value={option}>
                  {option === "All" ? "All degree levels" : option}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((scholarship, index) => (
            <Reveal key={scholarship.id} delay={index * 40}>
              <ScholarshipCard scholarship={scholarship} />
            </Reveal>
          ))}
        </div>
        {filtered.length === 0 ? (
          <p className="mt-10 text-center text-sm text-muted-foreground">
            No sample listings match these filters. Try a different combination.
          </p>
        ) : null}
      </Section>

      <Section id="eligibility">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Eligibility Check"
              title="Check your scholarship eligibility"
              description="Share your academic details and preferences. A counsellor will review your profile and suggest scholarship options that are realistic for you."
            />
            <div className="mt-8">
              <Disclaimer>
                Scholarship decisions rest entirely with the university or scholarship provider. This form is a
                guidance request, not an application, and does not guarantee any award.
              </Disclaimer>
            </div>
          </div>
          <div className="rounded-3xl border border-border bg-card p-6 shadow-lift sm:p-8">
            <ScholarshipEligibilityForm />
          </div>
        </div>
      </Section>

      <Section tone="soft">
        <SectionHeading eyebrow="FAQs" title="Scholarship questions" />
        <FaqAccordion faqs={generalFaqs.slice(0, 6)} />
      </Section>

      <CtaBand
        title="Want help finding suitable scholarships?"
        description="Book a free counselling session and we'll walk through the options available for your profile and destination."
      />
    </>
  );
}
