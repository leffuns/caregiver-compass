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
    el.style.outline = "4px solid red";
    el.style.boxShadow = "0 0 0 9999px rgba(0, 0, 0, 0.6)";
    el.style.position = "relative";
    el.style.zIndex = "85"; 
    
    // THE SCROLL FIX: 'nearest' is better than 'center' because it won't 
    // over-scroll and push your element against the very top edge.
    el.scrollIntoView({ behavior: "smooth", block: "nearest" });

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
      el.style.outline = "";
      el.style.boxShadow = "";
      el.style.position = "";
      el.style.zIndex = "";
    };
  }, [open, current, index]);

  if (!open || !current || typeof document === "undefined") return null;

  const isNarrow = typeof window !== "undefined" && window.innerWidth < 768;
  const tooltipStyle: React.CSSProperties = (() => {
    if (!rect) {
      return { top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 360, zIndex: 100 };
    }
    
    const margin = 20; 
    const tooltipWidth = 380;
    // We estimate height to ensure it doesn't get cut off
    const tooltipHeight = 280; 

    if (isNarrow) {
      return {
        left: 12, right: 12, bottom: 12,
        width: "auto", maxHeight: "45vh", overflowY: "auto", zIndex: 100 
      };
    }

    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    
    // If there's more room above than below, we put it above.
    const placeBelow = spaceBelow >= tooltipHeight + margin || spaceBelow >= spaceAbove;
    
    let top = placeBelow ? rect.bottom + margin : rect.top - margin - tooltipHeight;
    
    // THE SMART BORDER FIX: 
    // This line forces the 'top' value to stay between 20px and the bottom of the screen.
    // It prevents the "hiding" you see in your screenshot.
    top = Math.max(20, Math.min(top, window.innerHeight - tooltipHeight - 20));

    let left = rect.left + rect.width / 2 - tooltipWidth / 2;
    left = Math.max(20, Math.min(left, window.innerWidth - tooltipWidth - 20));
    
    return { 
      top, left, width: tooltipWidth, 
      maxHeight: window.innerHeight - 40, 
      overflowY: "auto", zIndex: 100 
    };
  })();

  return createPortal(
    <div className="fixed inset-0 z-[80]">
      <div className="absolute inset-0 bg-foreground/40 backdrop-blur-[2px]" onClick={onClose} />
      
      <div
        role="dialog"
        style={tooltipStyle}
        className="fixed z-[100] rounded-2xl border border-border bg-card p-5 shadow-2xl animate-fade-in-up"
      >
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
            <Sparkles className="h-3.5 w-3.5" />
            {current.badge ?? "What's New"}
          </div>
          <button onClick={onClose} className="rounded-full p-1 text-muted-foreground hover:bg-muted">
            <X className="h-4 w-4" />
          </button>
        </div>
        <h3 className="mb-2 text-lg font-semibold text-foreground">{current.title}</h3>
        <p className="text-base leading-relaxed text-muted-foreground">{current.body}</p>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Step {index + 1} of {steps.length}</span>
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
              <Button size="sm" onClick={onClose}>Got it</Button>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default GuidedTour;