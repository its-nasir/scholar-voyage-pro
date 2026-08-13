import { Link } from "@tanstack/react-router";
import { siteConfig } from "@/config/site";
import logoAsset from "@/assets/dearmscholars-logo.png.asset.json";

/** Company logo mark with Dearm Scholars Abroad branding. */
export function Logo({ variant = "default" }: { variant?: "default" | "light" }) {
  const isLight = variant === "light";
  return (
    <Link to="/" className="group flex items-center gap-3" aria-label={`${siteConfig.name} home`}>
      <img
        src={logoAsset.url}
        alt={`${siteConfig.shortName} logo`}
        className="size-11 shrink-0 rounded-xl bg-white object-contain p-1 shadow-card"
      />
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
