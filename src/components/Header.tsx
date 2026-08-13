import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, Phone } from "lucide-react";
import { Logo } from "@/components/Logo";
import { CounsellingButton } from "@/components/CounsellingDialog";
import { WhatsAppGlyph } from "@/components/WhatsAppButton";
import { navLinks, siteConfig, whatsappLink } from "@/config/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="hidden bg-navy text-navy-foreground lg:block">
        <div className="container-page flex h-9 items-center justify-between text-xs">
          <p className="text-navy-foreground/80">{siteConfig.tagline}</p>
          <div className="flex items-center gap-5">
            <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-1.5 hover:text-gold">
              <Phone className="size-3.5" aria-hidden="true" /> {siteConfig.contact.phone}
            </a>
            <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-gold">
              {siteConfig.contact.email}
            </a>
          </div>
        </div>
      </div>

      <div
        className={`border-b transition-all duration-300 ${
          scrolled ? "border-border bg-background/95 shadow-card backdrop-blur" : "border-transparent bg-background"
        }`}
      >
        <div className="container-page flex h-16 items-center justify-between gap-4 lg:h-18">
          <Logo />

          <nav aria-label="Main navigation" className="hidden items-center gap-0.5 xl:flex">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="rounded-md px-2.5 py-2 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                activeProps={{ className: "bg-secondary text-foreground" }}
                activeOptions={{ exact: link.to === "/" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="hidden size-10 items-center justify-center rounded-lg border border-border text-success transition-colors hover:bg-success/10 sm:inline-flex"
            >
              <WhatsAppGlyph className="size-5" />
            </a>
            <CounsellingButton variant="hero" className="hidden sm:inline-flex" source="header" />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="inline-flex size-10 items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:bg-secondary xl:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {open ? (
          <div className="border-t border-border bg-background xl:hidden">
            <nav aria-label="Mobile navigation" className="container-page grid gap-1 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="rounded-lg px-3 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                  activeProps={{ className: "bg-secondary" }}
                  activeOptions={{ exact: link.to === "/" }}
                >
                  {link.label}
                </Link>
              ))}
              <CounsellingButton variant="hero" size="lg" className="mt-3 w-full" source="mobile-menu" />
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-success/40 text-sm font-semibold text-success"
              >
                <WhatsAppGlyph className="size-5" /> Chat on WhatsApp
              </a>
            </nav>
          </div>
        ) : null}
      </div>
    </header>
  );
}
