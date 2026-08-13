import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

type Role = "admin" | "staff" | "user";

export type TeamMember = {
  userId: string;
  email: string | null;
  roles: Role[];
  createdAt: string;
  lastSignInAt: string | null;
};

async function assertAdmin(context: { supabase: { rpc: Function }; userId: string }) {
  const { data, error } = await (context.supabase.rpc as any)("has_role", {
    _user_id: context.userId,
    _role: "admin",
  });
  if (error || !data) throw new Error("Forbidden: admin access required");
}

export const listTeam = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<TeamMember[]> => {
    await assertAdmin(context as never);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: usersData, error: usersError } = await supabaseAdmin.auth.admin.listUsers({
      page: 1,
      perPage: 200,
    });
    if (usersError) throw new Error("Could not load team members");

    const { data: roleRows, error: rolesError } = await supabaseAdmin
      .from("user_roles")
      .select("user_id, role");
    if (rolesError) throw new Error("Could not load roles");

    const rolesByUser = new Map<string, Role[]>();
    for (const row of roleRows ?? []) {
      const list = rolesByUser.get(row.user_id) ?? [];
      list.push(row.role as Role);
      rolesByUser.set(row.user_id, list);
    }

    return usersData.users.map((u) => ({
      userId: u.id,
      email: u.email ?? null,
      roles: rolesByUser.get(u.id) ?? [],
      createdAt: u.created_at,
      lastSignInAt: u.last_sign_in_at ?? null,
    }));
  });

export const setTeamRole = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { email: string; role: Role }) => {
    const email = String(data?.email ?? "").trim().toLowerCase();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) throw new Error("Enter a valid email address");
    const role = data?.role;
    if (role !== "admin" && role !== "staff") throw new Error("Role must be admin or staff");
    return { email, role };
  })
  .handler(async ({ data, context }) => {
    await assertAdmin(context as never);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: usersData, error } = await supabaseAdmin.auth.admin.listUsers({
      page: 1,
      perPage: 200,
    });
    if (error) throw new Error("Could not look up users");

    const user = usersData.users.find((u) => (u.email ?? "").toLowerCase() === data.email);
    if (!user) {
      throw new Error(
        "No account found with this email. Ask them to sign up at /auth first, then grant access.",
      );
    }

    const { error: insertError } = await supabaseAdmin
      .from("user_roles")
      .upsert({ user_id: user.id, role: data.role }, { onConflict: "user_id,role" });
    if (insertError) throw new Error("Could not grant access");

    return { ok: true as const, email: data.email, role: data.role };
  });

export const revokeTeamRole = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { userId: string; role: Role }) => {
    if (!data?.userId) throw new Error("Missing user");
    if (data.role !== "admin" && data.role !== "staff") throw new Error("Invalid role");
    return { userId: data.userId, role: data.role };
  })
  .handler(async ({ data, context }) => {
    await assertAdmin(context as never);
    if (data.userId === (context as { userId: string }).userId && data.role === "admin") {
      throw new Error("You cannot remove your own admin access");
    }
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("user_roles")
      .delete()
      .eq("user_id", data.userId)
      .eq("role", data.role);
    if (error) throw new Error("Could not remove access");
    return { ok: true as const };
  });
