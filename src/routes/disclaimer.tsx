import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, legalHead } from "@/components/LegalPage";
import { siteConfig } from "@/config/site";

export const Route = createFileRoute("/disclaimer")({
  head: () =>
    legalHead({
      title: "Disclaimer | Dearm Scholars Abroad",
      description:
        "Important disclaimer about admission, scholarship and visa decisions, and about sample content published on this website.",
      path: "/disclaimer",
    }),
  component: () => (
    <LegalPage
      title="Disclaimer"
      intro={siteConfig.disclaimer}
      sections={[
        {
          heading: "Information accuracy",
          body: [
            "University listings, course details, scholarship examples, fee ranges and living cost estimates on this website may be illustrative or placeholder content and can change at any time.",
            "Always confirm current requirements, fees and deadlines with the university, scholarship provider or official government source.",
          ],
        },
        {
          heading: "No professional immigration advice",
          body: [
            "Visa guidance provided on this website and during counselling is general information based on publicly available processes. It is not legal or immigration advice.",
          ],
        },
        {
          heading: "Testimonials",
          body: [
            "Testimonials reflect individual student experiences. Outcomes differ from student to student and are not indicative of future results.",
          ],
        },
        {
          heading: "External links",
          body: [
            "This website may link to third-party websites. We are not responsible for the content or accuracy of external sites.",
          ],
        },
      ]}
    />
  ),
});
