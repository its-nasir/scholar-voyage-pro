import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, legalHead } from "@/components/LegalPage";
import { siteConfig } from "@/config/site";

export const Route = createFileRoute("/cookie-policy")({
  head: () =>
    legalHead({
      title: "Cookie Policy | Dream Scholars Abroad",
      description: "How cookies and similar technologies are used on the Dream Scholars Abroad website.",
      path: "/cookie-policy",
    }),
  component: () => (
    <LegalPage
      title="Cookie Policy"
      intro="This policy explains how cookies and similar technologies may be used on this website."
      sections={[
        {
          heading: "What cookies are",
          body: [
            "Cookies are small text files stored on your device that help a website function correctly and understand how visitors use it.",
          ],
        },
        {
          heading: "How we use them",
          body: [
            "Essential cookies keep the site working, for example by remembering form state during your visit.",
            "If analytics tools are added in future, they may set cookies that help us understand which pages are most useful to students. No advertising cookies are used.",
          ],
        },
        {
          heading: "Managing cookies",
          body: [
            "You can block or delete cookies in your browser settings. Some parts of the site may not work as expected if essential cookies are blocked.",
          ],
        },
        {
          heading: "Questions",
          body: [`For questions about this policy, contact ${siteConfig.contact.email}.`],
        },
      ]}
    />
  ),
});
