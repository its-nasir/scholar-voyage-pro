import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import heroImage from "@/assets/hero-students.jpg";
import { Button } from "@/components/ui/button";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { CounsellingButton } from "@/components/CounsellingDialog";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { AdmissionProcess, CtaBand, FaqAccordion, Section } from "@/components/sections";
import { CountryCard, CourseCard, ScholarshipCard, ServiceCard, TestimonialCard } from "@/components/cards";
import { countries } from "@/data/countries";
import { courseCategories } from "@/data/courses";
import { generalFaqs } from "@/data/faqs";
import { scholarships } from "@/data/scholarships";
import { services, trustIndicators, whyChooseUs } from "@/data/services";
import { testimonials } from "@/data/testimonials";
import { blogPosts } from "@/data/blog";
import { siteConfig } from "@/config/site";

const title = "Study Abroad Consultancy | Dream Scholars Abroad Pvt. Ltd.";
const description =
  "Personalised study abroad counselling, university shortlisting, scholarship guidance and visa support for students planning to study in the UK, USA, Canada, Australia, Europe and more.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy text-navy-foreground">
        <img
          src={heroImage}
          alt="International students on a university campus"
          width={1600}
          height={1000}
          className="absolute inset-0 size-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-navy opacity-80" aria-hidden="true" />
        <BackgroundPaths className="text-gold/70" />
        <div
          className="absolute -top-40 left-1/2 size-[38rem] -translate-x-1/2 rounded-full bg-royal/25 blur-[120px]"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-32 right-0 size-[26rem] rounded-full bg-gold/15 blur-[110px]"
          aria-hidden="true"
        />
        <div className="container-page relative grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-2">
          <div className="animate-fade-up">
            <p className="inline-flex rounded-full border border-navy-foreground/25 bg-navy-foreground/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-gold">
              {siteConfig.altTagline}
            </p>
            <h1 className="mt-5 text-balance text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl">
              {siteConfig.tagline}
            </h1>
            <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-navy-foreground/85 sm:text-lg">
              {siteConfig.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CounsellingButton variant="gold" size="lg" source="hero" />
              <Button asChild variant="onNavy" size="lg">
                <Link to="/study-abroad">
                  Explore Destinations <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
              {trustIndicators.map((item) => (
                <li key={item.label} className="flex items-center gap-2 text-sm text-navy-foreground/85">
                  <Icon name={item.icon} className="size-4 text-gold" />
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-navy-foreground/15 bg-card p-6 shadow-lift sm:p-7">
            <h2 className="font-display text-lg font-bold text-foreground">Free Profile Enquiry</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Share your details and a counsellor will get back to you.
            </p>
            <div className="mt-5">
              <EnquiryForm source="home-hero" />
            </div>
          </div>
        </div>
      </section>

      <Section tone="soft">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Why Choose Us"
              title="Guidance built around your profile, not a template"
              description="From the first counselling session to pre-departure preparation, we help you make informed decisions at each step."
            />
            <Button asChild variant="hero" size="lg" className="mt-7">
              <Link to="/about">
                About Dream Scholars Abroad <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {whyChooseUs.map((item, index) => (
              <Reveal key={item.title} delay={index * 60}>
                <div className="h-full rounded-2xl border border-border bg-card p-5 shadow-card">
                  <Icon name={item.icon} className="size-6 text-primary" />
                  <h3 className="mt-3 text-sm font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Study Destinations"
          title="Choose from 10+ study abroad destinations"
          description="Compare universities, popular courses, intakes and scholarship availability across leading destinations."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {countries.slice(0, 6).map((country, index) => (
            <Reveal key={country.slug} delay={index * 50}>
              <CountryCard country={country} />
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button asChild variant="outline" size="lg">
            <Link to="/study-abroad">
              View All Destinations <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </Section>

      <Section tone="soft">
        <SectionHeading
          eyebrow="Our Services"
          title="End-to-end support for your application"
          description="Counselling, documentation, applications, scholarships and visa guidance under one roof."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((service, index) => (
            <Reveal key={service.slug} delay={index * 50}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button asChild variant="outline" size="lg">
            <Link to="/services">
              All Services <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Scholarships"
          title="Scholarship guidance for eligible students"
          description="Sample scholarship formats shown below as demo content. Check your eligibility and we will guide you towards suitable options."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {scholarships.slice(0, 3).map((scholarship, index) => (
            <Reveal key={scholarship.id} delay={index * 50}>
              <ScholarshipCard scholarship={scholarship} />
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button asChild variant="hero" size="lg">
            <Link to="/scholarships">
              Check Scholarship Eligibility <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </Section>

      <Section tone="soft">
        <SectionHeading
          eyebrow="Courses"
          title="Popular course categories"
          description="Explore study areas that international students commonly choose across destinations."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courseCategories.slice(0, 6).map((category, index) => (
            <Reveal key={category.slug} delay={index * 50}>
              <CourseCard category={category} />
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button asChild variant="outline" size="lg">
            <Link to="/courses">
              Browse Courses <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </Section>

      <AdmissionProcess />

      <Section>
        <SectionHeading
          eyebrow="Success Stories"
          title="Student experiences"
          description="Placeholder testimonials shown for layout purposes — real, consented stories will be published here."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <Reveal key={testimonial.id} delay={index * 50}>
              <TestimonialCard testimonial={testimonial} />
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button asChild variant="outline" size="lg">
            <Link to="/success-stories">
              More Stories <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </Section>

      <Section tone="soft">
        <SectionHeading
          eyebrow="From the Blog"
          title="Study abroad insights and guides"
          description="Practical articles on destinations, scholarships, tests and applications."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {blogPosts.slice(0, 3).map((post, index) => (
            <Reveal key={post.slug} delay={index * 50}>
              <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                <span className="w-fit rounded-full bg-sky px-2.5 py-1 text-[11px] font-semibold text-sky-foreground">
                  {post.category}
                </span>
                <h3 className="mt-3 text-base font-semibold text-foreground">{post.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
                <p className="mt-4 text-xs text-muted-foreground">
                  {new Date(post.date).toLocaleDateString("en-IN", { dateStyle: "medium" })} · {post.readingTime}
                </p>
                <Link
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                >
                  Read article <ArrowRight className="size-4" />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="FAQs" title="Frequently asked questions" />
        <FaqAccordion faqs={generalFaqs.slice(0, 6)} />
        <div className="mx-auto mt-8 flex max-w-3xl items-center gap-2 text-sm text-muted-foreground">
          <CheckCircle2 className="size-4 text-success" aria-hidden="true" />
          Still have questions? Book a free counselling session.
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
