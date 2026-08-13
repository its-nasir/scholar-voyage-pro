import { Link } from "@tanstack/react-router";
import { ArrowRight, Award, MapPin } from "lucide-react";
import { Icon } from "@/components/Icon";
import { Button } from "@/components/ui/button";
import type { Country } from "@/data/countries";
import type { University } from "@/data/universities";
import type { Scholarship } from "@/data/scholarships";
import type { Service } from "@/data/services";
import type { Testimonial } from "@/data/testimonials";
import type { CourseCategory } from "@/data/courses";

const cardBase =
  "group flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift";

export function CountryCard({ country }: { country: Country }) {
  return (
    <article className={cardBase}>
      <div className="flex items-start justify-between gap-3">
        <span className="grid size-12 place-items-center rounded-xl bg-sky text-2xl" aria-hidden="true">
          {country.flag}
        </span>
        <span className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-semibold text-secondary-foreground">
          {country.scholarshipAvailability}
        </span>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-foreground">{country.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{country.tagline}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {country.popularAreas.slice(0, 3).map((area) => (
          <span key={area} className="rounded-md bg-secondary px-2 py-1 text-[11px] font-medium text-secondary-foreground">
            {area}
          </span>
        ))}
      </div>
      <div className="mt-5 pt-1">
        <Button asChild variant="outline" size="sm">
          <Link to="/study-abroad/$country" params={{ country: country.slug }}>
            Explore Country <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Button>
      </div>
    </article>
  );
}

export function UniversityCard({ university }: { university: University }) {
  return (
    <article className={cardBase}>
      <div className="flex items-center gap-3">
        <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-gradient-royal font-display text-sm font-bold text-primary-foreground">
          {university.logoText}
        </span>
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold text-foreground">{university.name}</h3>
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="size-3.5" aria-hidden="true" />
            {university.location}, {university.country}
          </p>
        </div>
      </div>
      <dl className="mt-4 space-y-2 text-sm">
        <div className="flex gap-2">
          <dt className="w-28 shrink-0 text-muted-foreground">Degrees</dt>
          <dd className="text-foreground">{university.degreeLevels.join(", ")}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="w-28 shrink-0 text-muted-foreground">Courses</dt>
          <dd className="text-foreground">{university.popularCourses.join(", ")}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="w-28 shrink-0 text-muted-foreground">Type</dt>
          <dd className="text-foreground">{university.type}</dd>
        </div>
      </dl>
      <div className="mt-4 flex items-center gap-2">
        {university.scholarship ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-gold/15 px-2.5 py-1 text-[11px] font-semibold text-gold-foreground">
            <Award className="size-3.5" aria-hidden="true" /> Scholarship options
          </span>
        ) : (
          <span className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium text-secondary-foreground">
            Scholarship: enquire
          </span>
        )}
      </div>
      <div className="mt-5 pt-1">
        <Button asChild variant="outline" size="sm">
          <Link to="/study-abroad/$country" params={{ country: university.countrySlug }}>
            View University <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    </article>
  );
}

export function ScholarshipCard({ scholarship }: { scholarship: Scholarship }) {
  return (
    <article className={cardBase}>
      <span className="w-fit rounded-full bg-secondary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
        Demo content
      </span>
      <h3 className="mt-3 text-base font-semibold text-foreground">{scholarship.name}</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        {scholarship.provider} · {scholarship.country}
      </p>
      <dl className="mt-4 space-y-2 text-sm">
        <Row label="Degree level" value={scholarship.degreeLevel} />
        <Row label="Funding" value={scholarship.fundingType} />
        <Row label="Eligibility" value={scholarship.eligibility} />
        <Row label="Deadline" value={scholarship.deadline} />
      </dl>
      <div className="mt-5 pt-1">
        <Button asChild variant="outline" size="sm">
          <Link to="/scholarships" hash="eligibility">
            View Details <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    </article>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2">
      <dt className="w-28 shrink-0 text-muted-foreground">{label}</dt>
      <dd className="text-foreground">{value}</dd>
    </div>
  );
}

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className={cardBase}>
      <span className="grid size-12 place-items-center rounded-xl bg-sky text-sky-foreground">
        <Icon name={service.icon} className="size-6" />
      </span>
      <h3 className="mt-4 text-base font-semibold text-foreground">{service.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{service.short}</p>
      <div className="mt-5">
        <Button asChild variant="ghost" size="sm" className="px-0 text-primary hover:bg-transparent hover:underline">
          <Link to="/services/$service" params={{ service: service.slug }}>
            Learn More <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    </article>
  );
}

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article className={cardBase}>
      <span className="w-fit rounded-full bg-secondary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
        Demo testimonial
      </span>
      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground">“{testimonial.quote}”</blockquote>
      <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
        <span
          className="grid size-11 place-items-center rounded-full bg-gradient-royal text-sm font-semibold text-primary-foreground"
          aria-hidden="true"
        >
          {testimonial.initials}
        </span>
        <div className="min-w-0 text-sm">
          <p className="font-semibold text-foreground">{testimonial.name}</p>
          <p className="truncate text-xs text-muted-foreground">
            {testimonial.course} · {testimonial.university}, {testimonial.country}
          </p>
        </div>
      </div>
    </article>
  );
}

export function CourseCard({ category }: { category: CourseCategory }) {
  return (
    <article className={cardBase}>
      <span className="grid size-12 place-items-center rounded-xl bg-sky text-sky-foreground">
        <Icon name={category.icon} className="size-6" />
      </span>
      <h3 className="mt-4 text-base font-semibold text-foreground">{category.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{category.short}</p>
      <ul className="mt-4 flex flex-wrap gap-1.5">
        {category.examples.slice(0, 3).map((example) => (
          <li key={example} className="rounded-md bg-secondary px-2 py-1 text-[11px] font-medium text-secondary-foreground">
            {example}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-muted-foreground">Popular in: {category.destinations.join(", ")}</p>
    </article>
  );
}
