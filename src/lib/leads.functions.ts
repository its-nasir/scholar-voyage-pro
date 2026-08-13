import { createServerFn } from "@tanstack/react-start";
import { leadSchema } from "./leads.schema";
import { recordLead } from "./leads.server";

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => leadSchema.parse(data))
  .handler(async ({ data }) => recordLead(data));
