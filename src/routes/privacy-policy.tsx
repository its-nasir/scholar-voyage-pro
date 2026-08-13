import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, legalHead } from "@/components/LegalPage";
import { siteConfig } from "@/config/site";

export const Route = createFileRoute("/privacy-policy")({
  head: () =>
    legalHead({
      title: "Privacy Policy | Dream Scholars Abroad",
      description:
        "How Dream Scholars Abroad Pvt. Ltd. collects, uses and protects the information you share through enquiry and counselling forms.",
      path: "/privacy-policy",
    }),
  component: () => (
    <LegalPage
      title="Privacy Policy"
      intro={`This policy explains how ${siteConfig.name} handles the information you share with us.`}
      sections={[
        {
          heading: "Information we collect",
          body: [
            "We collect the details you submit through our enquiry, counselling and scholarship eligibility forms — typically your name, phone number, email address, preferred destination, degree level and academic details.",
            "We do not ask for payment card details or sensitive identity documents through this website.",
          ],
        },
        {
          heading: "How we use your information",
          body: [
            "Your information is used to respond to your enquiry, provide counselling, and share guidance on universities, courses and scholarship options relevant to your profile.",
            "We may contact you by phone, email or WhatsApp using the details you provide.",
          ],
        },
        {
          heading: "Sharing of information",
          body: [
            "Details may be shared with universities or institutions only when required to progress an application you have asked us to support.",
            "We do not sell your personal information.",
          ],
        },
        {
          heading: "Data retention and security",
          body: [
            "Information is retained only for as long as needed to provide guidance or as required by applicable law, and reasonable measures are taken to protect it.",
          ],
        },
        {
          heading: "Your choices",
          body: [
            `You may request access to, correction of, or deletion of your details by writing to ${siteConfig.contact.email}.`,
          ],
        },
      ]}
    />
  ),
});
