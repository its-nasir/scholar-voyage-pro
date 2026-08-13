/**
 * Central site configuration.
 * EDIT THIS FILE to update company contact details, WhatsApp number,
 * social links and founder information. No UI changes required.
 */

export const WHATSAPP_NUMBER = "447346595831"; // full number with country code, digits only
export const WHATSAPP_MESSAGE =
  "Hello Dream Scholars Abroad, I would like to know more about studying abroad and scholarship opportunities.";

export const siteConfig = {
  name: "Dream Scholars Abroad Pvt. Ltd.",
  shortName: "Dream Scholars Abroad",
  initials: "DSA",
  tagline: "Your Dream. Our Guidance. Your Future Abroad.",
  altTagline: "Guiding Students Towards Global Education.",
  description:
    "Dream Scholars Abroad Pvt. Ltd. helps students explore study abroad opportunities, universities, courses and scholarship guidance with personalized counselling and application support.",
  // PLACEHOLDERS — replace with verified company details
  contact: {
    addressLines: ["Office address to be updated", "City, State, PIN"],
    phone: "+44 7388 216 063",
    email: "info@example.com",
    whatsapp: WHATSAPP_NUMBER,
    workingHours: "Monday – Saturday, 10:00 AM – 6:00 PM",
    mapsEmbedUrl: "", // PLACEHOLDER: paste Google Maps embed URL
  },
  social: {
    facebook: "#",
    instagram: "#",
    linkedin: "#",
    youtube: "#",
    twitter: "#",
  },
  founder: {
    name: "Md Tahir Hussain",
    role: "Founder & Director",
    photoUrl: "", // PLACEHOLDER: add professional photograph URL
    bio: "Md Tahir Hussain, Founder & Director of Dream Scholars Abroad Pvt. Ltd., is committed to helping students access quality international education and make confident decisions about their academic and career journey.",
    // Keep the fields below editable — do not publish unverified claims.
    qualifications: [] as string[],
    experience: "",
  },
  disclaimer:
    "Admission, scholarship and visa decisions are subject to the respective university, scholarship provider and immigration authorities. Requirements and policies may change.",
} as const;

export function whatsappLink(message: string = WHATSAPP_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const navLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Study Abroad", to: "/study-abroad" },
  { label: "Scholarships", to: "/scholarships" },
  { label: "Universities", to: "/universities" },
  { label: "Courses", to: "/courses" },
  { label: "Services", to: "/services" },
  { label: "Success Stories", to: "/success-stories" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
] as const;

export const intakes = ["January 2027", "May 2027", "September 2027", "Not decided yet"];
export const degreeLevels = ["Bachelors", "Masters", "MBA", "PhD", "Diploma / Foundation"];
export const englishTestOptions = [
  "Not taken yet",
  "IELTS",
  "TOEFL",
  "PTE",
  "Duolingo",
  "Medium of Instruction (MOI)",
];
export const budgetRanges = [
  "Under 10 Lakh INR",
  "10 – 20 Lakh INR",
  "20 – 35 Lakh INR",
  "Above 35 Lakh INR",
  "Need guidance",
];
