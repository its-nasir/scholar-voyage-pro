export type Country = {
  slug: string;
  name: string;
  flag: string;
  tagline: string;
  overview: string;
  whyStudy: string[];
  popularAreas: string[];
  popularCourses: string[];
  universities: string[];
  scholarships: string[];
  requirements: string[];
  intakes: string[];
  tuitionPlaceholder: string;
  livingCostPlaceholder: string;
  visaOverview: string;
  careers: string;
  scholarshipAvailability: "Widely available" | "Available (merit based)" | "Limited / competitive";
  faqs: { q: string; a: string }[];
};

/** Single source of truth for study destinations — edit here to update all pages. */
export const countries: Country[] = [
  {
    slug: "uk",
    name: "United Kingdom",
    flag: "🇬🇧",
    tagline: "One-year masters programmes and globally ranked universities.",
    overview:
      "The United Kingdom is one of the most established study destinations, known for shorter postgraduate programmes, research-led teaching and a large international student community.",
    whyStudy: [
      "One-year masters programmes for many disciplines",
      "Globally recognised universities and qualifications",
      "Post-study work options for eligible graduates",
      "Multicultural cities with strong student support",
    ],
    popularAreas: ["Business", "Computer Science", "Healthcare", "Law", "Engineering"],
    popularCourses: ["MSc Data Science", "MBA", "MSc Finance", "MSc Cyber Security", "LLM"],
    universities: [
      "Demo University of Manchester-style institution",
      "Demo Midlands Business School",
      "Demo London Metropolitan-style university",
    ],
    scholarships: [
      "University merit scholarships (varies by institution)",
      "Government funded scholarship schemes",
      "Departmental / research awards",
    ],
    requirements: [
      "Academic transcripts and certificates",
      "English proficiency (IELTS / PTE / TOEFL or accepted alternative)",
      "Statement of Purpose and Letters of Recommendation",
      "Valid passport and financial documents",
    ],
    intakes: ["September", "January", "May (selected courses)"],
    tuitionPlaceholder: "Tuition fee range — to be updated",
    livingCostPlaceholder: "Living cost estimate — to be updated",
    visaOverview:
      "Students typically apply for a study visa after receiving an offer and confirming enrolment. Documentation and financial requirements are defined by the immigration authority and can change.",
    careers: "Graduates commonly pursue roles in finance, technology, healthcare and consulting.",
    scholarshipAvailability: "Available (merit based)",
    faqs: [
      {
        q: "How long is a masters degree in the UK?",
        a: "Many taught masters programmes are completed in about one year, though duration varies by course and university.",
      },
      {
        q: "Do all universities require IELTS?",
        a: "Requirements differ by institution and course. Some accept alternative evidence of English proficiency — always confirm the current policy.",
      },
    ],
  },
  {
    slug: "usa",
    name: "United States",
    flag: "🇺🇸",
    tagline: "Flexible curriculum, research funding and vast programme choice.",
    overview:
      "The United States hosts a very large number of universities offering flexible curricula, strong research funding and specialisation options across almost every discipline.",
    whyStudy: [
      "Huge choice of universities and programmes",
      "Flexible course structure with electives and majors",
      "Research assistantship and teaching assistantship opportunities",
      "Strong industry and innovation ecosystem",
    ],
    popularAreas: ["Computer Science", "Data Science", "Engineering", "Business", "Public Health"],
    popularCourses: ["MS Computer Science", "MS Data Analytics", "MBA", "MS Electrical Engineering"],
    universities: ["Demo State University", "Demo Institute of Technology", "Demo Pacific University"],
    scholarships: [
      "Merit-based tuition waivers",
      "Assistantships (subject to department availability)",
      "External foundation scholarships",
    ],
    requirements: [
      "Academic transcripts",
      "English test and, for some programmes, GRE / GMAT",
      "SOP, LORs and resume",
      "Financial documents for visa processing",
    ],
    intakes: ["Fall (August/September)", "Spring (January)", "Summer (limited)"],
    tuitionPlaceholder: "Tuition fee range — to be updated",
    livingCostPlaceholder: "Living cost estimate — to be updated",
    visaOverview:
      "Students generally require an F-1 student visa, including an interview at the consulate. Requirements are set by immigration authorities and may change.",
    careers: "Career pathways include technology, analytics, engineering, healthcare and finance.",
    scholarshipAvailability: "Available (merit based)",
    faqs: [
      {
        q: "Is GRE mandatory for the USA?",
        a: "It depends on the university and programme; several institutions have made it optional. Confirm the current requirement before applying.",
      },
      {
        q: "Can I work while studying?",
        a: "On-campus work options exist within limits set by immigration rules. Always verify current regulations.",
      },
    ],
  },
  {
    slug: "canada",
    name: "Canada",
    flag: "🇨🇦",
    tagline: "Quality education with welcoming student communities.",
    overview:
      "Canada is known for quality institutions, co-op programmes that combine study with work experience, and a welcoming multicultural environment.",
    whyStudy: [
      "Co-op and internship integrated programmes",
      "Comparatively moderate tuition at many institutions",
      "Post-graduation work pathways for eligible students",
      "Safe, multicultural cities",
    ],
    popularAreas: ["Business", "IT", "Healthcare", "Engineering", "Hospitality"],
    popularCourses: ["PG Diploma Business Management", "MEng", "MSc Computer Science", "Nursing"],
    universities: ["Demo Ontario College", "Demo Prairie University", "Demo Coastal Institute"],
    scholarships: ["Entrance scholarships", "Programme-specific awards", "Provincial awards"],
    requirements: [
      "Academic transcripts",
      "English proficiency test",
      "Proof of funds / GIC as applicable",
      "Statement of Purpose",
    ],
    intakes: ["September", "January", "May"],
    tuitionPlaceholder: "Tuition fee range — to be updated",
    livingCostPlaceholder: "Living cost estimate — to be updated",
    visaOverview:
      "A study permit is typically required. Financial and documentation requirements are defined by immigration authorities and change periodically.",
    careers: "Common sectors include IT, healthcare, business services and skilled trades.",
    scholarshipAvailability: "Limited / competitive",
    faqs: [
      {
        q: "What is a co-op programme?",
        a: "Co-op programmes combine academic terms with supervised work terms related to your field of study.",
      },
    ],
  },
  {
    slug: "australia",
    name: "Australia",
    flag: "🇦🇺",
    tagline: "Globally ranked institutions and strong student protections.",
    overview:
      "Australia offers internationally ranked universities, strong student protection frameworks and a wide range of vocational and higher education pathways.",
    whyStudy: [
      "Well regulated education system",
      "Strong research output across disciplines",
      "Work rights for eligible students within visa conditions",
      "High quality of student life",
    ],
    popularAreas: ["Nursing", "IT", "Engineering", "Accounting", "Hospitality"],
    popularCourses: ["Master of IT", "Master of Professional Accounting", "Master of Nursing"],
    universities: ["Demo Sydney-region University", "Demo Melbourne Institute", "Demo Queensland College"],
    scholarships: ["University international scholarships", "Faculty merit awards"],
    requirements: ["Transcripts", "English test", "Genuine student documentation", "Financial evidence"],
    intakes: ["February", "July", "November (selected)"],
    tuitionPlaceholder: "Tuition fee range — to be updated",
    livingCostPlaceholder: "Living cost estimate — to be updated",
    visaOverview:
      "Student visa applications require an enrolment confirmation and supporting documents as specified by immigration authorities.",
    careers: "Graduates work across healthcare, technology, construction and professional services.",
    scholarshipAvailability: "Available (merit based)",
    faqs: [
      {
        q: "Which intake should I target?",
        a: "February and July are the main intakes. Choosing an intake depends on your readiness, documents and course availability.",
      },
    ],
  },
  {
    slug: "germany",
    name: "Germany",
    flag: "🇩🇪",
    tagline: "Public universities with strong engineering and research focus.",
    overview:
      "Germany is known for public universities with low or no tuition fees at many institutions, and a strong reputation in engineering, technology and research.",
    whyStudy: [
      "Low or no tuition at many public universities",
      "Excellent engineering and applied sciences programmes",
      "Strong industry linkages and internships",
      "English-taught masters options",
    ],
    popularAreas: ["Mechanical Engineering", "Automotive", "Computer Science", "Renewable Energy"],
    popularCourses: ["MSc Mechanical Engineering", "MSc Data Engineering", "MSc Automotive Systems"],
    universities: ["Demo Technical University", "Demo University of Applied Sciences"],
    scholarships: ["Government and foundation scholarships", "University stipends (competitive)"],
    requirements: [
      "Academic transcripts with subject-wise details",
      "English or German proficiency depending on programme",
      "Blocked account / financial proof as applicable",
      "APS or equivalent verification where required",
    ],
    intakes: ["Winter (October)", "Summer (April)"],
    tuitionPlaceholder: "Tuition / semester contribution — to be updated",
    livingCostPlaceholder: "Living cost estimate — to be updated",
    visaOverview:
      "A national student visa is generally required, with financial proof arrangements defined by the authorities.",
    careers: "Engineering, automotive, IT and manufacturing sectors are common destinations.",
    scholarshipAvailability: "Limited / competitive",
    faqs: [
      {
        q: "Do I need to learn German?",
        a: "Many masters programmes are taught in English, but German helps with daily life and part-time opportunities.",
      },
    ],
  },
  {
    slug: "ireland",
    name: "Ireland",
    flag: "🇮🇪",
    tagline: "European tech hub with English-taught programmes.",
    overview:
      "Ireland combines English-taught programmes with a strong presence of global technology and pharmaceutical companies.",
    whyStudy: [
      "English-speaking country within the EU",
      "Strong technology and pharma industry base",
      "Post-study options for eligible graduates",
      "Compact, student-friendly cities",
    ],
    popularAreas: ["Computer Science", "Pharmaceuticals", "Business Analytics", "Finance"],
    popularCourses: ["MSc Computing", "MSc Business Analytics", "MSc Pharmaceutical Science"],
    universities: ["Demo Dublin University", "Demo Cork Institute"],
    scholarships: ["University merit awards", "Government scholarship schemes"],
    requirements: ["Transcripts", "English test", "SOP", "Financial documents"],
    intakes: ["September", "January (limited)"],
    tuitionPlaceholder: "Tuition fee range — to be updated",
    livingCostPlaceholder: "Living cost estimate — to be updated",
    visaOverview: "Study visa requirements are defined by Irish immigration authorities and may change.",
    careers: "Technology, life sciences and financial services are prominent employers.",
    scholarshipAvailability: "Limited / competitive",
    faqs: [{ q: "Is Ireland good for IT students?", a: "Ireland hosts many global technology companies, which supports internship and graduate opportunities in the sector." }],
  },
  {
    slug: "new-zealand",
    name: "New Zealand",
    flag: "🇳🇿",
    tagline: "Balanced student life with quality institutions.",
    overview:
      "New Zealand offers quality universities, practical polytechnic pathways and a balanced lifestyle for international students.",
    whyStudy: [
      "All universities are publicly funded and quality assured",
      "Practical, industry-linked programmes",
      "Safe environment and natural surroundings",
      "Work rights within visa conditions",
    ],
    popularAreas: ["Agriculture", "IT", "Engineering", "Hospitality", "Healthcare"],
    popularCourses: ["Master of IT", "Master of Engineering", "PG Diploma in Business"],
    universities: ["Demo Auckland-region University", "Demo Southern Institute"],
    scholarships: ["University international awards"],
    requirements: ["Transcripts", "English test", "Financial evidence", "Health and character documents"],
    intakes: ["February", "July"],
    tuitionPlaceholder: "Tuition fee range — to be updated",
    livingCostPlaceholder: "Living cost estimate — to be updated",
    visaOverview: "Student visa conditions are set by immigration authorities and should be verified before applying.",
    careers: "Agriculture technology, IT, engineering and tourism sectors are common.",
    scholarshipAvailability: "Limited / competitive",
    faqs: [{ q: "Are polytechnics recognised?", a: "Institutes of technology and polytechnics are recognised providers offering practical, career-focused qualifications." }],
  },
  {
    slug: "france",
    name: "France",
    flag: "🇫🇷",
    tagline: "Business schools, design and research excellence.",
    overview:
      "France is home to reputed business schools, engineering grandes écoles and public universities with English-taught programmes.",
    whyStudy: [
      "Reputed business and management schools",
      "English-taught masters options",
      "Cultural and travel access across Europe",
      "Strong research institutions",
    ],
    popularAreas: ["Management", "Luxury Brand Management", "Engineering", "Culinary Arts", "Design"],
    popularCourses: ["MSc Management", "MBA", "MSc International Business"],
    universities: ["Demo Paris Business School", "Demo Lyon University"],
    scholarships: ["Government scholarship programmes", "School merit awards"],
    requirements: ["Transcripts", "English proficiency", "SOP / motivation letter", "Financial proof"],
    intakes: ["September", "January"],
    tuitionPlaceholder: "Tuition fee range — to be updated",
    livingCostPlaceholder: "Living cost estimate — to be updated",
    visaOverview: "Student visa processes typically include institution acceptance and a campus-application step.",
    careers: "Management, luxury retail, engineering and hospitality roles are common.",
    scholarshipAvailability: "Limited / competitive",
    faqs: [{ q: "Are English-taught courses available?", a: "Yes, many institutions offer English-taught masters programmes, especially in business and engineering." }],
  },
  {
    slug: "italy",
    name: "Italy",
    flag: "🇮🇹",
    tagline: "Design, architecture and affordable public universities.",
    overview:
      "Italy offers historic universities, respected design and architecture schools, and comparatively moderate tuition at public institutions.",
    whyStudy: [
      "Strong design, fashion and architecture programmes",
      "Moderate tuition at public universities",
      "Regional scholarship schemes",
      "Rich cultural experience",
    ],
    popularAreas: ["Design", "Architecture", "Fashion", "Engineering", "Economics"],
    popularCourses: ["MSc Architecture", "MA Fashion Design", "MSc Management Engineering"],
    universities: ["Demo Milan Design School", "Demo Rome University"],
    scholarships: ["Regional scholarships", "University fee reductions"],
    requirements: ["Transcripts", "English proficiency", "Portfolio for design courses", "Financial proof"],
    intakes: ["September", "February (limited)"],
    tuitionPlaceholder: "Tuition fee range — to be updated",
    livingCostPlaceholder: "Living cost estimate — to be updated",
    visaOverview: "Student visa requirements include pre-enrolment steps that vary by institution and region.",
    careers: "Design studios, architecture firms, fashion houses and manufacturing.",
    scholarshipAvailability: "Available (merit based)",
    faqs: [{ q: "Do I need a portfolio?", a: "Design and architecture programmes usually require a portfolio as part of the application." }],
  },
  {
    slug: "uae",
    name: "Dubai / UAE",
    flag: "🇦🇪",
    tagline: "International branch campuses close to home.",
    overview:
      "The UAE hosts international branch campuses and regional universities, offering globally aligned programmes closer to South Asia.",
    whyStudy: [
      "International branch campuses of global universities",
      "Proximity and shorter travel time",
      "Business and hospitality industry exposure",
      "Multicultural professional environment",
    ],
    popularAreas: ["Business", "Engineering", "Hospitality", "Aviation", "IT"],
    popularCourses: ["BBA", "MBA", "BSc Computer Science", "Hospitality Management"],
    universities: ["Demo Dubai International University", "Demo Abu Dhabi Institute"],
    scholarships: ["Merit scholarships from institutions"],
    requirements: ["Transcripts", "English proficiency (varies)", "Passport", "Financial documents"],
    intakes: ["September", "January"],
    tuitionPlaceholder: "Tuition fee range — to be updated",
    livingCostPlaceholder: "Living cost estimate — to be updated",
    visaOverview: "Student residence visas are usually sponsored by the institution after admission.",
    careers: "Business, aviation, logistics, hospitality and technology sectors.",
    scholarshipAvailability: "Limited / competitive",
    faqs: [{ q: "Are UAE degrees recognised globally?", a: "Recognition depends on the institution and accreditation. Verify accreditation before applying." }],
  },
];

export const countryBySlug = (slug: string) => countries.find((c) => c.slug === slug);
