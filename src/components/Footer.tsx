import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";
import { Logo } from "@/components/Logo";
import { countries } from "@/data/countries";
import { siteConfig } from "@/config/site";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Study Abroad", to: "/study-abroad" },
  { label: "Scholarships", to: "/scholarships" },
  { label: "Universities", to: "/universities" },
  { label: "Services", to: "/services" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
] as const;

const supportLinks = [
  { label: "Free Counselling", to: "/contact" },
  { label: "Scholarship Guidance", to: "/scholarships" },
  { label: "Application Support", to: "/services" },
  { label: "Visa Guidance", to: "/services" },
] as const;

const legalLinks = [
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Terms & Conditions", to: "/terms" },
  { label: "Disclaimer", to: "/disclaimer" },
  { label: "Cookie Policy", to: "/cookie-policy" },
] as const;

const socials = [
  { label: "Facebook", href: siteConfig.social.facebook, Icon: Facebook },
  { label: "Instagram", href: siteConfig.social.instagram, Icon: Instagram },
  { label: "LinkedIn", href: siteConfig.social.linkedin, Icon: Linkedin },
  { label: "YouTube", href: siteConfig.social.youtube, Icon: Youtube },
  { label: "X", href: siteConfig.social.twitter, Icon: Twitter },
];

export function Footer() {
  return (
    <footer className="mt-24 bg-navy text-navy-foreground">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Logo variant="light" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-navy-foreground/75">
            {siteConfig.shortName} is an overseas education consultancy guiding students towards suitable
            universities, courses and scholarship opportunities abroad.
          </p>
          <p className="mt-4 text-sm text-navy-foreground/75">
            <span className="font-semibold text-navy-foreground">{siteConfig.founder.role}:</span>{" "}
            {siteConfig.founder.name}
          </p>
          <ul className="mt-5 space-y-2.5 text-sm text-navy-foreground/75">
            <li className="flex gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
              <span>{siteConfig.contact.addressLines.join(", ")}</span>
            </li>
            <li className="flex gap-2.5">
              <Phone className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
              <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`} className="hover:text-gold">
                {siteConfig.contact.phone}
              </a>
            </li>
            <li className="flex gap-2.5">
              <Mail className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
              <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-gold">
                {siteConfig.contact.email}
              </a>
            </li>
          </ul>
          <div className="mt-6 flex gap-2">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="grid size-9 place-items-center rounded-lg border border-navy-foreground/20 text-navy-foreground/80 transition-colors hover:border-gold hover:text-gold"
              >
                <Icon className="size-4" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <FooterColumn title="Quick Links">
          {quickLinks.map((l) => (
            <FooterLink key={l.label} to={l.to} label={l.label} />
          ))}
        </FooterColumn>

        <FooterColumn title="Countries">
          {countries.slice(0, 8).map((c) => (
            <li key={c.slug}>
              <Link
                to="/study-abroad/$country"
                params={{ country: c.slug }}
                className="text-sm text-navy-foreground/75 transition-colors hover:text-gold"
              >
                {c.name}
              </Link>
            </li>
          ))}
        </FooterColumn>

        <div className="space-y-8">
          <FooterColumn title="Support">
            {supportLinks.map((l) => (
              <FooterLink key={l.label} to={l.to} label={l.label} />
            ))}
          </FooterColumn>
          <FooterColumn title="Legal">
            {legalLinks.map((l) => (
              <FooterLink key={l.label} to={l.to} label={l.label} />
            ))}
          </FooterColumn>
        </div>
      </div>

      <div className="border-t border-navy-foreground/12">
        <div className="container-page py-6">
          <p className="text-xs leading-relaxed text-navy-foreground/60">{siteConfig.disclaimer}</p>
          <p className="mt-3 text-xs text-navy-foreground/70">
            © 2026 {siteConfig.name} All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-gold">{title}</h3>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({ to, label }: { to: string; label: string }) {
  return (
    <li>
      <Link to={to} className="text-sm text-navy-foreground/75 transition-colors hover:text-gold">
        {label}
      </Link>
    </li>
  );
}
