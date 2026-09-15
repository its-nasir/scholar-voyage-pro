import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { countries } from "@/data/countries";
import { intakes } from "@/config/site";
import { enquirySchema, type EnquiryInput } from "@/lib/leads.schema";
import { ConsentNote, FieldShell, SuccessPanel, inputClass, selectClass, textareaClass } from "./fields";
import { useLeadSubmit } from "./useLeadForm";

export function EnquiryForm({ source = "quick-enquiry" }: { source?: string }) {
  const { status, reference, submit, reset } = useLeadSubmit("enquiry", source);
  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
  } = useForm<EnquiryInput>({ resolver: zodResolver(enquirySchema) });

  if (status === "success") {
    return (
      <SuccessPanel
        title="Enquiry received successfully"
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
      <FieldShell label="Full Name" htmlFor="eq-name" error={errors.fullName}>
        <input id="eq-name" className={inputClass} placeholder="Your full name" autoComplete="name" {...register("fullName")} />
      </FieldShell>

      <FieldShell label="Email Address" htmlFor="eq-email" error={errors.email}>
        <input id="eq-email" type="email" className={inputClass} placeholder="you@example.com" autoComplete="email" {...register("email")} />
      </FieldShell>

      <FieldShell label="Phone Number" htmlFor="eq-phone" error={errors.phone}>
        <input id="eq-phone" type="tel" inputMode="tel" className={inputClass} placeholder="+91 00000 00000" autoComplete="tel" {...register("phone")} />
      </FieldShell>

      <FieldShell label="Preferred Country" htmlFor="eq-country" error={errors.country}>
        <select id="eq-country" className={selectClass} defaultValue="" {...register("country")}>
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

      <FieldShell label="Preferred Course" htmlFor="eq-course" error={errors.course}>
        <input id="eq-course" className={inputClass} placeholder="e.g. MSc Data Science" {...register("course")} />
      </FieldShell>

      <FieldShell label="Highest Qualification" htmlFor="eq-qual" error={errors.qualification}>
        <input id="eq-qual" className={inputClass} placeholder="e.g. B.Tech, B.Com, 12th" {...register("qualification")} />
      </FieldShell>

      <FieldShell label="Academic Percentage / CGPA" htmlFor="eq-score" error={errors.academicScore}>
        <input id="eq-score" className={inputClass} placeholder="e.g. 72% or 7.4 CGPA" {...register("academicScore")} />
      </FieldShell>

      <FieldShell label="Intake" htmlFor="eq-intake" error={errors.intake}>
        <select id="eq-intake" className={selectClass} defaultValue="" {...register("intake")}>
          <option value="" disabled>
            Select an intake
          </option>
          {intakes.map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
      </FieldShell>

      <FieldShell label="Message" htmlFor="eq-message" error={errors.message} className="sm:col-span-2">
        <textarea
          id="eq-message"
          className={textareaClass}
          placeholder="Tell us briefly about your study abroad plans (optional)"
          {...register("message")}
        />
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
          {status === "submitting" ? "Submitting…" : "Get Free Counselling"}
        </Button>
      </div>
    </form>
  );
}
