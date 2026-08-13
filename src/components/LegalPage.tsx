import { PageHero, Section } from "@/components/sections";

export function legalHead({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: path },
    ],
    links: [{ rel: "canonical", href: path }],
  };
}

export function LegalPage({
  title,
  intro,
  sections,
}: {
  title: string;
  intro: string;
  sections: { heading: string; body: string[] }[];
}) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} description={intro} />
      <Section>
        <div className="mx-auto max-w-3xl space-y-10">
          {sections.map((section) => (
            <div key={section.heading}>
              <h2 className="font-display text-xl font-bold text-foreground">{section.heading}</h2>
              <div className="mt-3 space-y-3">
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="text-sm leading-relaxed text-muted-foreground">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
          <p className="text-xs text-muted-foreground">
            This page is a general template and should be reviewed by a qualified professional before publishing.
          </p>
        </div>
      </Section>
    </>
  );
}
