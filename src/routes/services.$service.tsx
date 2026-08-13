import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Icon } from "@/components/Icon";
import { BreadcrumbTrail, CtaBand, Disclaimer, PageHero, Section } from "@/components/sections";
import { CounsellingButton } from "@/components/CounsellingDialog";
import { services, serviceBySlug } from "@/data/services";

export const Route = createFileRoute("/services/$service")({
  loader: ({ params }) => {
    const service = serviceBySlug(params.service);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Service unavailable" }, { name: "robots", content: "noindex" }] };
    }
    const t = `${loaderData.service.title} | Dream Scholars Abroad`;
    return {
      meta: [
        { title: t },
        { name: "description", content: loaderData.service.short },
        { property: "og:title", content: t },
        { property: "og:description", content: loaderData.service.short },
        { property: "og:type", content: "article" },
      ],
    };
  },
  component: ServiceDetail,
});

function ServiceDetail() {
  const { service } = Route.useLoaderData();
  const others = services.filter((s) => s.slug !== service.slug).slice(0, 4);

  return (
    <>
      <PageHero eyebrow="Service" title={service.title} description={service.short}>
        <CounsellingButton variant="gold" size="lg" source={`service-${service.slug}`} />
      </PageHero>

      <Section>
        <BreadcrumbTrail
          items={[{ label: "Home", to: "/" }, { label: "Services", to: "/services" }, { label: service.title }]}
        />
        <div className="mt-8 grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <span className="grid size-14 place-items-center rounded-2xl bg-sky text-sky-foreground">
              <Icon name={service.icon} className="size-7" />
            </span>
            <h2 className="mt-6 font-display text-2xl font-bold text-foreground">What this includes</h2>
            <ul className="mt-4 space-y-3">
              {service.details.map((detail) => (
                <li key={detail} className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
                  {detail}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Disclaimer />
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                Other services
              </h2>
              <ul className="mt-4 space-y-3">
                {others.map((other) => (
                  <li key={other.slug}>
                    <Link
                      to="/services/$service"
                      params={{ service: other.slug }}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                    >
                      {other.title} <ArrowRight className="size-3.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
