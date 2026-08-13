import { createFileRoute } from "@tanstack/react-router";
import counselling from "@/assets/counselling.jpg";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { CtaBand, Disclaimer, PageHero, Section } from "@/components/sections";
import { CounsellingButton } from "@/components/CounsellingDialog";
import { whyChooseUs } from "@/data/services";
import { siteConfig } from "@/config/site";

const title = "About Us | Dearm Scholars Abroad Pvt. Ltd.";
const description =
  "Learn about Dearm Scholars Abroad Pvt. Ltd., our mission to guide students towards global education, and founder Md Tahir Hussain.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

const values = [
  { icon: "userCheck", title: "Student First", text: "Recommendations are based on your profile and goals, never on convenience." },
  { icon: "shield", title: "Transparency", text: "Clear information about requirements, timelines and what is outside our control." },
  { icon: "award", title: "Integrity", text: "No guaranteed admission or visa claims — only honest, verifiable guidance." },
  { icon: "lifeBuoy", title: "Long-term Support", text: "Support that continues from counselling through to pre-departure." },
];

function About() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Guiding students towards global education"
        description={siteConfig.description}
      >
        <CounsellingButton variant="gold" size="lg" source="about-hero" />
      </PageHero>

      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <img
            src={counselling}
            alt="Counsellor guiding a student through study abroad options"
            width={1200}
            height={900}
            loading="lazy"
            className="rounded-3xl shadow-lift"
          />
          <div>
            <SectionHeading
              align="left"
              eyebrow="Who We Are"
              title="An overseas education consultancy focused on informed decisions"
              description="Dearm Scholars Abroad Pvt. Ltd. supports students who want to study abroad — from understanding suitable destinations and courses, to preparing applications, exploring scholarship opportunities and planning for departure."
            />
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
                <h3 className="text-sm font-semibold text-foreground">Our Mission</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  To make quality international education accessible through honest counselling and structured
                  application support.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
                <h3 className="text-sm font-semibold text-foreground">Our Vision</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  To be a consultancy students trust for clear guidance at every stage of their study abroad journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="soft">
        <div className="grid gap-10 rounded-3xl border border-border bg-card p-8 shadow-card lg:grid-cols-[auto_1fr] lg:p-12">
          <div className="grid size-28 place-items-center rounded-2xl bg-gradient-royal font-display text-3xl font-bold text-primary-foreground">
            MTH
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              {siteConfig.founder.role}
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold text-foreground">{siteConfig.founder.name}</h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">{siteConfig.founder.bio}</p>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Our Values" title="What guides our guidance" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <Reveal key={value.title} delay={index * 60}>
              <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-card">
                <Icon name={value.icon} className="size-6 text-primary" />
                <h3 className="mt-3 text-sm font-semibold text-foreground">{value.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{value.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="soft">
        <SectionHeading eyebrow="How We Help" title="Support across your journey" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whyChooseUs.map((item, index) => (
            <Reveal key={item.title} delay={index * 50}>
              <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-card">
                <Icon name={item.icon} className="size-6 text-primary" />
                <h3 className="mt-3 text-sm font-semibold text-foreground">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mx-auto mt-10 max-w-3xl">
          <Disclaimer />
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
