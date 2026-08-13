export type CourseCategory = {
  slug: string;
  title: string;
  icon: string;
  short: string;
  examples: string[];
  destinations: string[];
};

export const courseCategories: CourseCategory[] = [
  {
    slug: "business-management",
    title: "Business & Management",
    icon: "briefcase",
    short: "Management, marketing, international business and MBA pathways.",
    examples: ["MBA", "MSc Management", "MSc Marketing", "BBA"],
    destinations: ["United Kingdom", "Canada", "Australia", "France"],
  },
  {
    slug: "computer-science-it",
    title: "Computer Science & IT",
    icon: "cpu",
    short: "Software engineering, cyber security, cloud and computing fundamentals.",
    examples: ["MSc Computer Science", "MSc Cyber Security", "BSc IT"],
    destinations: ["United States", "Ireland", "Canada", "Germany"],
  },
  {
    slug: "engineering",
    title: "Engineering",
    icon: "cog",
    short: "Mechanical, civil, electrical, automotive and industrial engineering.",
    examples: ["MSc Mechanical Engineering", "MEng Civil", "MSc Automotive Systems"],
    destinations: ["Germany", "United States", "Canada", "Australia"],
  },
  {
    slug: "medicine-healthcare",
    title: "Medicine & Healthcare",
    icon: "stethoscope",
    short: "Public health, nursing, healthcare management and allied sciences.",
    examples: ["MPH", "Master of Nursing", "MSc Healthcare Management"],
    destinations: ["Australia", "United Kingdom", "Ireland"],
  },
  {
    slug: "data-science",
    title: "Data Science",
    icon: "chartBar",
    short: "Statistics, machine learning and analytics for industry roles.",
    examples: ["MSc Data Science", "MSc Business Analytics"],
    destinations: ["United States", "United Kingdom", "Ireland"],
  },
  {
    slug: "artificial-intelligence",
    title: "Artificial Intelligence",
    icon: "sparkles",
    short: "AI, deep learning, robotics and intelligent systems.",
    examples: ["MSc Artificial Intelligence", "MSc Robotics"],
    destinations: ["United States", "United Kingdom", "Germany"],
  },
  {
    slug: "finance",
    title: "Finance",
    icon: "banknote",
    short: "Corporate finance, investment, risk and financial technology.",
    examples: ["MSc Finance", "MSc FinTech", "MSc Investment Management"],
    destinations: ["United Kingdom", "France", "United States"],
  },
  {
    slug: "accounting",
    title: "Accounting",
    icon: "calculator",
    short: "Professional accounting, audit and taxation pathways.",
    examples: ["Master of Professional Accounting", "MSc Accounting & Finance"],
    destinations: ["Australia", "Canada", "New Zealand"],
  },
  {
    slug: "law",
    title: "Law",
    icon: "scale",
    short: "International, corporate and human rights law programmes.",
    examples: ["LLM International Law", "LLM Corporate Law"],
    destinations: ["United Kingdom", "United States", "Australia"],
  },
  {
    slug: "hospitality-tourism",
    title: "Hospitality & Tourism",
    icon: "concierge",
    short: "Hotel management, tourism, events and culinary programmes.",
    examples: ["MSc Hospitality Management", "Diploma in Hotel Operations"],
    destinations: ["Dubai / UAE", "Australia", "France", "New Zealand"],
  },
  {
    slug: "architecture",
    title: "Architecture",
    icon: "ruler",
    short: "Architecture, urban design and sustainable built environment.",
    examples: ["MSc Architecture", "MA Urban Design"],
    destinations: ["Italy", "United Kingdom", "Germany"],
  },
  {
    slug: "social-sciences",
    title: "Social Sciences",
    icon: "users",
    short: "Psychology, economics, international relations and development.",
    examples: ["MSc Economics", "MA International Relations", "MSc Psychology"],
    destinations: ["United Kingdom", "United States", "Ireland"],
  },
  {
    slug: "media-communication",
    title: "Media & Communication",
    icon: "megaphone",
    short: "Journalism, digital media, PR and communication studies.",
    examples: ["MA Journalism", "MSc Digital Media", "MA Communication"],
    destinations: ["United Kingdom", "Australia", "Canada"],
  },
];
