import { whatsappLink } from "@/config/site";

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.06c-.24.68-1.4 1.3-1.93 1.35-.53.05-1.02.07-2.6-.53-1.9-.72-3.16-2.6-3.26-2.73-.1-.13-.8-1.06-.8-2.03 0-.96.5-1.44.68-1.64.18-.2.4-.25.53-.25.13 0 .27 0 .38.01.13 0 .3-.05.47.36.17.4.6 1.45.65 1.56.05.1.08.23.01.36-.07.14-.11.22-.22.34-.11.13-.23.28-.33.38-.11.1-.22.22-.1.44.12.22.55.9 1.17 1.46.8.72 1.47.94 1.69 1.05.22.1.34.09.47-.05.13-.15.55-.64.7-.86.14-.22.29-.18.48-.11.19.07 1.22.58 1.43.68.21.11.35.16.4.25.05.09.05.53-.19 1.2Z" />
    </svg>
  );
}

/** Floating WhatsApp CTA — number is read from src/config/site.ts */
export function WhatsAppButton() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex size-14 items-center justify-center rounded-full bg-success text-success-foreground shadow-lift transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:bottom-7 sm:right-7"
    >
      <WhatsAppGlyph className="size-7" />
    </a>
  );
}

export { WhatsAppGlyph };
