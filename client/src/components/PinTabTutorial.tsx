import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface PinTabTutorialProps {
  showAfterBreakdown?: boolean;
}

export default function PinTabTutorial({ showAfterBreakdown = false }: PinTabTutorialProps) {
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    // Home page: always show
    if (showAfterBreakdown) {
      setShowTutorial(true);
      return;
    }

    // CurrentTasks page: show only on first visit (no tasks loaded yet)
    const hasSeenTutorialOnCurrentTasks = localStorage.getItem("doTheThing_pinTabTutorialSeenOnCurrentTasks");
    if (!hasSeenTutorialOnCurrentTasks) {
      setShowTutorial(true);
      localStorage.setItem("doTheThing_pinTabTutorialSeenOnCurrentTasks", "true");
    }
  }, [showAfterBreakdown]);

  if (!showTutorial) return null;

  // Position: bottom-right for CurrentTasks, inline for Home after BREAK IT DOWN
  const positionClass = showAfterBreakdown ? "" : "fixed bottom-6 right-6 z-50";
  const containerClass = showAfterBreakdown ? "border-4 border-foreground bg-card p-4 mt-4" : "border-4 border-foreground bg-card p-4 relative";

  return (
    <div className={`${positionClass} ${showAfterBreakdown ? "" : "max-w-xs"}`}>
      {/* Pixel-art speech bubble */}
      <div className={containerClass}>
        {/* Speech bubble pointer - only show for fixed position */}
        {!showAfterBreakdown && (
          <div className="absolute -bottom-3 right-6 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-foreground"></div>
        )}
        
        <div className="flex items-start gap-3">
          {/* Pixel-art character */}
          <div className="flex-shrink-0 text-2xl font-vt323">
            💾
          </div>
          
          <div className="flex-1">
            <p className="font-vt323 text-sm text-foreground leading-tight mb-3">
              Pro Tip: Pin this tab so I stay safe while you work!
            </p>
            <p className="font-vt323 text-xs text-muted-foreground mb-3">
              Right-click the tab and hit "Pin" to keep DoTheThing always visible.
            </p>
            
            <button
              onClick={() => setShowTutorial(false)}
              className="px-3 py-1 border-2 border-border bg-background text-foreground hover:bg-accent hover:text-white font-vt323 text-xs transition-colors"
            >
              GOT IT
            </button>
          </div>
          
          {/* Close button */}
          <button
            onClick={() => setShowTutorial(false)}
            className="flex-shrink-0 text-foreground hover:text-accent transition-colors"
            aria-label="Close tutorial"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
