import { useEffect, useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export type TourStep = {
  targetId: string;
  title: string;
  body: string;
  badge?: string;
};

interface GuidedTourProps {
  steps: TourStep[];
  open: boolean;
  onClose: () => void;
}

export function GuidedTour({ steps, open, onClose }: GuidedTourProps) {
  const [index, setIndex] = useState(0);
  const [rect, setRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (open) setIndex(0);
  }, [open]);

  const current = steps[index];

  useLayoutEffect(() => {
    if (!open || !current) return;
    const el = document.getElementById(current.targetId);
    if (!el) return;
    el.classList.add("tour-highlight");
    el.scrollIntoView({ behavior: "smooth", block: "center" });

    const update = () => setRect(el.getBoundingClientRect());
    update();
    const t = setTimeout(update, 350);
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
      el.classList.remove("tour-highlight");
    };
  }, [open, current]);

  if (!open || !current || typeof document === "undefined") return null;

  const tooltipStyle: React.CSSProperties = rect
    ? (() => {
        const margin = 16;
        const tooltipWidth = 360;
        const tooltipHeight = 260;
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;
        const placeBelow = spaceBelow >= tooltipHeight + margin || spaceBelow >= spaceAbove;
        let top = placeBelow ? rect.bottom + margin : rect.top - margin - tooltipHeight;
        // Clamp vertically so the tooltip is always fully visible
        top = Math.max(16, Math.min(top, window.innerHeight - tooltipHeight - 16));
        let left = rect.left + rect.width / 2 - tooltipWidth / 2;
        left = Math.max(16, Math.min(left, window.innerWidth - tooltipWidth - 16));
        return { top, left, width: tooltipWidth, maxHeight: window.innerHeight - 32, overflowY: "auto" };
      })()
    : { top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 360 };

  return createPortal(
    <div className="fixed inset-0 z-40">
      <div className="absolute inset-0 bg-foreground/40 backdrop-blur-[2px]" onClick={onClose} />
      <div
        role="dialog"
        aria-label={current.title}
        style={tooltipStyle}
        className="fixed z-50 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-soft)] animate-fade-in-up"
      >
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
            <Sparkles className="h-3.5 w-3.5" />
            {current.badge ?? "What's New"}
          </div>
          <button
            onClick={onClose}
            aria-label="Close tour"
            className="rounded-full p-1 text-muted-foreground hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <h3 className="mb-2 text-lg font-semibold text-foreground">{current.title}</h3>
        <p className="text-base leading-relaxed text-muted-foreground">{current.body}</p>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Step {index + 1} of {steps.length}
          </span>
          <div className="flex gap-2">
            {index > 0 && (
              <Button variant="outline" size="sm" onClick={() => setIndex((i) => i - 1)}>
                <ArrowLeft className="mr-1 h-4 w-4" /> Back
              </Button>
            )}
            {index < steps.length - 1 ? (
              <Button size="sm" onClick={() => setIndex((i) => i + 1)}>
                Next <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            ) : (
              <Button size="sm" onClick={onClose}>
                Got it
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default GuidedTour;