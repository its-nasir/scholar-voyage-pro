import type { LeadInput } from "./leads.schema";

/**
 * Lead sink. Currently records the lead server-side and returns a reference id.
 *
 * INTEGRATION POINTS (add here without touching any UI code):
 *  - Email notification (transactional email provider)
 *  - CRM push
 *  - Google Sheets append
 *  - Database insert (for the future admin dashboard)
 *  - WhatsApp Business API notification
 */
export async function recordLead(lead: LeadInput) {
  const reference = `DSA-${Date.now().toString(36).toUpperCase()}`;

  // Minimal, non-sensitive server log for traceability.
  console.info("[lead]", { type: lead.type, source: lead.source ?? "unknown", reference });

  return {
    ok: true as const,
    reference,
    receivedAt: new Date().toISOString(),
  };
}
