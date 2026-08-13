import { useCallback, useEffect, useMemo, useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Logo } from "@/components/Logo";
import { TeamAccessPanel } from "@/components/admin/TeamAccessPanel";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Enquiry Dashboard | Dearm Scholars Abroad" },
      {
        name: "description",
        content: "Internal dashboard to review and manage student enquiries received from the website.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Enquiry Dashboard | Dearm Scholars Abroad" },
      { property: "og:description", content: "Internal enquiry management dashboard." },
    ],
  }),
  component: AdminPage,
});

type Lead = {
  id: string;
  reference: string;
  type: string;
  source: string | null;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  country: string | null;
  course: string | null;
  payload: Record<string, unknown> | null;
  status: string;
  notes: string | null;
  created_at: string;
};

const TYPE_LABELS: Record<string, string> = {
  enquiry: "Free Profile Enquiry",
  counselling: "Free Counselling",
  contact: "Contact Message",
  scholarship: "Scholarship Eligibility",
  course: "Course Enquiry",
  story: "Success Story",
};

const STATUSES = ["new", "contacted", "in-progress", "closed"] as const;

function formatDate(value: string) {
  return new Date(value).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function fieldLabel(key: string) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (c) => c.toUpperCase())
    .trim();
}

function AdminPage() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [active, setActive] = useState<Lead | null>(null);

  const loadLeads = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);
    setLoading(false);
    if (error) {
      toast.error("Could not load enquiries");
      return;
    }
    setLeads((data ?? []) as Lead[]);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function bootstrap() {
      const { data } = await supabase.auth.getSession();
      const session = data.session;
      if (!session) {
        navigate({ to: "/auth" });
        return;
      }
      if (cancelled) return;
      setUserEmail(session.user.email ?? null);
      setUserId(session.user.id);

      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id);

      const isStaff = (roles ?? []).some((r) => r.role === "admin" || r.role === "staff");
      if (cancelled) return;
      setIsAdmin((roles ?? []).some((r) => r.role === "admin"));
      setAllowed(isStaff);
      setChecking(false);
      if (isStaff) void loadLeads();
    }

    void bootstrap();
    return () => {
      cancelled = true;
    };
  }, [navigate, loadLeads]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return leads.filter((lead) => {
      if (typeFilter !== "all" && lead.type !== typeFilter) return false;
      if (statusFilter !== "all" && lead.status !== statusFilter) return false;
      if (!q) return true;
      return [lead.full_name, lead.email, lead.phone, lead.country, lead.course, lead.reference]
        .filter(Boolean)
        .some((v) => (v as string).toLowerCase().includes(q));
    });
  }, [leads, search, statusFilter, typeFilter]);

  async function updateStatus(lead: Lead, status: string) {
    const { error } = await supabase.from("leads").update({ status }).eq("id", lead.id);
    if (error) {
      toast.error("Could not update status");
      return;
    }
    setLeads((prev) => prev.map((l) => (l.id === lead.id ? { ...l, status } : l)));
    setActive((prev) => (prev && prev.id === lead.id ? { ...prev, status } : prev));
    toast.success("Status updated");
  }

  function exportCsv() {
    const headers = ["Reference", "Type", "Date", "Name", "Email", "Phone", "Country", "Course", "Status", "Source"];
    const rows = filtered.map((l) => [
      l.reference,
      TYPE_LABELS[l.type] ?? l.type,
      formatDate(l.created_at),
      l.full_name ?? "",
      l.email ?? "",
      l.phone ?? "",
      l.country ?? "",
      l.course ?? "",
      l.status,
      l.source ?? "",
    ]);
    const csv = [headers, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `dsa-enquiries-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  }

  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-muted/30">
        <p className="text-muted-foreground">Checking your access…</p>
      </main>
    );
  }

  if (!allowed) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
        <Card className="max-w-md rounded-2xl text-center">
          <CardHeader>
            <CardTitle className="font-heading text-2xl">No dashboard access</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {userEmail} is signed in but has not been granted team access yet. Ask an
              administrator to add your account.
            </p>
            <div className="flex justify-center gap-3">
              <Button variant="outline" onClick={signOut}>
                Sign out
              </Button>
              <Button asChild>
                <Link to="/">Back to website</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    );
  }

  const counts = STATUSES.map((s) => ({ status: s, count: leads.filter((l) => l.status === s).length }));

  return (
    <main className="min-h-screen bg-muted/30 pb-16">
      <header className="border-b bg-background">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4">
          <div className="flex items-center gap-4">
            <Logo />
            <span className="hidden text-sm text-muted-foreground sm:inline">Enquiry Dashboard</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="hidden text-muted-foreground md:inline">{userEmail}</span>
            <Button variant="outline" size="sm" asChild>
              <Link to="/">Website</Link>
            </Button>
            <Button variant="ghost" size="sm" onClick={signOut}>
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl space-y-6 px-4 py-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <Card className="rounded-2xl">
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">Total enquiries</p>
              <p className="font-heading text-3xl">{leads.length}</p>
            </CardContent>
          </Card>
          {counts.map(({ status, count }) => (
            <Card key={status} className="rounded-2xl">
              <CardContent className="p-5">
                <p className="text-sm capitalize text-muted-foreground">{status}</p>
                <p className="font-heading text-3xl">{count}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="rounded-2xl">
          <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <CardTitle className="font-heading text-xl">Enquiries</CardTitle>
            <div className="flex flex-wrap items-center gap-3">
              <Input
                placeholder="Search name, email, phone…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:w-64"
              />
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All types</SelectItem>
                  {Object.entries(TYPE_LABELS).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  {STATUSES.map((s) => (
                    <SelectItem key={s} value={s} className="capitalize">
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={() => void loadLeads()} disabled={loading}>
                Refresh
              </Button>
              <Button variant="outline" onClick={exportCsv} disabled={!filtered.length}>
                Export CSV
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Received</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Country / Course</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                        {formatDate(lead.created_at)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{TYPE_LABELS[lead.type] ?? lead.type}</Badge>
                      </TableCell>
                      <TableCell className="font-medium">{lead.full_name ?? "—"}</TableCell>
                      <TableCell className="text-sm">
                        <div>{lead.email ?? "—"}</div>
                        <div className="text-muted-foreground">{lead.phone ?? ""}</div>
                      </TableCell>
                      <TableCell className="text-sm">
                        <div>{lead.country ?? "—"}</div>
                        <div className="text-muted-foreground">{lead.course ?? ""}</div>
                      </TableCell>
                      <TableCell>
                        <Select value={lead.status} onValueChange={(v) => void updateStatus(lead, v)}>
                          <SelectTrigger className="w-[140px] capitalize">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {STATUSES.map((s) => (
                              <SelectItem key={s} value={s} className="capitalize">
                                {s}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => setActive(lead)}>
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {!filtered.length && (
                    <TableRow>
                      <TableCell colSpan={7} className="py-12 text-center text-muted-foreground">
                        {loading ? "Loading enquiries…" : "No enquiries match these filters yet."}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        {isAdmin && <TeamAccessPanel currentUserId={userId} />}
      </div>

      <Dialog open={!!active} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-heading">
              {active ? TYPE_LABELS[active.type] ?? active.type : ""}
            </DialogTitle>
            <DialogDescription>
              {active ? `${active.reference} · ${formatDate(active.created_at)}` : ""}
            </DialogDescription>
          </DialogHeader>
          {active && (
            <dl className="space-y-3 text-sm">
              {Object.entries(active.payload ?? {})
                .filter(([, v]) => v !== "" && v !== null && v !== undefined)
                .map(([key, value]) => (
                  <div key={key} className="grid grid-cols-3 gap-3 border-b pb-2 last:border-b-0">
                    <dt className="text-muted-foreground">{fieldLabel(key)}</dt>
                    <dd className="col-span-2 break-words">{String(value)}</dd>
                  </div>
                ))}
              <div className="grid grid-cols-3 gap-3">
                <dt className="text-muted-foreground">Source page</dt>
                <dd className="col-span-2">{active.source ?? "—"}</dd>
              </div>
            </dl>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}
