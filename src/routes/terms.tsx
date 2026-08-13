import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, legalHead } from "@/components/LegalPage";
import { siteConfig } from "@/config/site";

export const Route = createFileRoute("/terms")({
  head: () =>
    legalHead({
      title: "Terms & Conditions | Dream Scholars Abroad",
      description:
        "Terms and conditions for using the Dream Scholars Abroad Pvt. Ltd. website and consultancy services.",
      path: "/terms",
    }),
  component: () => (
    <LegalPage
      title="Terms & Conditions"
      intro={`By using this website or engaging ${siteConfig.name} for guidance, you agree to the terms below.`}
      sections={[
        {
          heading: "Nature of our services",
          body: [
            "We provide overseas education counselling, university and course guidance, application support and information about scholarship and visa processes.",
            "We are not a university, scholarship provider or immigration authority, and we do not make admission, funding or visa decisions.",
          ],
        },
        {
          heading: "No guarantees",
          body: [
            "We do not guarantee admission, scholarship awards, visa approval, employment or any specific outcome. Requirements and policies of institutions and authorities may change without notice.",
          ],
        },
        {
          heading: "Your responsibilities",
          body: [
            "You agree to provide accurate and complete information. Submitting incorrect or incomplete documentation may affect your application.",
            "You remain responsible for reviewing offer conditions, deadlines and official requirements before making decisions or payments.",
          ],
        },
        {
          heading: "Website content",
          body: [
            "Content on this website — including sample university, course and scholarship listings — is for general information only and may include demo data. Always verify details with the official source.",
          ],
        },
        {
          heading: "Contact",
          body: [`Questions about these terms can be sent to ${siteConfig.contact.email}.`],
        },
      ]}
    />
  ),
});
