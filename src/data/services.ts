export type Service = {
  slug: string;
  title: string;
  icon: string; // lucide icon name key (see iconMap in components/Icon.tsx)
  short: string;
  details: string[];
};

export const services: Service[] = [
  {
    slug: "study-abroad-counselling",
    title: "Study Abroad Counselling",
    icon: "compass",
    short: "One-to-one counselling to understand your goals, academics and budget before shortlisting options.",
    details: [
      "Profile discussion covering academics, budget and career goals",
      "Realistic destination and programme suggestions",
      "Timeline planning for your target intake",
    ],
  },
  {
    slug: "university-course-selection",
    title: "University & Course Selection",
    icon: "graduation",
    short: "Shortlist universities and courses that match your profile, career plan and finances.",
    details: [
      "Course-to-career mapping",
      "Balanced shortlist across ambitious and safer options",
      "Entry requirement checks for each shortlisted programme",
    ],
  },
  {
    slug: "scholarship-guidance",
    title: "Scholarship Guidance",
    icon: "award",
    short: "Identify scholarship opportunities you may be eligible for and prepare stronger applications.",
    details: [
      "Eligibility review against published criteria",
      "Deadline tracking support",
      "Application document guidance",
    ],
  },
  {
    slug: "application-assistance",
    title: "Application Assistance",
    icon: "fileText",
    short: "Support with forms, documents and submission for each university application.",
    details: ["Application form review", "Document checklist management", "Submission and follow-up support"],
  },
  {
    slug: "sop-guidance",
    title: "SOP Guidance",
    icon: "penLine",
    short: "Structure a clear, honest Statement of Purpose that reflects your own story.",
    details: ["Structure and content planning", "Review and feedback rounds", "Course-specific alignment"],
  },
  {
    slug: "lor-guidance",
    title: "LOR Guidance",
    icon: "userCheck",
    short: "Understand who should recommend you and what a strong recommendation covers.",
    details: ["Recommender selection advice", "Format and content guidance", "Submission process support"],
  },
  {
    slug: "documentation-assistance",
    title: "Documentation Assistance",
    icon: "folderCheck",
    short: "Organise academic, financial and identity documents to the required standard.",
    details: ["Checklist per country and university", "Format and attestation guidance", "Review before submission"],
  },
  {
    slug: "visa-guidance",
    title: "Visa Guidance",
    icon: "stamp",
    short: "Guidance on the student visa process and the documentation generally required.",
    details: [
      "Overview of the current process for your destination",
      "Document preparation guidance",
      "Practice for visa interviews where applicable",
    ],
  },
  {
    slug: "interview-preparation",
    title: "Interview Preparation",
    icon: "messages",
    short: "Prepare for university and visa interviews with structured practice sessions.",
    details: ["Common question practice", "Communication feedback", "Mock interview sessions"],
  },
  {
    slug: "pre-departure-guidance",
    title: "Pre-Departure Guidance",
    icon: "plane",
    short: "Practical briefing before you fly — packing, travel, arrival and campus onboarding.",
    details: ["Pre-departure checklist", "Travel and arrival guidance", "Settling-in orientation"],
  },
  {
    slug: "accommodation-guidance",
    title: "Accommodation Guidance",
    icon: "home",
    short: "Understand on-campus and private housing options in your destination city.",
    details: ["Housing options overview", "Budgeting for rent and utilities", "Booking process guidance"],
  },
  {
    slug: "education-loan-guidance",
    title: "Education Loan Guidance",
    icon: "banknote",
    short: "Understand education loan options, documentation and general lender expectations.",
    details: ["Loan documentation overview", "Collateral vs non-collateral basics", "Timeline planning"],
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);

export const whyChooseUs = [
  {
    icon: "userCheck",
    title: "Personalized Guidance",
    text: "Every student's academic background, goals and budget are different, so recommendations are made for your profile — not a generic list.",
  },
  {
    icon: "graduation",
    title: "University Selection",
    text: "We help you identify universities that genuinely match your academic record and long-term career goals.",
  },
  {
    icon: "award",
    title: "Scholarship Help",
    text: "Eligible students are guided towards suitable scholarship opportunities and stronger applications.",
  },
  {
    icon: "fileText",
    title: "Application Support",
    text: "We assist you throughout the application process, from document preparation to submission.",
  },
  {
    icon: "stamp",
    title: "Visa Guidance",
    text: "Guidance on the student visa process and the documentation generally required for your destination.",
  },
  {
    icon: "lifeBuoy",
    title: "End-to-End Support",
    text: "Support continues from your first counselling session through to pre-departure preparation.",
  },
];

export const admissionSteps = [
  { step: 1, title: "Free Counselling", text: "Understand your options in a one-to-one session with a counsellor." },
  { step: 2, title: "Profile Evaluation", text: "Review of academics, English proficiency, budget and career goals." },
  { step: 3, title: "University & Course Selection", text: "Build a balanced shortlist aligned with your profile." },
  { step: 4, title: "Application Preparation", text: "Prepare SOP, LORs, transcripts and supporting documents." },
  { step: 5, title: "University Application", text: "Submit applications and track responses from institutions." },
  { step: 6, title: "Offer Letter", text: "Review offers, conditions and deadlines before accepting." },
  { step: 7, title: "Scholarship / Financial Guidance", text: "Explore scholarship options and plan finances or loans." },
  { step: 8, title: "Visa Guidance", text: "Prepare visa documentation and practise for interviews if required." },
  { step: 9, title: "Pre-Departure Support", text: "Travel, accommodation and arrival preparation before you fly." },
];

export const trustIndicators = [
  { icon: "messages", label: "Expert Counselling" },
  { icon: "graduation", label: "University Guidance" },
  { icon: "award", label: "Scholarship Assistance" },
  { icon: "fileText", label: "Application Support" },
  { icon: "stamp", label: "Visa Guidance" },
];
