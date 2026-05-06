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
    badge: "New Protocol",
    title: "Updated Medication Administration Schedule",
    body:
      "Evening rounds have shifted from 8:00 PM to 7:30 PM, and a new lunchtime Vitamin D dose was added to the standing orders. Patient reminders on the ward tablets have already been updated.",
  },
  {
    targetId: "card-vitals",
    badge: "Protocol Update",
    title: "Reduced Vitals Frequency",
    body:
      "For stable patients, vitals are now recorded twice per shift instead of every two hours. Use clinical judgement to escalate if a reading falls outside the new thresholds.",
  },
  {
    targetId: "card-notes",
    badge: "Workflow Change",
    title: "Patient Registration Notes Streamlined",
    body:
      "When registering a patient, free-text notes are now optional. Only add a note if there is something the next shift needs to know — quality over quantity.",
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
              <p className="text-sm text-muted-foreground">Welcome back, Sara</p>
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
              <h2 className="text-lg font-semibold text-foreground">3 protocol updates this week</h2>
              <p className="mt-1 text-base text-muted-foreground">
                A few workflow changes affect your registration and rounding tasks. Tap{" "}
                <span className="font-medium text-foreground">Demo Change</span> for a quick walkthrough.
              </p>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <DashboardCard
            id="card-medication"
            icon={<Pill className="h-6 w-6" />}
            title="Medication Administration"
            isNew
            highlight
          >
            <ul className="space-y-2 text-base text-muted-foreground">
              <li>• 8:00 AM — Lisinopril 10mg (standing)</li>
              <li>• 12:30 PM — New: Vitamin D 1000 IU</li>
              <li>• 7:30 PM — Metformin 500mg (shifted from 8:00 PM)</li>
            </ul>
          </DashboardCard>

          <DashboardCard
            id="card-vitals"
            icon={<Activity className="h-6 w-6" />}
            title="Vitals Rounds"
            isNew
          >
            <p className="text-base text-muted-foreground">
              Twice per shift for stable patients. Last bay average was a calm{" "}
              <span className="font-medium text-foreground">122 / 78</span>.
            </p>
          </DashboardCard>

          <DashboardCard
            id="card-notes"
            icon={<FileText className="h-6 w-6" />}
            title="Registration Notes"
            isNew
          >
            <p className="text-base text-muted-foreground">
              Optional during patient intake. Add a note only when the next shift needs context.
            </p>
          </DashboardCard>

          <DashboardCard
            icon={<CalendarClock className="h-6 w-6" />}
            title="Today's Admissions"
          >
            <p className="text-base text-muted-foreground">
              4 patients booked in for registration before noon — next: 10:00 AM with Dr. Patel.
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
