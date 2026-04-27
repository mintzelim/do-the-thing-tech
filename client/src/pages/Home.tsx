import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import { useTimer } from "@/contexts/TimerContext";
import "../pixel-art-refined.css";

type Step = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  estimatedTime: number;
};

type FlowState = "input" | "breakdown" | "completion";
type GranularityPreset = "tiny" | "balanced" | "big";

export default function Home() {
  const [, navigate] = useLocation();
  const [flowState, setFlowState] = useState<FlowState>("input");
  const [brainDump, setBrainDump] = useState("");
  const [focusLevel, setFocusLevel] = useState<"hyperfocus" | "normal" | "distracted">("normal");
  const [granularity, setGranularity] = useState(50);
  const [granularityPreset, setGranularityPreset] = useState<GranularityPreset>("balanced");
  const [steps, setSteps] = useState<Step[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const {
    timerActive: globalTimerActive,
    timeRemaining: globalTimeRemaining,
    startTimer: globalStartTimer,
    stopTimer: globalStopTimer,
    adjustTime: globalAdjustTime,
  } = useTimer();
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);
  const clickSoundRef = useRef<HTMLAudioElement | null>(null);

  // Load persisted state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('doTheThing_state');
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        setBrainDump(parsed.brainDump || '');
        setFocusLevel(parsed.focusLevel || 'normal');
        setGranularity(parsed.granularity || 50);
        setGranularityPreset(parsed.granularityPreset || 'balanced');
        const savedSteps = parsed.steps || [];
        setSteps(savedSteps);
        // Only restore flowState if there are actually steps to work on
        // Otherwise, always start in 'input' state for fresh sessions
        if (savedSteps.length > 0) {
          setFlowState(parsed.flowState || 'input');
        } else {
          setFlowState('input');
        }
        // Timer state is managed by TimerContext
      } catch (error) {
        console.error('Failed to load saved state:', error);
      }
    }
  }, []);

  // Save state to local  // Save state to localStorage
  useEffect(() => {
    const state = {
      brainDump,
      focusLevel,
      granularity,
      granularityPreset,
      steps,
      flowState,
      timeRemaining: globalTimeRemaining,
      timerActive: globalTimerActive,
    };
    localStorage.setItem('doTheThing_state', JSON.stringify(state));
  }, [brainDump, focusLevel, granularity, granularityPreset, steps, flowState, globalTimeRemaining, globalTimerActive]);

  const breakdownMutation = trpc.tasks.breakdown.useMutation();
  // estimateMutation is no longer needed - breakdown handles estimation

  // Create click sound on component mount
  useEffect(() => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Store reference for later use
    clickSoundRef.current = { audioContext, oscillator, gainNode } as any;
  }, []);

  // Play mouse click sound
  const playClickSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const now = audioContext.currentTime;
      
      // Create a short, sharp click sound like a mouse click
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      const filter = audioContext.createBiquadFilter();
      
      oscillator.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Higher frequency for a sharp click
      oscillator.frequency.setValueAtTime(150, now);
      oscillator.frequency.exponentialRampToValueAtTime(50, now + 0.05);
      oscillator.type = "square";
      
      // Very short duration with quick fade
      gainNode.gain.setValueAtTime(0.2, now);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
      
      filter.type = "highpass";
      filter.frequency.value = 200;
      
      oscillator.start(now);
      oscillator.stop(now + 0.05);
    } catch (error) {
      console.error("Could not play sound:", error);
    }
  };

  // Tab close confirmation
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if ((steps.length > 0 && flowState === "breakdown") || globalTimerActive) {
        e.preventDefault();
        e.returnValue = "";
        return "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [steps, flowState, globalTimerActive]);

  // Global timer is managed by TimerContext

  const handleStartTimer = () => {
    const totalSeconds = steps
      .filter((step) => !step.completed)
      .reduce((sum, step) => sum + step.estimatedTime * 60, 0);
    globalStartTimer(totalSeconds);
  };

  const handleStopTimer = () => {
    globalStopTimer();
  };

  const handleGranularityPreset = (preset: GranularityPreset) => {
    setGranularityPreset(preset);
    if (preset === "tiny") setGranularity(20);
    if (preset === "balanced") setGranularity(50);
    if (preset === "big") setGranularity(80);
  };

  // Handle navigation with confirmation
  const handleNavigation = (path: string) => {
    if (flowState === "breakdown" && steps.length > 0 && !steps.every(s => s.completed)) {
      setPendingNavigation(path);
    } else {
      navigate(path);
    }
  };

  // Sync slider with presets when slider is manually adjusted
  const handleSliderChange = (value: number) => {
    setGranularity(value);
    // Auto-detect which preset the slider is closest to
    if (value <= 35) {
      setGranularityPreset("tiny");
    } else if (value <= 65) {
      setGranularityPreset("balanced");
    } else {
      setGranularityPreset("big");
    }
  };

  const handleBrainDumpSubmit = async () => {
    if (!brainDump.trim()) {
      toast.error("Please enter your tasks");
      return;
    }

    setIsLoading(true);
    try {
      // Breakdown now handles both breakdown AND time estimation
      const compiled = await breakdownMutation.mutateAsync({
        input: brainDump,
        granularity,
        focusLevel,
      });

      // Steps already have estimatedTime from Gemini
      const stepsWithIds = compiled.map((task: any, idx: number) => ({
        id: `step-${idx}`,
        title: task.title,
        description: task.description,
        completed: false,
        estimatedTime: task.estimatedTime || 15,
      }));

      setSteps(stepsWithIds);
      setFlowState("breakdown");
      // Redirect to current tasks page
      setTimeout(() => {
        navigate("/current-tasks");
      }, 500);
    } catch (error: any) {
      let errorMessage = error?.message || "Failed to process your input";
      const isRateLimit = errorMessage.includes("429") || errorMessage.includes("quota");
      
      // Handle rate limit errors with user-friendly message
      if (isRateLimit) {
        errorMessage = "Busy traffic. Try again in 60s";
        // Show a more prominent toast for rate limit errors
        toast.error(errorMessage, {
          duration: 5000,
          description: "The service is experiencing high traffic. Please wait a moment before trying again."
        });
      } else {
        toast.error(errorMessage);
      }
      
      setError(errorMessage);
      setRetryCount(prev => prev + 1);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleStepComplete = (stepId: string) => {
    playClickSound();

    setSteps((prev) => {
      const step = prev.find((s) => s.id === stepId);
      if (!step) return prev;

      const nextCompleted = !step.completed;
      const stepSeconds = step.estimatedTime * 60;

      if (globalTimerActive) {
        globalAdjustTime(nextCompleted ? -stepSeconds : stepSeconds);
      }

      const updated = prev.map((s) => (s.id === stepId ? { ...s, completed: nextCompleted } : s));
      const allCompleted = updated.every((s) => s.completed);

      if (allCompleted && updated.length > 0) {
        globalStopTimer();
        setTimeout(() => {
          setFlowState("completion");
        }, 500);
      }

      return updated;
    });
  };

  const updateStepTime = (stepId: string, time: number) => {
    const safeMinutes = Math.max(1, Number.isFinite(time) ? time : 1);

    setSteps((prev) => {
      const step = prev.find((s) => s.id === stepId);
      if (!step) return prev;

      if (globalTimerActive && !step.completed) {
        globalAdjustTime((safeMinutes - step.estimatedTime) * 60);
      }

      return prev.map((s) => (s.id === stepId ? { ...s, estimatedTime: safeMinutes } : s));
    });
  };

  const deleteStep = (stepId: string) => {
    setSteps((prev) => {
      const step = prev.find((s) => s.id === stepId);
      if (!step) return prev;

      if (globalTimerActive && !step.completed) {
        globalAdjustTime(-step.estimatedTime * 60);
      }

      return prev.filter((s) => s.id !== stepId);
    });
  };

  const remainingMinutes = steps
    .filter((step) => !step.completed)
    .reduce((sum, step) => sum + step.estimatedTime, 0);
  const totalTimeSeconds = remainingMinutes * 60;
  const completedCount = steps.filter((s) => s.completed).length;

  const formatDisplayTime = (seconds: number) => {
    const safeSeconds = Math.max(0, Math.round(seconds));
    const hours = Math.floor(safeSeconds / 3600);
    const minutes = Math.floor((safeSeconds % 3600) / 60);
    const secs = safeSeconds % 60;

    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m ${secs}s`;
  };

  return (
    <div className="mobile-frame">
      <Navigation />
      
      {/* Navigation Confirmation Dialog */}
      {pendingNavigation && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
        }}>
          <div style={{
            backgroundColor: "var(--pixel-card-bg)",
            border: "3px solid var(--pixel-border)",
            padding: "24px",
            maxWidth: "400px",
            textAlign: "center",
          }}>
            <h2 style={{ fontFamily: "'VT323', monospace", fontSize: "20px", marginBottom: "16px" }}>
              UNSAVED TASKS
            </h2>
            <p style={{ fontFamily: "'VT323', monospace", fontSize: "14px", marginBottom: "24px", color: "var(--pixel-text-light)" }}>
              You have incomplete tasks. Navigating away will lose your breakdown. Continue anyway?
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
              <button
                onClick={() => {
                  navigate(pendingNavigation);
                  setPendingNavigation(null);
                }}
                style={{
                  padding: "8px 16px",
                  border: "2px solid var(--pixel-border)",
                  backgroundColor: "var(--pixel-error)",
                  color: "white",
                  fontFamily: "'VT323', monospace",
                  cursor: "pointer",
                  fontSize: "12px",
                }}
              >
                YES, LOSE IT
              </button>
              <button
                onClick={() => setPendingNavigation(null)}
                style={{
                  padding: "8px 16px",
                  border: "2px solid var(--pixel-border)",
                  backgroundColor: "var(--pixel-accent)",
                  color: "white",
                  fontFamily: "'VT323', monospace",
                  cursor: "pointer",
                  fontSize: "12px",
                }}
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="mobile-content">
        {/* Flow: Input */}
        {flowState === "input" && (
          <>
            <h1 className="mobile-heading-1">DO THE THING</h1>

            <div className="mobile-card">
              <h2 className="mobile-heading-2">TODAY, I NEED TO...</h2>
              <p className="mobile-body" style={{ marginBottom: "16px" }}>
                Enter a single task or brain dump everything you need to do.
              </p>

              <textarea
                className="mobile-textarea"
                placeholder="Write project proposal, update documentation, respond to emails, plan team meeting..."
                value={brainDump}
                onChange={(e) => setBrainDump(e.target.value)}
              />

              <div style={{ marginBottom: "20px" }}>
                <p className="mobile-body-lg" style={{ marginBottom: "12px", fontWeight: 600 }}>
                  HOW FOCUSED ARE YOU TODAY?
                </p>

                <div className="mobile-preset-group">
                  <button
                    className={`mobile-preset-button ${focusLevel === "hyperfocus" ? "active" : ""}`}
                    onClick={() => setFocusLevel("hyperfocus")}
                  >
                    HYPERFOCUS
                  </button>
                  <button
                    className={`mobile-preset-button ${focusLevel === "normal" ? "active" : ""}`}
                    onClick={() => setFocusLevel("normal")}
                  >
                    NORMAL
                  </button>
                  <button
                    className={`mobile-preset-button ${focusLevel === "distracted" ? "active" : ""}`}
                    onClick={() => setFocusLevel("distracted")}
                  >
                    DISTRACTED
                  </button>
                </div>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <p className="mobile-body-lg" style={{ marginBottom: "12px", fontWeight: 600 }}>
                  TASK BREAKDOWN SIZE
                </p>

                <div className="mobile-preset-group">
                  <button
                    className={`mobile-preset-button ${granularityPreset === "tiny" ? "active" : ""}`}
                    onClick={() => handleGranularityPreset("tiny")}
                  >
                    TINY
                  </button>
                  <button
                    className={`mobile-preset-button ${granularityPreset === "balanced" ? "active" : ""}`}
                    onClick={() => handleGranularityPreset("balanced")}
                  >
                    BALANCED
                  </button>
                  <button
                    className={`mobile-preset-button ${granularityPreset === "big" ? "active" : ""}`}
                    onClick={() => handleGranularityPreset("big")}
                  >
                    BIG
                  </button>
                </div>

                <input
                  type="range"
                  className="mobile-slider"
                  min="0"
                  max="100"
                  value={granularity}
                  onChange={(e) => handleSliderChange(parseInt(e.target.value))}
                />
              </div>

              <p className="mobile-body-sm" style={{ marginBottom: "16px", color: "var(--pixel-text-light)", fontStyle: "italic" }}>
                Time estimates adjust based on your focus level
              </p>

              {error && (
                <div style={{
                  backgroundColor: "#ffebee",
                  border: "2px solid #c62828",
                  padding: "12px",
                  marginBottom: "16px",
                  fontFamily: "'VT323', monospace",
                  fontSize: "12px",
                  color: "#c62828",
                }}>
                  <div style={{ marginBottom: "8px" }}>ERROR: {error}</div>
                  {retryCount > 0 && (
                    <div style={{ fontSize: "10px", opacity: 0.8, marginBottom: "8px" }}>
                      Retry attempt {retryCount} of 3
                    </div>
                  )}
                  {retryCount < 3 && (
                    <button
                      onClick={() => {
                        setError(null);
                        const backoffMs = Math.pow(2, retryCount) * 1000;
                        toast.loading(`Retrying in ${backoffMs / 1000}s...`);
                        setTimeout(() => {
                          handleBrainDumpSubmit();
                        }, backoffMs);
                      }}
                      style={{
                        backgroundColor: "#c62828",
                        color: "white",
                        border: "1px solid #c62828",
                        padding: "4px 8px",
                        fontFamily: "'VT323', monospace",
                        fontSize: "10px",
                        cursor: "pointer",
                        marginTop: "4px",
                      }}
                    >
                      RETRY
                    </button>
                  )}
                  {retryCount >= 3 && (
                    <div style={{ fontSize: "10px", opacity: 0.8, marginTop: "4px" }}>
                      Max retries reached. Please try again later.
                    </div>
                  )}
                </div>
              )}

              <button
                className="mobile-button"
                onClick={handleBrainDumpSubmit}
                disabled={isLoading || !brainDump.trim()}
                style={{
                  opacity: isLoading ? 0.6 : 1,
                  cursor: isLoading ? "not-allowed" : "pointer",
                }}
              >
                {isLoading ? (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                    <span style={{
                      display: "inline-block",
                      width: "12px",
                      height: "12px",
                      border: "2px solid white",
                      borderTop: "2px solid transparent",
                      borderRadius: "50%",
                      animation: "spin 0.6s linear infinite",
                    }} />
                    PROCESSING...
                  </span>
                ) : (
                  "BREAK IT DOWN"
                )}
              </button>
            </div>
          </>
        )}

        {/* Flow: Breakdown */}
        {flowState === "breakdown" && (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <button
                onClick={() => setFlowState("input")}
                className="mobile-button-small"
                style={{ marginBottom: 0 }}
              >
                BACK
              </button>
              <h1 className="mobile-heading-1" style={{ margin: 0 }}>YOUR TASKS</h1>
            </div>

            <div
              className="mobile-summary"
              style={{
                cursor: "pointer",
                position: "relative",
                background: globalTimerActive ? "linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)" : undefined,
                borderColor: globalTimerActive ? "#ef4444" : undefined,
              }}
              onClick={globalTimerActive ? handleStopTimer : handleStartTimer}
            >
              <div className="mobile-summary-label">{globalTimerActive ? "TIME REMAINING" : "TOTAL TIME"}</div>
              <div className="mobile-summary-value" style={{ color: globalTimerActive ? "#ef4444" : "var(--pixel-accent)" }}>
                {globalTimerActive ? formatDisplayTime(globalTimeRemaining) : formatDisplayTime(totalTimeSeconds)}
              </div>
              <div className="mobile-body-sm" style={{ marginTop: "8px" }}>
                {globalTimerActive ? "Click to stop" : "Click to start countdown"}
              </div>
              <div className="mobile-body-sm" style={{ marginTop: "4px" }}>
                {completedCount} OF {steps.length} DONE
              </div>
            </div>

            <div style={{ flex: 1 }}>
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={`mobile-task-item ${step.completed ? "completed" : ""}`}
                >
                  <input
                    type="checkbox"
                    className="mobile-checkbox mobile-task-checkbox"
                    checked={step.completed}
                    onChange={() => toggleStepComplete(step.id)}
                  />

                  <div className="mobile-task-content">
                    <div
                      className="mobile-task-title"
                      style={{
                        textDecoration: step.completed ? "line-through" : "none",
                      }}
                    >
                      {step.title}
                    </div>
                    {step.description && (
                      <div className="mobile-task-desc">{step.description}</div>
                    )}
                    <div className="mobile-task-time">
                      <input
                        type="number"
                        min="5"
                        max="480"
                        value={step.estimatedTime}
                        onFocus={(e) => e.currentTarget.select()}
                        onClick={(e) => e.currentTarget.select()}
                        onChange={(e) => updateStepTime(step.id, parseInt(e.target.value))}
                        className="mobile-task-time-input"
                      />
                      <span className="mobile-body-sm">min</span>
                      <button
                        onClick={() => deleteStep(step.id)}
                        className="mobile-task-delete"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Flow: Completion */}
        {flowState === "completion" && (
          <>
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "24px" }}>
            <div className="mobile-success-message">
              <div className="mobile-success-title">YOU DID IT!</div>
              <div className="mobile-success-text" style={{ marginTop: "12px" }}>
                ALL {steps.length} TASKS COMPLETED
              </div>
              <div className="mobile-body" style={{ marginTop: "12px", color: "var(--pixel-text-light)" }}>
                Amazing work! You crushed it today.
              </div>
            </div>
            </div>

            <button
              onClick={() => {
                setFlowState("input");
                setBrainDump("");
                setSteps([]);
                globalStopTimer();
                localStorage.removeItem('doTheThing_state');
              }}
              className="mobile-button"
            >
              START OVER
            </button>
          </>
        )}
      </div>
      
      {/* Footer Navigation */}
      <footer className="border-t-2 border-border p-4 bg-card text-center space-y-3 mt-auto">
        <div className="flex gap-2 justify-center flex-wrap">
          <button
            onClick={() => handleNavigation("/about")}
            className="px-4 py-2 border-2 border-border bg-background hover:bg-accent text-foreground font-vt323 text-sm"
          >
            ABOUT
          </button>
          <button
            onClick={() => handleNavigation("/blog")}
            className="px-4 py-2 border-2 border-border bg-background hover:bg-accent text-foreground font-vt323 text-sm"
          >
            BLOG
          </button>
          <button
            onClick={() => handleNavigation("/contact")}
            className="px-4 py-2 border-2 border-border bg-background hover:bg-accent text-foreground font-vt323 text-sm"
          >
            CONTACT
          </button>
          <button
            onClick={() => handleNavigation("/privacy")}
            className="px-4 py-2 border-2 border-border bg-background hover:bg-accent text-foreground font-vt323 text-sm"
          >
            PRIVACY
          </button>
          <button
            onClick={() => handleNavigation("/terms")}
            className="px-4 py-2 border-2 border-border bg-background hover:bg-accent text-foreground font-vt323 text-sm"
          >
            TERMS
          </button>
        </div>
        <p className="font-vt323 text-xs text-muted-foreground">
          DoTheThing - Task Management for ADHD Brains
        </p>
      </footer>
    </div>
  );
}
