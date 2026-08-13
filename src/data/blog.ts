export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  date: string; // ISO date
  excerpt: string;
  readingTime: string;
  body: string[];
};

export const blogCategories = [
  "Study Abroad",
  "Scholarships",
  "Visa Updates",
  "IELTS / English Tests",
  "University Guides",
  "Student Tips",
  "Career Guidance",
  "Country Guides",
];

/**
 * Article content lives here for now. The shape matches a typical CMS record,
 * so this array can be replaced by a CMS/database fetch without UI changes.
 */
export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-choose-the-right-study-destination",
    title: "How to Choose the Right Study Destination",
    category: "Study Abroad",
    date: "2026-07-20",
    excerpt:
      "Country choice affects cost, course structure and career options. Here is a practical framework for comparing destinations against your own profile.",
    readingTime: "5 min read",
    body: [
      "Choosing a study destination is rarely about rankings alone. Cost, course structure, English requirements, work options and your long-term career plan all influence which country suits you.",
      "Start by writing down three things: your realistic total budget, the subject area you want to study, and where you would like to build your career. Most destination decisions become clearer once these are fixed.",
      "Next, compare academic fit. Some countries offer shorter one-year masters programmes, while others follow a two-year structure with more electives and research options.",
      "Finally, verify current requirements directly with universities and official immigration sources before applying, since policies and fees are revised periodically.",
    ],
  },
  {
    slug: "understanding-scholarship-eligibility",
    title: "Understanding Scholarship Eligibility",
    category: "Scholarships",
    date: "2026-07-02",
    excerpt:
      "Scholarships follow published criteria. Knowing how those criteria are assessed helps you apply where you have a genuine chance.",
    readingTime: "4 min read",
    body: [
      "Scholarships are awarded against published criteria — academic merit, subject area, country of origin, financial need or a combination of these.",
      "Read the criteria carefully and check whether the award is automatic on admission or requires a separate application with essays and references.",
      "Prepare documents early. Many competitive awards close before or shortly after the main application deadline.",
      "No consultancy can guarantee a scholarship. What guidance can do is help you apply to opportunities where your profile genuinely matches the criteria.",
    ],
  },
  {
    slug: "documents-checklist-for-your-first-application",
    title: "Documents Checklist for Your First Application",
    category: "Student Tips",
    date: "2026-06-14",
    excerpt:
      "A clear checklist prevents last-minute delays. Here is what most universities ask for at the application stage.",
    readingTime: "3 min read",
    body: [
      "Most applications require academic transcripts and certificates, proof of English proficiency, a Statement of Purpose, Letters of Recommendation, a passport copy and a resume.",
      "Scan documents clearly in the format requested. Poor scans are a common reason for application delays.",
      "Keep a single folder with the final versions of every document, named consistently, so submissions are quick and accurate.",
      "Requirements differ between institutions, so always confirm the checklist published for your specific course.",
    ],
  },
  {
    slug: "ielts-preparation-basics",
    title: "IELTS Preparation Basics for First-Time Test Takers",
    category: "IELTS / English Tests",
    date: "2026-05-28",
    excerpt: "A structured four-week approach to the four IELTS sections, with realistic practice habits.",
    readingTime: "5 min read",
    body: [
      "The IELTS test assesses listening, reading, writing and speaking. Preparing each section separately is more effective than practising full tests only.",
      "Build a habit of timed practice. Time pressure, not vocabulary, is what most first-time test takers struggle with.",
      "For writing, learn the structure expected for each task type and practise with feedback rather than writing in isolation.",
      "Check the current accepted test versions and score requirements for your target universities before booking a test date.",
    ],
  },
  {
    slug: "student-visa-process-overview",
    title: "Student Visa Process: A General Overview",
    category: "Visa Updates",
    date: "2026-05-09",
    excerpt:
      "The visa stage follows a broadly similar sequence in most destinations. Understanding it early reduces stress later.",
    readingTime: "4 min read",
    body: [
      "In most destinations the visa stage begins after you accept an offer and complete enrolment or fee formalities with the university.",
      "You then compile financial evidence, identity documents and academic records in the format required by the authority.",
      "Some countries include an interview or biometric appointment as part of the process.",
      "Visa rules change. Always confirm the current requirements on the official immigration website of the destination country before submitting.",
    ],
  },
  {
    slug: "career-planning-before-you-apply",
    title: "Career Planning Before You Apply",
    category: "Career Guidance",
    date: "2026-04-22",
    excerpt: "Working backwards from your target role makes course selection far more effective.",
    readingTime: "4 min read",
    body: [
      "Instead of choosing a course and hoping a career follows, start from the role you want and work backwards to the skills it needs.",
      "Review job descriptions in your target sector and note the qualifications and tools employers ask for.",
      "Then compare course curricula for those specific modules, projects and internship components.",
      "This approach also strengthens your Statement of Purpose, because your reasoning becomes specific and verifiable.",
    ],
  },
];

export const postBySlug = (slug: string) => blogPosts.find((p) => p.slug === slug);
