import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { submitLead } from "@/lib/leads.functions";
import type { LeadType } from "@/lib/leads.schema";

export function useLeadSubmit(type: LeadType, source: string) {
  const send = useServerFn(submitLead);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [reference, setReference] = useState<string>();

  async function submit(values: Record<string, string | boolean | undefined>) {
    setStatus("submitting");
    try {
      const payload: Record<string, string | boolean> = {};
      for (const [key, value] of Object.entries(values)) {
        if (value !== undefined) payload[key] = value;
      }
      const result = await send({ data: { type, source, payload } });
      setReference(result.reference);
      setStatus("success");
      return true;
    } catch (error) {
      console.error("Lead submission failed", error);
      setStatus("error");
      return false;
    }
  }

  return { status, reference, submit, reset: () => setStatus("idle") };
}
