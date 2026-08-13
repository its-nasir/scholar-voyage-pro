import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { countries } from "@/data/countries";
import { contactSchema, type ContactInput } from "@/lib/leads.schema";
import { ConsentNote, FieldShell, SuccessPanel, inputClass, selectClass, textareaClass } from "./fields";
import { useLeadSubmit } from "./useLeadForm";

export function ContactForm({ source = "contact-page" }: { source?: string }) {
  const { status, reference, submit, reset } = useLeadSubmit("contact", source);
  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  if (status === "success") {
    return (
      <SuccessPanel
        title="Enquiry sent successfully"
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
      <FieldShell label="Name" htmlFor="ct-name" required error={errors.fullName}>
        <input id="ct-name" className={inputClass} placeholder="Your full name" autoComplete="name" {...register("fullName")} />
      </FieldShell>
      <FieldShell label="Email" htmlFor="ct-email" required error={errors.email}>
        <input id="ct-email" type="email" className={inputClass} placeholder="you@example.com" autoComplete="email" {...register("email")} />
      </FieldShell>
      <FieldShell label="Phone" htmlFor="ct-phone" required error={errors.phone}>
        <input id="ct-phone" type="tel" className={inputClass} placeholder="+91 00000 00000" autoComplete="tel" {...register("phone")} />
      </FieldShell>
      <FieldShell label="Country" htmlFor="ct-country" required error={errors.country}>
        <select id="ct-country" className={selectClass} defaultValue="" {...register("country")}>
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
      <FieldShell label="Course" htmlFor="ct-course" required error={errors.course} className="sm:col-span-2">
        <input id="ct-course" className={inputClass} placeholder="Course you are interested in" {...register("course")} />
      </FieldShell>
      <FieldShell label="Message" htmlFor="ct-message" required error={errors.message} className="sm:col-span-2">
        <textarea id="ct-message" className={textareaClass} placeholder="How can we help you?" {...register("message")} />
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
          {status === "submitting" ? "Sending…" : "Send Enquiry"}
        </Button>
      </div>
    </form>
  );
}
