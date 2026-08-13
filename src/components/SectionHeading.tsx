import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  as: As = "h2",
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  as?: "h1" | "h2" | "h3";
  children?: ReactNode;
}) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow ? (
        <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-secondary-foreground">
          {eyebrow}
        </p>
      ) : null}
      <As className="text-balance text-3xl font-bold leading-tight text-foreground sm:text-4xl">{title}</As>
      {description ? (
        <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">{description}</p>
      ) : null}
      {children}
    </div>
  );
}
