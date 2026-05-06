import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Activity, Bell, CalendarClock, ClipboardList, FileText, HeartPulse,
  Mail, Pill, Search, Sparkles, Stethoscope, Users, BedDouble, FlaskConical,
  Ambulance, Settings, LayoutDashboard, UserPlus, ShieldAlert, TrendingUp,
  Phone, ChevronRight, Clock, CheckCircle2, AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import ChatBot from "@/components/ChatBot";
import GuidedTour, { type TourStep } from "@/components/GuidedTour";

export const Route = createFileRoute("/")({ component: Index });

const tourSteps: TourStep[] = [
  {
    targetId: "tour-kpis",
    badge: "New Metrics",
    title: "Live Hospital KPIs",
    body: "Bed occupancy, ER wait time, and discharge throughput now refresh every 60 seconds at the top of the dashboard.",
  },
  {
    targetId: "tour-register",
    badge: "Workflow Update",
    title: "Faster Patient Registration",
    body: "Insurance pre-fill is automatic — Sara only has to confirm the policy. The required fields are now down to 4.",
  },
  {
    targetId: "tour-queue",
    badge: "New Triage View",
    title: "Real-time Triage Queue",
    body: "Patients are now color-coded by acuity. Critical (red) auto-pages the on-call doctor.",
  },
  {
    targetId: "tour-beds",
    badge: "Updated",
    title: "Ward Bed Map",
    body: "Cleaning status is visible per bed. A bed must be marked 'Sanitized' before it can be reassigned.",
  },
  {
    targetId: "tour-emails",
    badge: "New Feature",
    title: "Scheduled Patient Emails",
    body: "Discharge follow-ups and appointment reminders can now be scheduled in batches up to 30 days out.",
  },
  {
    targetId: "tour-labs",
    badge: "Protocol Update",
    title: "Lab Results Inbox",
    body: "Critical values are flagged and acknowledged inline — no more separate fax tray.",
  },
  {
    targetId: "tour-staff",
    badge: "New",
    title: "Staff On-Call Roster",
    body: "Tap any name to page directly. The roster pulls from the new shift planner.",
  },
];

function Index() {
  const [tourOpen, setTourOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-60 shrink-0 flex-col border-r border-border bg-card">
        <div className="flex items-center gap-3 px-5 py-5 border-b border-border">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <HeartPulse className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">St. Vireo Health</p>
            <p className="text-xs text-muted-foreground">Mercy Wing</p>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1 text-sm">
          <NavItem icon={<LayoutDashboard className="h-4 w-4" />} label="Dashboard" active />
          <NavItem icon={<UserPlus className="h-4 w-4" />} label="Registration" />
          <NavItem icon={<Users className="h-4 w-4" />} label="Patients" badge="248" />
          <NavItem icon={<Stethoscope className="h-4 w-4" />} label="Triage" />
          <NavItem icon={<BedDouble className="h-4 w-4" />} label="Wards & Beds" />
          <NavItem icon={<CalendarClock className="h-4 w-4" />} label="Appointments" />
          <NavItem icon={<FlaskConical className="h-4 w-4" />} label="Lab Results" badge="7" />
          <NavItem icon={<Pill className="h-4 w-4" />} label="Pharmacy" />
          <NavItem icon={<Mail className="h-4 w-4" />} label="Communications" />
          <NavItem icon={<Ambulance className="h-4 w-4" />} label="ER Dispatch" />
          <NavItem icon={<ClipboardList className="h-4 w-4" />} label="Reports" />
          <NavItem icon={<ShieldAlert className="h-4 w-4" />} label="Compliance" />
          <NavItem icon={<Settings className="h-4 w-4" />} label="Settings" />
        </nav>
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-primary text-primary-foreground text-xs">SR</AvatarFallback>
            </Avatar>
            <div className="text-xs">
              <p className="font-medium text-foreground">Sara Reyes</p>
              <p className="text-muted-foreground">Patient Registrar</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
          <div className="flex items-center gap-3 px-4 lg:px-8 py-3">
            <div className="flex-1 max-w-xl relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search patients, MRN, rooms…" className="pl-9 h-10" />
            </div>
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-[10px] text-destructive-foreground flex items-center justify-center">3</span>
            </Button>
            <Button onClick={() => setTourOpen(true)} className="gap-2">
              <Sparkles className="h-4 w-4" />
              Demo Change
            </Button>
          </div>
        </header>

        <main className="p-4 lg:p-8 space-y-6">
          {/* Welcome + alert */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Good morning, Sara</h1>
              <p className="text-sm text-muted-foreground">Wednesday, May 6 • 7 protocol updates this week</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2"><UserPlus className="h-4 w-4" />Register patient</Button>
              <Button variant="outline" className="gap-2"><Phone className="h-4 w-4" />Page on-call</Button>
            </div>
          </div>

          {/* KPIs */}
          <div id="tour-kpis" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Kpi icon={<BedDouble />} label="Bed Occupancy" value="86%" trend="+3% vs yesterday" tone="primary" progress={86} />
            <Kpi icon={<Clock />} label="ER Wait Time" value="22 min" trend="−6 min" tone="secondary" progress={40} />
            <Kpi icon={<Users />} label="Patients Today" value="248" trend="+12 admissions" tone="accent" progress={70} />
            <Kpi icon={<TrendingUp />} label="Discharges" value="34" trend="On target" tone="primary" progress={55} />
          </div>

          {/* Row: Registration + Triage */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Registration */}
            <Card id="tour-register" className="p-5 xl:col-span-1">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <UserPlus className="h-5 w-5 text-primary" />
                  <h2 className="font-semibold">Quick Registration</h2>
                </div>
                <Badge className="bg-secondary text-secondary-foreground">Updated</Badge>
              </div>
              <div className="space-y-3">
                <Field label="Full name" placeholder="Patient legal name" />
                <div className="grid grid-cols-2 gap-3">
                  <Field label="DOB" placeholder="MM/DD/YYYY" />
                  <Field label="MRN" placeholder="Auto-generated" />
                </div>
                <Field label="Insurance Policy #" placeholder="Auto-filled ✓" />
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <CheckCircle2 className="h-3.5 w-3.5 text-secondary" />
                  Insurance verified via Aetna API
                </div>
                <Button className="w-full">Admit & assign bed</Button>
              </div>
            </Card>

            {/* Triage queue */}
            <Card id="tour-queue" className="p-5 xl:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Stethoscope className="h-5 w-5 text-primary" />
                  <h2 className="font-semibold">Triage Queue</h2>
                </div>
                <Badge variant="outline">Live · 12 waiting</Badge>
              </div>
              <div className="space-y-2">
                <TriageRow acuity="critical" name="James O'Connor" complaint="Chest pain, diaphoresis" wait="2m" room="ER-1" />
                <TriageRow acuity="urgent" name="Marta Klein" complaint="Severe abdominal pain" wait="11m" room="ER-3" />
                <TriageRow acuity="urgent" name="Devon Park" complaint="Open laceration, R forearm" wait="14m" room="—" />
                <TriageRow acuity="standard" name="Aisha Rahman" complaint="Fever 39.1°C, 5d" wait="28m" room="—" />
                <TriageRow acuity="minor" name="Luca Bianchi" complaint="Sprained ankle" wait="46m" room="—" />
              </div>
            </Card>
          </div>

          {/* Tabs row */}
          <Tabs defaultValue="beds" className="w-full">
            <TabsList>
              <TabsTrigger value="beds">Wards</TabsTrigger>
              <TabsTrigger value="appointments">Appointments</TabsTrigger>
              <TabsTrigger value="emails">Scheduled Emails</TabsTrigger>
              <TabsTrigger value="meds">Pharmacy</TabsTrigger>
            </TabsList>

            <TabsContent value="beds">
              <Card id="tour-beds" className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold flex items-center gap-2"><BedDouble className="h-5 w-5 text-primary" />Ward Bed Map — 3rd Floor</h2>
                  <div className="flex gap-2 text-xs">
                    <LegendDot color="bg-secondary" label="Available" />
                    <LegendDot color="bg-primary" label="Occupied" />
                    <LegendDot color="bg-accent" label="Cleaning" />
                    <LegendDot color="bg-destructive" label="Reserved" />
                  </div>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-10 gap-2">
                  {Array.from({ length: 30 }).map((_, i) => {
                    const states = ["bg-primary/80", "bg-secondary/70", "bg-accent", "bg-destructive/70", "bg-primary/80", "bg-primary/80"];
                    const c = states[i % states.length];
                    return (
                      <div key={i} className={`aspect-square rounded-lg ${c} text-white flex items-center justify-center text-xs font-medium`}>
                        {301 + i}
                      </div>
                    );
                  })}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="appointments">
              <Card className="p-5">
                <h2 className="font-semibold mb-4 flex items-center gap-2"><CalendarClock className="h-5 w-5 text-primary" />Today's Appointments</h2>
                <div className="divide-y divide-border">
                  {[
                    ["09:00", "Eli Hartman", "Cardiology · Dr. Patel", "Check-in"],
                    ["09:30", "Noor Habib", "Radiology MRI · Dr. Vasquez", "In progress"],
                    ["10:15", "Theodore Lin", "Orthopedics · Dr. Khan", "Scheduled"],
                    ["11:00", "Penelope Voss", "Endocrine · Dr. Patel", "Scheduled"],
                    ["13:00", "Marcus Yates", "Post-op Follow-up", "Scheduled"],
                  ].map(([time, name, dept, status]) => (
                    <div key={name} className="flex items-center justify-between py-3">
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-sm w-14 text-muted-foreground">{time}</span>
                        <div>
                          <p className="font-medium text-sm">{name}</p>
                          <p className="text-xs text-muted-foreground">{dept}</p>
                        </div>
                      </div>
                      <Badge variant="outline">{status}</Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="emails">
              <Card id="tour-emails" className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold flex items-center gap-2"><Mail className="h-5 w-5 text-primary" />Scheduled Patient Emails</h2>
                  <Button size="sm" variant="outline">+ New campaign</Button>
                </div>
                <div className="space-y-2">
                  <EmailRow subject="Discharge follow-up — Cardiology" recipients="38 patients" when="Tomorrow · 09:00" status="Queued" />
                  <EmailRow subject="Pre-op fasting reminder" recipients="14 patients" when="May 8 · 18:00" status="Queued" />
                  <EmailRow subject="Annual physical reminder" recipients="612 patients" when="May 10 · 08:00" status="Draft" />
                  <EmailRow subject="Flu vaccine availability" recipients="2,140 patients" when="May 12 · 07:30" status="Queued" />
                  <EmailRow subject="Billing statement — April" recipients="847 patients" when="Sent · May 1" status="Sent" />
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="meds">
              <Card className="p-5">
                <h2 className="font-semibold mb-4 flex items-center gap-2"><Pill className="h-5 w-5 text-primary" />Pharmacy Orders</h2>
                <div className="space-y-2 text-sm">
                  {[
                    ["Lisinopril 10mg", "Bay 4 · J. O'Connor", "Pending"],
                    ["Amoxicillin 500mg", "Bay 7 · M. Klein", "Dispensed"],
                    ["Insulin Glargine", "Ward 3 · A. Rahman", "Pending"],
                    ["Morphine 4mg IV", "ER-1 · J. O'Connor", "Verify"],
                  ].map(([name, who, status]) => (
                    <div key={name} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                      <div>
                        <p className="font-medium">{name}</p>
                        <p className="text-xs text-muted-foreground">{who}</p>
                      </div>
                      <Badge variant={status === "Dispensed" ? "outline" : "default"}>{status}</Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Bottom row: Labs + Staff */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card id="tour-labs" className="p-5 lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold flex items-center gap-2"><FlaskConical className="h-5 w-5 text-primary" />Lab Results Inbox</h2>
                <Badge className="bg-destructive text-destructive-foreground">2 critical</Badge>
              </div>
              <div className="divide-y divide-border">
                <LabRow patient="James O'Connor" test="Troponin I" value="0.84 ng/mL" flag="critical" />
                <LabRow patient="Marta Klein" test="Lipase" value="612 U/L" flag="critical" />
                <LabRow patient="Aisha Rahman" test="CBC w/ diff" value="Normal" flag="normal" />
                <LabRow patient="Devon Park" test="Wound culture" value="Pending" flag="pending" />
                <LabRow patient="Penelope Voss" test="HbA1c" value="7.8%" flag="abnormal" />
              </div>
            </Card>

            <Card id="tour-staff" className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold flex items-center gap-2"><Users className="h-5 w-5 text-primary" />On-Call Roster</h2>
                <Badge variant="outline">Day shift</Badge>
              </div>
              <div className="space-y-3">
                {[
                  ["Dr. Anika Patel", "Cardiology", "AP"],
                  ["Dr. Marcus Khan", "Orthopedics", "MK"],
                  ["Dr. Helena Vasquez", "Radiology", "HV"],
                  ["RN Theo Brooks", "ER Charge", "TB"],
                  ["RN Yuki Tanaka", "Ward 3", "YT"],
                ].map(([name, role, init]) => (
                  <div key={name} className="flex items-center gap-3">
                    <Avatar className="h-9 w-9"><AvatarFallback className="bg-primary-soft text-primary text-xs">{init}</AvatarFallback></Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{name}</p>
                      <p className="text-xs text-muted-foreground">{role}</p>
                    </div>
                    <Button variant="ghost" size="icon"><Phone className="h-4 w-4" /></Button>
                  </div>
                ))}
              </div>
              <Separator className="my-4" />
              <div className="text-xs text-muted-foreground flex items-center gap-2">
                <ShieldAlert className="h-3.5 w-3.5" /> HIPAA audit log: 2,341 events today
              </div>
            </Card>
          </div>
        </main>
      </div>

      <GuidedTour steps={tourSteps} open={tourOpen} onClose={() => setTourOpen(false)} />
      <ChatBot />
    </div>
  );
}

function NavItem({ icon, label, active, badge }: { icon: React.ReactNode; label: string; active?: boolean; badge?: string }) {
  return (
    <button className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${active ? "bg-primary-soft text-primary font-medium" : "text-foreground hover:bg-muted"}`}>
      {icon}
      <span className="flex-1">{label}</span>
      {badge && <Badge variant="outline" className="text-xs">{badge}</Badge>}
    </button>
  );
}

function Kpi({ icon, label, value, trend, progress, tone }: { icon: React.ReactNode; label: string; value: string; trend: string; progress: number; tone: "primary" | "secondary" | "accent" }) {
  const toneMap = { primary: "bg-primary-soft text-primary", secondary: "bg-secondary/20 text-secondary", accent: "bg-accent text-accent-foreground" };
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div className={`h-9 w-9 rounded-lg flex items-center justify-center ${toneMap[tone]}`}>{icon}</div>
        <span className="text-xs text-muted-foreground">{trend}</span>
      </div>
      <p className="mt-3 text-2xl font-semibold">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
      <Progress value={progress} className="mt-3 h-1.5" />
    </Card>
  );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      <Input placeholder={placeholder} className="mt-1" />
    </div>
  );
}

function TriageRow({ acuity, name, complaint, wait, room }: { acuity: "critical" | "urgent" | "standard" | "minor"; name: string; complaint: string; wait: string; room: string }) {
  const colors: Record<string, string> = {
    critical: "bg-destructive text-destructive-foreground",
    urgent: "bg-orange-500/80 text-white",
    standard: "bg-secondary text-secondary-foreground",
    minor: "bg-muted text-muted-foreground",
  };
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50">
      <span className={`text-[10px] uppercase tracking-wide font-bold px-2 py-1 rounded ${colors[acuity]}`}>{acuity}</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{name}</p>
        <p className="text-xs text-muted-foreground truncate">{complaint}</p>
      </div>
      <div className="text-right text-xs">
        <p className="font-medium">{room}</p>
        <p className="text-muted-foreground">{wait}</p>
      </div>
      <ChevronRight className="h-4 w-4 text-muted-foreground" />
    </div>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return <span className="flex items-center gap-1.5 text-muted-foreground"><span className={`h-2.5 w-2.5 rounded-full ${color}`} />{label}</span>;
}

function EmailRow({ subject, recipients, when, status }: { subject: string; recipients: string; when: string; status: string }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg border border-border">
      <div className="flex items-center gap-3 min-w-0">
        <Mail className="h-4 w-4 text-primary shrink-0" />
        <div className="min-w-0">
          <p className="text-sm font-medium truncate">{subject}</p>
          <p className="text-xs text-muted-foreground truncate">{recipients} · {when}</p>
        </div>
      </div>
      <Badge variant={status === "Sent" ? "outline" : status === "Draft" ? "secondary" : "default"}>{status}</Badge>
    </div>
  );
}

function LabRow({ patient, test, value, flag }: { patient: string; test: string; value: string; flag: "critical" | "abnormal" | "normal" | "pending" }) {
  const icon = flag === "critical" ? <AlertTriangle className="h-4 w-4 text-destructive" /> :
               flag === "abnormal" ? <Activity className="h-4 w-4 text-orange-500" /> :
               flag === "pending" ? <Clock className="h-4 w-4 text-muted-foreground" /> :
               <CheckCircle2 className="h-4 w-4 text-secondary" />;
  return (
    <div className="flex items-center gap-3 py-3">
      {icon}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium">{patient}</p>
        <p className="text-xs text-muted-foreground">{test}</p>
      </div>
      <span className="text-sm font-mono">{value}</span>
      <Badge variant={flag === "critical" ? "destructive" : "outline"} className="capitalize">{flag}</Badge>
    </div>
  );
}
