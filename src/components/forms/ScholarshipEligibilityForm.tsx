import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { countries } from "@/data/countries";
import { budgetRanges, degreeLevels, englishTestOptions } from "@/config/site";
import { scholarshipSchema, type ScholarshipInput } from "@/lib/leads.schema";
import { ConsentNote, FieldShell, SuccessPanel, inputClass, selectClass, textareaClass } from "./fields";
import { useLeadSubmit } from "./useLeadForm";

export function ScholarshipEligibilityForm({ source = "scholarship-eligibility" }: { source?: string }) {
  const { status, reference, submit, reset } = useLeadSubmit("scholarship", source);
  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
  } = useForm<ScholarshipInput>({ resolver: zodResolver(scholarshipSchema) });

  if (status === "success") {
    return (
      <SuccessPanel
        title="Eligibility request received"
        reference={reference}
        onReset={() => {
          resetForm();
          reset();
        }}
      />
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(async (values) => {
        await submit(values);
      })}
      className="grid gap-4 sm:grid-cols-2"
    >
      <FieldShell label="Name" htmlFor="sc-name" required error={errors.fullName}>
        <input id="sc-name" className={inputClass} placeholder="Your full name" autoComplete="name" {...register("fullName")} />
      </FieldShell>
      <FieldShell label="Email" htmlFor="sc-email" required error={errors.email}>
        <input id="sc-email" type="email" className={inputClass} placeholder="you@example.com" autoComplete="email" {...register("email")} />
      </FieldShell>
      <FieldShell label="Phone" htmlFor="sc-phone" required error={errors.phone}>
        <input id="sc-phone" type="tel" className={inputClass} placeholder="+91 00000 00000" autoComplete="tel" {...register("phone")} />
      </FieldShell>
      <FieldShell label="Country" htmlFor="sc-country" required error={errors.country}>
        <select id="sc-country" className={selectClass} defaultValue="" {...register("country")}>
          <option value="" disabled>
            Select a country
          </option>
          {countries.map((c) => (
            <option key={c.slug} value={c.name}>
              {c.name}
            </option>
          ))}
          <option value="Not decided yet">Not decided yet</option>
        </select>
      </FieldShell>
      <FieldShell label="Degree Level" htmlFor="sc-degree" required error={errors.degreeLevel}>
        <select id="sc-degree" className={selectClass} defaultValue="" {...register("degreeLevel")}>
          <option value="" disabled>
            Select degree level
          </option>
          {degreeLevels.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </FieldShell>
      <FieldShell label="Intended Course" htmlFor="sc-course" required error={errors.course}>
        <input id="sc-course" className={inputClass} placeholder="e.g. MSc Computer Science" {...register("course")} />
      </FieldShell>
      <FieldShell label="Academic Score" htmlFor="sc-score" required error={errors.academicScore}>
        <input id="sc-score" className={inputClass} placeholder="e.g. 76% or 8.1 CGPA" {...register("academicScore")} />
      </FieldShell>
      <FieldShell label="Graduation Year" htmlFor="sc-year" required error={errors.graduationYear}>
        <input id="sc-year" inputMode="numeric" className={inputClass} placeholder="e.g. 2025" {...register("graduationYear")} />
      </FieldShell>
      <FieldShell label="Work Experience" htmlFor="sc-work" error={errors.workExperience}>
        <input id="sc-work" className={inputClass} placeholder="e.g. 2 years (optional)" {...register("workExperience")} />
      </FieldShell>
      <FieldShell label="English Test Status" htmlFor="sc-english" required error={errors.englishTest}>
        <select id="sc-english" className={selectClass} defaultValue="" {...register("englishTest")}>
          <option value="" disabled>
            Select status
          </option>
          {englishTestOptions.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>
      </FieldShell>
      <FieldShell label="Budget" htmlFor="sc-budget" required error={errors.budget}>
        <select id="sc-budget" className={selectClass} defaultValue="" {...register("budget")}>
          <option value="" disabled>
            Select budget range
          </option>
          {budgetRanges.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </FieldShell>
      <FieldShell label="Message" htmlFor="sc-message" error={errors.message} className="sm:col-span-2">
        <textarea id="sc-message" className={textareaClass} placeholder="Anything else we should know? (optional)" {...register("message")} />
      </FieldShell>
      <div className="sm:col-span-2">
        <label className="flex items-start gap-2.5">
          <input type="checkbox" className="mt-0.5 size-4 rounded border-input accent-primary" {...register("consent")} />
          <ConsentNote />
        </label>
        {errors.consent?.message ? (
          <p role="alert" className="mt-1 text-xs font-medium text-destructive">
            {errors.consent.message}
          </p>
        ) : null}
      </div>
      {status === "error" ? (
        <p role="alert" className="text-sm font-medium text-destructive sm:col-span-2">
          Something went wrong while submitting. Please try again or contact us on WhatsApp.
        </p>
      ) : null}
      <div className="sm:col-span-2">
        <Button type="submit" variant="hero" size="lg" className="w-full" disabled={status === "submitting"}>
          {status === "submitting" ? "Checking…" : "Check Scholarship Eligibility"}
        </Button>
      </div>
      <p className="text-xs text-muted-foreground sm:col-span-2">
        Scholarship decisions are made solely by the university or scholarship provider. Eligibility review is
        guidance only and is not a guarantee of funding.
      </p>
    </form>
  );
}
