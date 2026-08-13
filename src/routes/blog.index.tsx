import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { CtaBand, PageHero, Section } from "@/components/sections";
import { blogCategories, blogPosts } from "@/data/blog";

const title = "Study Abroad Blog & Guides | Dream Scholars Abroad";
const description =
  "Articles and guides on study destinations, scholarships, English tests, university applications, visas and student life abroad.";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const [category, setCategory] = useState("All");
  const posts = category === "All" ? blogPosts : blogPosts.filter((p) => p.category === category);

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Study abroad insights and guides"
        description="Practical, jargon-free articles to help you plan your application with confidence."
      />

      <Section>
        <SectionHeading eyebrow="Articles" title="Latest articles" />
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {["All", ...blogCategories].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              aria-pressed={category === item}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                category === item
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <Reveal key={post.slug} delay={index * 40}>
              <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                <span className="w-fit rounded-full bg-sky px-2.5 py-1 text-[11px] font-semibold text-sky-foreground">
                  {post.category}
                </span>
                <h2 className="mt-3 text-base font-semibold text-foreground">{post.title}</h2>
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

        {posts.length === 0 ? (
          <p className="mt-12 text-center text-sm text-muted-foreground">
            No articles in this category yet. New guides are published regularly.
          </p>
        ) : null}
      </Section>

      <CtaBand />
    </>
  );
}
