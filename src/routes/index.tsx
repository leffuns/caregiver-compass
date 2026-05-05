import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Pill, CalendarClock, HeartPulse, Bell, Sparkles, FileText, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ChatBot from "@/components/ChatBot";
import GuidedTour, { type TourStep } from "@/components/GuidedTour";

export const Route = createFileRoute("/")({
  component: Index,
});

const tourSteps: TourStep[] = [
  {
    targetId: "card-medication",
    badge: "New Release",
    title: "Updated Medication Schedule",
    body:
      "Mom's evening dose has shifted from 8:00 PM to 7:30 PM, and a new low-dose tablet was added at lunch. Don't worry — we've already updated her reminders for you.",
  },
  {
    targetId: "card-vitals",
    badge: "Protocol Update",
    title: "Gentler Vitals Routine",
    body:
      "You now only need to check blood pressure twice a day instead of four. The care team agreed this is plenty for someone doing as well as she is.",
  },
  {
    targetId: "card-notes",
    badge: "Helpful Tip",
    title: "Daily Notes are Now Optional",
    body:
      "Writing a daily note is no longer required. Jot something down only when you notice a change worth sharing — quality over quantity.",
  },
];

function Index() {
  const [tourOpen, setTourOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-[var(--gradient-soft)]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <HeartPulse className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">Caregiver Portal</h1>
              <p className="text-sm text-muted-foreground">Welcome back, Sarah</p>
            </div>
          </div>
          <Button
            onClick={() => setTourOpen(true)}
            size="lg"
            className="gap-2"
          >
            <Sparkles className="h-5 w-5" />
            Demo Change
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        {/* What's New banner */}
        <Card className="mb-8 border-accent bg-accent/40 p-5">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
              <Bell className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-foreground">3 care updates this week</h2>
              <p className="mt-1 text-base text-muted-foreground">
                We've made a few changes to keep things simple. Tap{" "}
                <span className="font-medium text-foreground">Demo Change</span> for a quick walkthrough.
              </p>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <DashboardCard
            id="card-medication"
            icon={<Pill className="h-6 w-6" />}
            title="Medication Schedule"
            isNew
            highlight
          >
            <ul className="space-y-2 text-base text-muted-foreground">
              <li>• 8:00 AM — Lisinopril 10mg</li>
              <li>• 12:30 PM — New: Vitamin D 1000 IU</li>
              <li>• 7:30 PM — Metformin 500mg</li>
            </ul>
          </DashboardCard>

          <DashboardCard
            id="card-vitals"
            icon={<Activity className="h-6 w-6" />}
            title="Vitals Check"
            isNew
          >
            <p className="text-base text-muted-foreground">
              Twice daily — morning and evening. Last reading was a calm{" "}
              <span className="font-medium text-foreground">122 / 78</span>.
            </p>
          </DashboardCard>

          <DashboardCard
            id="card-notes"
            icon={<FileText className="h-6 w-6" />}
            title="Daily Notes"
            isNew
          >
            <p className="text-base text-muted-foreground">
              Optional. Share anything that feels important — even small wins.
            </p>
          </DashboardCard>

          <DashboardCard
            icon={<CalendarClock className="h-6 w-6" />}
            title="Upcoming Appointments"
          >
            <p className="text-base text-muted-foreground">
              Dr. Patel — Thursday, 10:00 AM (Telehealth)
            </p>
          </DashboardCard>
        </div>
      </main>

      <GuidedTour steps={tourSteps} open={tourOpen} onClose={() => setTourOpen(false)} />
      <ChatBot />
    </div>
  );
}

function DashboardCard({
  id,
  icon,
  title,
  children,
  isNew,
  highlight,
}: {
  id?: string;
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  isNew?: boolean;
  highlight?: boolean;
}) {
  return (
    <Card
      id={id}
      className={`relative p-6 transition-shadow ${highlight ? "ring-2 ring-primary/40" : ""}`}
    >
      {isNew && (
        <Badge className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground">
          New
        </Badge>
      )}
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      </div>
      {children}
    </Card>
  );
}
