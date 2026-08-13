import type { ReactNode } from "react";
import type { FieldError } from "react-hook-form";

export function FieldShell({
  label,
  htmlFor,
  error,
  required,
  className = "",
  children,
}: {
  label: string;
  htmlFor: string;
  error?: FieldError | undefined;
  required?: boolean | undefined;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={htmlFor} className="text-sm font-medium text-foreground">
        {label}
        {required ? <span className="ml-0.5 text-destructive">*</span> : null}
      </label>
      {children}
      {error?.message ? (
        <p role="alert" className="text-xs font-medium text-destructive">
          {error.message}
        </p>
      ) : null}
    </div>
  );
}

export const inputClass =
  "h-11 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-ring focus:ring-2 focus:ring-ring/25";

export const selectClass = `${inputClass} appearance-none bg-[length:1rem] pr-9`;

export const textareaClass =
  "min-h-24 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-ring focus:ring-2 focus:ring-ring/25";

export function ConsentNote() {
  return (
    <span className="text-xs leading-relaxed text-muted-foreground">
      I agree to be contacted by Dearm Scholars Abroad Pvt. Ltd. regarding my study abroad enquiry, and I accept
      the privacy policy.
    </span>
  );
}

export function SuccessPanel({ title, reference, onReset }: { title: string; reference?: string | undefined; onReset: () => void }) {
  return (
    <div
      role="status"
      className="rounded-2xl border border-success/30 bg-success/8 p-6 text-center"
      aria-live="polite"
    >
      <div className="mx-auto grid size-12 place-items-center rounded-full bg-success/15">
        <svg viewBox="0 0 24 24" className="size-6 text-success" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Thank you for reaching out. A counsellor from our team will contact you shortly during working hours.
      </p>
      {reference ? (
        <p className="mt-2 text-xs font-medium text-muted-foreground">
          Reference: <span className="font-semibold text-foreground">{reference}</span>
        </p>
      ) : null}
      <button
        type="button"
        onClick={onReset}
        className="mt-5 text-sm font-semibold text-primary underline-offset-4 hover:underline"
      >
        Submit another enquiry
      </button>
    </div>
  );
}
