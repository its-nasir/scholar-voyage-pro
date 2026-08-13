export type Testimonial = {
  id: string;
  name: string;
  country: string;
  university: string;
  course: string;
  quote: string;
  initials: string;
  photoUrl?: string; // PLACEHOLDER: add student photo URL when consent is available
};

/**
 * DEMO TESTIMONIALS — placeholder content for layout only.
 * Replace with real, consented student testimonials before publishing.
 */
export const testimonials: Testimonial[] = [
  {
    id: "demo-1",
    name: "Student Name (demo)",
    country: "United Kingdom",
    university: "Demo Northern Business University",
    course: "MSc Finance",
    quote:
      "Placeholder testimonial text. This space is reserved for a genuine student experience shared with consent.",
    initials: "SN",
  },
  {
    id: "demo-2",
    name: "Student Name (demo)",
    country: "Canada",
    university: "Demo Prairie University",
    course: "MSc Computer Science",
    quote:
      "Placeholder testimonial text. This space is reserved for a genuine student experience shared with consent.",
    initials: "SN",
  },
  {
    id: "demo-3",
    name: "Student Name (demo)",
    country: "Australia",
    university: "Demo Harbour City University",
    course: "Master of IT",
    quote:
      "Placeholder testimonial text. This space is reserved for a genuine student experience shared with consent.",
    initials: "SN",
  },
];
