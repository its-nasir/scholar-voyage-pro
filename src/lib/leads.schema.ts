import { z } from "zod";

/** Shared validation schemas — used by both the forms and the server function. */

const name = z
  .string()
  .trim()
  .min(2, { message: "Please enter your full name" })
  .max(100, { message: "Name must be under 100 characters" });

const email = z
  .string()
  .trim()
  .email({ message: "Enter a valid email address" })
  .max(255, { message: "Email must be under 255 characters" });

const phone = z
  .string()
  .trim()
  .min(7, { message: "Enter a valid phone number" })
  .max(20, { message: "Phone number is too long" })
  .regex(/^[0-9+\-() ]+$/, { message: "Phone can contain digits and + - ( ) only" });

const optionalText = (max = 500) => z.string().trim().max(max).optional().or(z.literal(""));
const optionalName = name.optional().or(z.literal(""));
const optionalPhone = phone.optional().or(z.literal(""));

export const leadTypes = ["enquiry", "counselling", "contact", "scholarship", "course", "story"] as const;
export type LeadType = (typeof leadTypes)[number];

export const enquirySchema = z.object({
  fullName: optionalName,
  email: optionalText(255),
  phone: optionalPhone,
  country: optionalText(120),
  course: optionalText(120),
  qualification: optionalText(120),
  academicScore: optionalText(20),
  intake: optionalText(120),
  message: optionalText(1000),
  consent: z.boolean().optional(),
});

export const counsellingSchema = z.object({
  fullName: name,
  phone,
  email,
  country: z.string().trim().min(1, { message: "Select a preferred country" }),
  course: z.string().trim().min(2, { message: "Enter a preferred course" }).max(120),
  intake: z.string().trim().min(1, { message: "Select an intake" }),
  message: optionalText(1000),
  consent: z.literal(true, { errorMap: () => ({ message: "Please accept the consent statement" }) }),
});

export const contactSchema = z.object({
  fullName: name,
  email,
  phone,
  country: z.string().trim().min(1, { message: "Select a country" }),
  course: z.string().trim().min(2, { message: "Enter a course of interest" }).max(120),
  message: z.string().trim().min(10, { message: "Please add a few details" }).max(1000),
  consent: z.literal(true, { errorMap: () => ({ message: "Please accept the consent statement" }) }),
});

export const scholarshipSchema = z.object({
  fullName: name,
  email,
  phone,
  country: z.string().trim().min(1, { message: "Select a country" }),
  degreeLevel: z.string().trim().min(1, { message: "Select a degree level" }),
  course: z.string().trim().min(2, { message: "Enter your intended course" }).max(120),
  academicScore: z.string().trim().min(1, { message: "Enter your academic score" }).max(20),
  graduationYear: z
    .string()
    .trim()
    .regex(/^(19|20)\d{2}$/, { message: "Enter a 4-digit year" }),
  workExperience: z.string().trim().max(120).optional().or(z.literal("")),
  englishTest: z.string().trim().min(1, { message: "Select your English test status" }),
  budget: z.string().trim().min(1, { message: "Select a budget range" }),
  message: optionalText(1000),
  consent: z.literal(true, { errorMap: () => ({ message: "Please accept the consent statement" }) }),
});

export const leadSchema = z.object({
  type: z.enum(leadTypes),
  source: z.string().trim().max(120).optional(),
  payload: z.record(z.union([z.string(), z.boolean()])),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
export type CounsellingInput = z.infer<typeof counsellingSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type ScholarshipInput = z.infer<typeof scholarshipSchema>;
export type LeadInput = z.infer<typeof leadSchema>;
