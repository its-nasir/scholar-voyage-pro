import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";

import { listTeam, setTeamRole, revokeTeamRole, type TeamMember } from "@/lib/team.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function errorMessage(error: unknown) {
  const raw = error instanceof Error ? error.message : "Something went wrong";
  return raw.replace(/^Forbidden:\s*/, "").replace(/^Error:\s*/, "");
}

export function TeamAccessPanel({ currentUserId }: { currentUserId: string | null }) {
  const fetchTeam = useServerFn(listTeam);
  const grantRole = useServerFn(setTeamRole);
  const removeRole = useServerFn(revokeTeamRole);

  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"staff" | "admin">("staff");
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setMembers(await fetchTeam());
    } catch (error) {
      toast.error(errorMessage(error));
    } finally {
      setLoading(false);
    }
  }, [fetchTeam]);

  useEffect(() => {
    void load();
  }, [load]);

  async function handleGrant(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await grantRole({ data: { email, role } });
      toast.success(`${email} ko ${role} access mil gaya`);
      setEmail("");
      await load();
    } catch (error) {
      toast.error(errorMessage(error));
    } finally {
      setSaving(false);
    }
  }

  async function handleRevoke(member: TeamMember, r: "staff" | "admin") {
    try {
      await removeRole({ data: { userId: member.userId, role: r } });
      toast.success("Access removed");
      await load();
    } catch (error) {
      toast.error(errorMessage(error));
    }
  }

  const team = members.filter((m) => m.roles.some((r) => r === "admin" || r === "staff"));
  const others = members.filter((m) => !m.roles.some((r) => r === "admin" || r === "staff"));

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="font-heading text-xl">Team access</CardTitle>
        <p className="text-sm text-muted-foreground">
          Team member ko pehle <span className="font-medium">/auth</span> par sign up karna hoga,
          uske baad unka email yahan add karein.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleGrant} className="flex flex-col gap-3 sm:flex-row">
          <Input
            type="email"
            required
            placeholder="teammate@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="sm:max-w-xs"
          />
          <Select value={role} onValueChange={(v) => setRole(v as "staff" | "admin")}>
            <SelectTrigger className="sm:w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="staff">Staff</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>
          <Button type="submit" disabled={saving}>
            {saving ? "Adding…" : "Grant access"}
          </Button>
          <Button type="button" variant="outline" onClick={() => void load()} disabled={loading}>
            Refresh
          </Button>
        </form>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Roles</TableHead>
                <TableHead>Last sign in</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {team.map((member) => (
                <TableRow key={member.userId}>
                  <TableCell className="font-medium">
                    {member.email ?? "—"}
                    {member.userId === currentUserId && (
                      <span className="ml-2 text-xs text-muted-foreground">(you)</span>
                    )}
                  </TableCell>
                  <TableCell className="space-x-1">
                    {member.roles.map((r) => (
                      <Badge key={r} variant={r === "admin" ? "default" : "secondary"}>
                        {r}
                      </Badge>
                    ))}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {member.lastSignInAt
                      ? new Date(member.lastSignInAt).toLocaleString("en-IN")
                      : "Never"}
                  </TableCell>
                  <TableCell className="space-x-2 text-right">
                    {member.roles
                      .filter((r): r is "admin" | "staff" => r === "admin" || r === "staff")
                      .map((r) => (
                        <Button
                          key={r}
                          variant="ghost"
                          size="sm"
                          disabled={member.userId === currentUserId && r === "admin"}
                          onClick={() => void handleRevoke(member, r)}
                        >
                          Remove {r}
                        </Button>
                      ))}
                  </TableCell>
                </TableRow>
              ))}
              {!team.length && (
                <TableRow>
                  <TableCell colSpan={4} className="py-8 text-center text-muted-foreground">
                    {loading ? "Loading team…" : "No team members yet."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {others.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Signed-up accounts without access</p>
            <div className="flex flex-wrap gap-2">
              {others.map((m) => (
                <button
                  key={m.userId}
                  type="button"
                  onClick={() => setEmail(m.email ?? "")}
                  className="rounded-full border px-3 py-1 text-sm text-muted-foreground transition hover:bg-muted"
                >
                  {m.email ?? m.userId}
                </button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
