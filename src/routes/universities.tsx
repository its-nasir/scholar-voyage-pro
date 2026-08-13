import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { UniversityCard } from "@/components/cards";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { CtaBand, Disclaimer, PageHero, Section } from "@/components/sections";
import { CounsellingButton } from "@/components/CounsellingDialog";
import { Button } from "@/components/ui/button";
import { inputClass, selectClass } from "@/components/forms/fields";
import { universities } from "@/data/universities";
import { countries } from "@/data/countries";

const title = "University Directory | Dearm Scholars Abroad";
const description =
  "Search a directory of universities by country, degree level, course, budget and scholarship availability, and get shortlisting guidance for your profile.";

export const Route = createFileRoute("/universities")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/universities" },
    ],
    links: [{ rel: "canonical", href: "/universities" }],
  }),
  component: Universities,
});

const budgetBands = ["All", "Under 10 Lakh INR", "10 – 20 Lakh INR", "20 – 35 Lakh INR", "Above 35 Lakh INR"];

function Universities() {
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("All");
  const [level, setLevel] = useState("All");
  const [budget, setBudget] = useState("All");
  const [scholarshipOnly, setScholarshipOnly] = useState(false);

  const levels = useMemo(() => ["All", ...new Set(universities.flatMap((u) => u.degreeLevels))], []);

  const results = universities.filter((u) => {
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q ||
      u.name.toLowerCase().includes(q) ||
      u.location.toLowerCase().includes(q) ||
      u.country.toLowerCase().includes(q) ||
      u.popularCourses.some((c) => c.toLowerCase().includes(q));
    return (
      matchesQuery &&
      (country === "All" || u.countrySlug === country) &&
      (level === "All" || u.degreeLevels.includes(level)) &&
      (budget === "All" || u.budgetBand === budget) &&
      (!scholarshipOnly || u.scholarship)
    );
  });

  const reset = () => {
    setQuery("");
    setCountry("All");
    setLevel("All");
    setBudget("All");
    setScholarshipOnly(false);
  };

  return (
    <>
      <PageHero
        eyebrow="Universities"
        title="Searchable university directory"
        description="Filter by country, degree level, course, budget band and scholarship availability. Listings are demo data and will be replaced with verified institutions."
      >
        <CounsellingButton variant="gold" size="lg" source="universities-hero" />
      </PageHero>

      <Section>
        <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
          <div className="grid gap-3 lg:grid-cols-[2fr_1fr_1fr_1fr]">
            <label className="relative">
              <span className="sr-only">Search universities or courses</span>
              <Search
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search university, city or course"
                className={`${inputClass} pl-9`}
              />
            </label>
            <label>
              <span className="sr-only">Country</span>
              <select value={country} onChange={(e) => setCountry(e.target.value)} className={selectClass}>
                <option value="All">All countries</option>
                {countries.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span className="sr-only">Degree level</span>
              <select value={level} onChange={(e) => setLevel(e.target.value)} className={selectClass}>
                {levels.map((l) => (
                  <option key={l} value={l}>
                    {l === "All" ? "All degree levels" : l}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span className="sr-only">Budget</span>
              <select value={budget} onChange={(e) => setBudget(e.target.value)} className={selectClass}>
                {budgetBands.map((b) => (
                  <option key={b} value={b}>
                    {b === "All" ? "Any budget" : b}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <label className="flex items-center gap-2 text-sm text-foreground">
              <input
                type="checkbox"
                checked={scholarshipOnly}
                onChange={(e) => setScholarshipOnly(e.target.checked)}
                className="size-4 rounded border-input accent-primary"
              />
              Scholarship options only
            </label>
            <div className="flex items-center gap-3">
              <p aria-live="polite" className="text-sm text-muted-foreground">
                {results.length} {results.length === 1 ? "university" : "universities"}
              </p>
              <Button variant="ghost" size="sm" onClick={reset}>
                <X className="size-4" /> Reset
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((university, index) => (
            <Reveal key={university.id} delay={index * 40}>
              <UniversityCard university={university} />
            </Reveal>
          ))}
        </div>

        {results.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-border bg-secondary/50 p-8 text-center">
            <h2 className="text-base font-semibold text-foreground">No universities match your filters</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Try broadening your search, or ask a counsellor for a personalised shortlist.
            </p>
            <CounsellingButton variant="hero" className="mt-5" source="universities-empty" />
          </div>
        ) : null}

        <div className="mx-auto mt-12 max-w-3xl">
          <Disclaimer />
        </div>
      </Section>

      <Section tone="soft">
        <SectionHeading
          eyebrow="Shortlisting"
          title="How we help you shortlist"
          description="A balanced shortlist usually mixes ambitious, suitable and safe options based on your academics, budget and target intake."
        />
      </Section>

      <CtaBand />
    </>
  );
}
