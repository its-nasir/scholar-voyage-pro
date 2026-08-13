import type { LeadInput } from "./leads.schema";

/**
 * Lead sink. Persists the lead in the database and returns a reference id.
 * Uses the service-role client so website visitors never need table access.
 */
export async function recordLead(lead: LeadInput) {
  const reference = `DSA-${Date.now().toString(36).toUpperCase()}`;
  const p = lead.payload as Record<string, string | boolean>;

  const str = (key: string) => (typeof p[key] === "string" ? (p[key] as string) : null);

  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { error } = await supabaseAdmin.from("leads").insert({
    reference,
    type: lead.type,
    source: lead.source ?? null,
    full_name: str("fullName"),
    email: str("email"),
    phone: str("phone"),
    country: str("country"),
    course: str("course"),
    payload: p,
  });

  if (error) {
    console.error("[lead] insert failed", error.message);
    throw new Error("We could not save your enquiry. Please try again or contact us on WhatsApp.");
  }

  console.info("[lead]", { type: lead.type, source: lead.source ?? "unknown", reference });

  return {
    ok: true as const,
    reference,
    receivedAt: new Date().toISOString(),
  };
}
