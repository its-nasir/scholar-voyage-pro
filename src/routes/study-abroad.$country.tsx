import { createFileRoute, notFound } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { UniversityCard } from "@/components/cards";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { BreadcrumbTrail, CtaBand, Disclaimer, FaqAccordion, PageHero, Section } from "@/components/sections";
import { CounsellingButton } from "@/components/CounsellingDialog";
import { countries, countryBySlug } from "@/data/countries";
import { universities } from "@/data/universities";

export const Route = createFileRoute("/study-abroad/$country")({
  loader: ({ params }) => {
    const country = countryBySlug(params.country);
    if (!country) throw notFound();
    return { country };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Destination unavailable" }, { name: "robots", content: "noindex" }] };
    }
    const t = `Study in ${loaderData.country.name} | Dearm Scholars Abroad`;
    const d = `${loaderData.country.tagline} Courses, intakes, entry requirements, scholarships and visa guidance for studying in ${loaderData.country.name}.`;
    return {
      meta: [
        { title: t },
        { name: "description", content: d },
        { property: "og:title", content: t },
        { property: "og:description", content: d },
        { property: "og:type", content: "article" },
      ],
    };
  },
  component: CountryPage,
});

function CountryPage() {
  const { country } = Route.useLoaderData();
  const matches = universities.filter((u) => u.countrySlug === country.slug);

  return (
    <>
      <PageHero
        eyebrow={`${country.flag} Study in ${country.name}`}
        title={`Study in ${country.name}`}
        description={country.overview}
      >
        <CounsellingButton variant="gold" size="lg" source={`country-${country.slug}`} />
      </PageHero>

      <Section>
        <BreadcrumbTrail
          items={[{ label: "Home", to: "/" }, { label: "Study Abroad", to: "/study-abroad" }, { label: country.name }]}
        />

        <div className="mt-8 grid gap-10 lg:grid-cols-3">
          <div className="space-y-10 lg:col-span-2">
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground">Why study in {country.name}?</h2>
              <ul className="mt-4 space-y-2.5">
                {country.whyStudy.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <InfoBlock title="Popular courses" items={country.popularCourses} />
            <InfoBlock title="Top universities (demo list)" items={country.universities} />
            <InfoBlock title="Scholarship opportunities" items={country.scholarships} />
            <InfoBlock title="Admission requirements" items={country.requirements} />

            <div>
              <h2 className="font-display text-2xl font-bold text-foreground">Student visa overview</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{country.visaOverview}</p>
              <h3 className="mt-6 text-base font-semibold text-foreground">Career prospects</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{country.careers}</p>
            </div>

            <Disclaimer />
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">Quick facts</h2>
              <dl className="mt-4 space-y-3 text-sm">
                <Fact label="Intakes" value={country.intakes.join(", ")} />
                <Fact label="Tuition" value={country.tuitionPlaceholder} />
                <Fact label="Living cost" value={country.livingCostPlaceholder} />
                <Fact label="Scholarships" value={country.scholarshipAvailability} />
                <Fact label="Study areas" value={country.popularAreas.join(", ")} />
              </dl>
            </div>
            <div className="rounded-2xl bg-gradient-navy p-6 text-navy-foreground shadow-lift">
              <h2 className="font-display text-lg font-bold">Planning for {country.name}?</h2>
              <p className="mt-2 text-sm text-navy-foreground/80">
                Get a shortlist of universities and scholarship options for your profile.
              </p>
              <CounsellingButton variant="gold" className="mt-5 w-full" source={`country-sidebar-${country.slug}`} />
            </div>
          </aside>
        </div>
      </Section>

      {matches.length ? (
        <Section tone="soft">
          <SectionHeading
            eyebrow="Universities"
            title={`Universities in ${country.name}`}
            description="Demo listings — replace with verified partner institutions."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {matches.map((university, index) => (
              <Reveal key={university.id} delay={index * 50}>
                <UniversityCard university={university} />
              </Reveal>
            ))}
          </div>
        </Section>
      ) : null}

      <Section>
        <SectionHeading eyebrow="FAQs" title={`Studying in ${country.name}`} />
        <FaqAccordion faqs={country.faqs} />
      </Section>

      <CtaBand
        title={`Ready to explore ${country.name}?`}
        description="Speak to a counsellor about universities, courses and scholarship options that match your academics and budget."
      />
    </>
  );
}

function InfoBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-foreground">{title}</h2>
      <ul className="mt-4 flex flex-wrap gap-2">
        {items.map((item) => (
          <li key={item} className="rounded-lg bg-secondary px-3 py-1.5 text-sm text-secondary-foreground">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 text-sm text-foreground">{value}</dd>
    </div>
  );
}

export const allCountrySlugs = countries.map((c) => c.slug);
