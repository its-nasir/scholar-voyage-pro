import { createFileRoute } from "@tanstack/react-router";
import { CourseCard } from "@/components/cards";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { CtaBand, Disclaimer, PageHero, Section } from "@/components/sections";
import { CounsellingButton } from "@/components/CounsellingDialog";
import { courseCategories } from "@/data/courses";

const title = "Courses & Study Areas | Dream Scholars Abroad";
const description =
  "Explore popular study areas abroad including business, computer science, engineering, healthcare, data science and more, with guidance on choosing the right course.";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/courses" },
    ],
    links: [{ rel: "canonical", href: "/courses" }],
  }),
  component: Courses,
});

function Courses() {
  return (
    <>
      <PageHero
        eyebrow="Courses"
        title="Find a course that matches your goals"
        description="Course choice affects admission chances, scholarship eligibility and career outcomes. We help you match your academic background with suitable programmes."
      >
        <CounsellingButton variant="gold" size="lg" source="courses-hero" />
      </PageHero>

      <Section>
        <SectionHeading eyebrow="Study Areas" title="Popular course categories" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courseCategories.map((category, index) => (
            <Reveal key={category.slug} delay={index * 40}>
              <CourseCard category={category} />
            </Reveal>
          ))}
        </div>
        <div className="mx-auto mt-12 max-w-3xl">
          <Disclaimer />
        </div>
      </Section>

      <CtaBand
        title="Unsure which course to pick?"
        description="A counsellor can map your academic background and career goals to suitable programmes and destinations."
      />
    </>
  );
}
