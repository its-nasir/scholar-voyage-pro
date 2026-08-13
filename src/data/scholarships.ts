export type Scholarship = {
  id: string;
  name: string;
  country: string;
  provider: string;
  degreeLevel: string;
  eligibility: string;
  fundingType: string;
  deadline: string;
  notes: string;
};

/**
 * DEMO CONTENT — clearly labelled sample scholarships for layout purposes.
 * Replace with verified scholarship data before publishing.
 */
export const scholarships: Scholarship[] = [
  {
    id: "demo-1",
    name: "Demo International Merit Scholarship",
    country: "United Kingdom",
    provider: "Demo Northern Business University",
    degreeLevel: "Masters",
    eligibility: "Strong academic record in the qualifying degree; English proficiency as required by the university.",
    fundingType: "Partial tuition fee waiver",
    deadline: "Deadline to be confirmed",
    notes: "Sample entry for demonstration only.",
  },
  {
    id: "demo-2",
    name: "Demo Global Leaders Award",
    country: "United States",
    provider: "Demo Midwest State University",
    degreeLevel: "Masters",
    eligibility: "Academic merit with leadership or extracurricular involvement.",
    fundingType: "Partial funding",
    deadline: "Deadline to be confirmed",
    notes: "Sample entry for demonstration only.",
  },
  {
    id: "demo-3",
    name: "Demo Entrance Scholarship",
    country: "Canada",
    provider: "Demo Prairie University",
    degreeLevel: "Bachelors",
    eligibility: "Awarded automatically on admission based on academic percentage.",
    fundingType: "One-time award",
    deadline: "Applied at admission stage",
    notes: "Sample entry for demonstration only.",
  },
  {
    id: "demo-4",
    name: "Demo Engineering Excellence Grant",
    country: "Germany",
    provider: "Demo Technical University of Applied Sciences",
    degreeLevel: "Masters",
    eligibility: "Engineering background with strong quantitative subjects.",
    fundingType: "Stipend (competitive)",
    deadline: "Deadline to be confirmed",
    notes: "Sample entry for demonstration only.",
  },
  {
    id: "demo-5",
    name: "Demo Women in STEM Scholarship",
    country: "Australia",
    provider: "Demo Harbour City University",
    degreeLevel: "Masters",
    eligibility: "Female applicants to eligible STEM programmes.",
    fundingType: "Partial tuition fee waiver",
    deadline: "Deadline to be confirmed",
    notes: "Sample entry for demonstration only.",
  },
  {
    id: "demo-6",
    name: "Demo Analytics Talent Award",
    country: "Ireland",
    provider: "Demo Dublin Tech University",
    degreeLevel: "Masters",
    eligibility: "Applicants to analytics and computing programmes with relevant background.",
    fundingType: "Partial funding",
    deadline: "Deadline to be confirmed",
    notes: "Sample entry for demonstration only.",
  },
];
