import { Link } from "@tanstack/react-router";
import { siteConfig } from "@/config/site";

/** Logo concept using the DSA initials inside a graduation-shield mark. */
export function Logo({ variant = "default" }: { variant?: "default" | "light" }) {
  const isLight = variant === "light";
  return (
    <Link to="/" className="group flex items-center gap-3" aria-label={`${siteConfig.name} home`}>
      <span className="relative grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-royal shadow-card">
        <span className="font-display text-sm font-bold tracking-tight text-primary-foreground">DSA</span>
        <span className="absolute -bottom-1 left-1/2 h-1 w-6 -translate-x-1/2 rounded-full bg-gradient-gold" />
      </span>
      <span className="flex min-w-0 flex-col leading-tight">
        <span
          className={`font-display text-[15px] font-bold tracking-tight ${isLight ? "text-navy-foreground" : "text-foreground"}`}
        >
          Dearm Scholars Abroad
        </span>
        <span className={`text-[11px] ${isLight ? "text-navy-foreground/70" : "text-muted-foreground"}`}>
          Pvt. Ltd. · Overseas Education
        </span>
      </span>
    </Link>
  );
}
