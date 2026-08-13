import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { countries } from "@/data/countries";
import { intakes } from "@/config/site";
import { counsellingSchema, type CounsellingInput } from "@/lib/leads.schema";
import { ConsentNote, FieldShell, SuccessPanel, inputClass, selectClass, textareaClass } from "./fields";
import { useLeadSubmit } from "./useLeadForm";

export function CounsellingForm({ source = "counselling-modal" }: { source?: string }) {
  const { status, reference, submit, reset } = useLeadSubmit("counselling", source);
  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
  } = useForm<CounsellingInput>({ resolver: zodResolver(counsellingSchema) });

  if (status === "success") {
    return (
      <SuccessPanel
        title="Counselling request received"
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
      <FieldShell label="Name" htmlFor="cn-name" required error={errors.fullName}>
        <input id="cn-name" className={inputClass} placeholder="Your full name" autoComplete="name" {...register("fullName")} />
      </FieldShell>
      <FieldShell label="Phone" htmlFor="cn-phone" required error={errors.phone}>
        <input id="cn-phone" type="tel" className={inputClass} placeholder="+91 00000 00000" autoComplete="tel" {...register("phone")} />
      </FieldShell>
      <FieldShell label="Email" htmlFor="cn-email" required error={errors.email}>
        <input id="cn-email" type="email" className={inputClass} placeholder="you@example.com" autoComplete="email" {...register("email")} />
      </FieldShell>
      <FieldShell label="Preferred Country" htmlFor="cn-country" required error={errors.country}>
        <select id="cn-country" className={selectClass} defaultValue="" {...register("country")}>
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
      <FieldShell label="Course" htmlFor="cn-course" required error={errors.course}>
        <input id="cn-course" className={inputClass} placeholder="e.g. MBA" {...register("course")} />
      </FieldShell>
      <FieldShell label="Preferred Intake" htmlFor="cn-intake" required error={errors.intake}>
        <select id="cn-intake" className={selectClass} defaultValue="" {...register("intake")}>
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
      <FieldShell label="Message" htmlFor="cn-message" error={errors.message} className="sm:col-span-2">
        <textarea id="cn-message" className={textareaClass} placeholder="Anything you would like the counsellor to know? (optional)" {...register("message")} />
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
          {status === "submitting" ? "Submitting…" : "Book Free Counselling"}
        </Button>
      </div>
    </form>
  );
}
