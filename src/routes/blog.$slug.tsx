import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { BreadcrumbTrail, CtaBand, Disclaimer, Section } from "@/components/sections";
import { blogPosts, postBySlug } from "@/data/blog";
import { siteConfig } from "@/config/site";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = postBySlug(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Article not found" }, { name: "robots", content: "noindex" }] };
    }
    const { post } = loaderData;
    return {
      meta: [
        { title: `${post.title} | Dream Scholars Abroad Blog` },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/blog/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/blog/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.date,
            articleSection: post.category,
            publisher: { "@type": "Organization", name: siteConfig.name },
          }),
        },
      ],
    };
  },
  component: BlogPostPage,
});

function BlogPostPage() {
  const { post } = Route.useLoaderData();
  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <Section>
        <div className="mx-auto max-w-3xl">
          <BreadcrumbTrail
            items={[{ label: "Home", to: "/" }, { label: "Blog", to: "/blog" }, { label: post.category }]}
          />
          <span className="mt-6 inline-flex rounded-full bg-sky px-2.5 py-1 text-[11px] font-semibold text-sky-foreground">
            {post.category}
          </span>
          <h1 className="mt-4 text-balance font-display text-3xl font-bold leading-tight text-foreground sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            {new Date(post.date).toLocaleDateString("en-IN", { dateStyle: "long" })} · {post.readingTime}
          </p>
          <div className="mt-8 space-y-5">
            {post.body.map((paragraph) => (
              <p key={paragraph} className="text-base leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="mt-10">
            <Disclaimer />
          </div>
        </div>
      </Section>

      <Section tone="soft">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-xl font-bold text-foreground">More articles</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {related.map((item) => (
              <article key={item.slug} className="rounded-2xl border border-border bg-card p-5 shadow-card">
                <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                <Link
                  to="/blog/$slug"
                  params={{ slug: item.slug }}
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                >
                  Read <ArrowRight className="size-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
