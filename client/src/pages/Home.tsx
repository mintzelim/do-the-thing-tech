import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import "../pixel-art-refined.css";

type Step = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  estimatedTime: number;
};

type FlowState = "input" | "focus" | "breakdown" | "export";
type GranularityPreset = "tiny" | "balanced" | "big";

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const [, navigate] = useLocation();
  const [flowState, setFlowState] = useState<FlowState>("input");
  const [brainDump, setBrainDump] = useState("");
  const [focusLevel, setFocusLevel] = useState<"hyperfocus" | "normal" | "distracted">("normal");
  const [granularity, setGranularity] = useState(50);
  const [granularityPreset, setGranularityPreset] = useState<GranularityPreset>("balanced");
  const [steps, setSteps] = useState<Step[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);

  const breakdownMutation = trpc.tasks.breakdown.useMutation();
  const estimateMutation = trpc.tasks.estimateTasks.useMutation();
  const exportMutation = trpc.tasks.exportToCalendar.useMutation();

  useEffect(() => {
    if (!timerActive || timeRemaining <= 0) {
      setTimerActive(false);
      return;
    }
    const interval = setInterval(() => {
      setTimeRemaining((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [timerActive, timeRemaining]);

  const handleStartTimer = () => {
    const total = steps.reduce((sum, s) => sum + s.estimatedTime, 0);
    setTimeRemaining(total);
    setTimerActive(true);
  };

  const handleStopTimer = () => {
    setTimerActive(false);
  };

  const handleGranularityPreset = (preset: GranularityPreset) => {
    setGranularityPreset(preset);
    if (preset === "tiny") setGranularity(20);
    if (preset === "balanced") setGranularity(50);
    if (preset === "big") setGranularity(80);
  };

  const handleBrainDumpSubmit = async () => {
    if (!brainDump.trim()) {
      toast.error("Please enter your tasks");
      return;
    }

    setIsLoading(true);
    try {
      const compiled = await breakdownMutation.mutateAsync({
        input: brainDump,
        granularity,
      });

      // Estimate tasks immediately
      const estimated = await estimateMutation.mutateAsync({
        tasks: compiled.map((t: any) => ({
          title: t.title,
          description: t.description,
        })),
        focusLevel,
      });

      const stepsWithIds = estimated.map((task: any, idx: number) => ({
        id: `step-${idx}`,
        title: task.title,
        description: task.description,
        completed: false,
        estimatedTime: task.totalTime || task.estimatedTime || 30,
      }));

      setSteps(stepsWithIds);
      setFlowState("breakdown");
    } catch (error) {
      toast.error("Failed to process your input");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleStepComplete = (stepId: string) => {
    setSteps((prev) =>
      prev.map((s) => (s.id === stepId ? { ...s, completed: !s.completed } : s))
    );
  };

  const updateStepTime = (stepId: string, time: number) => {
    setSteps((prev) =>
      prev.map((s) => (s.id === stepId ? { ...s, estimatedTime: time } : s))
    );
  };

  const deleteStep = (stepId: string) => {
    setSteps((prev) => prev.filter((s) => s.id !== stepId));
  };

  const handleExport = async () => {
    if (steps.length === 0) {
      toast.error("No steps to export");
      return;
    }

    setIsLoading(true);
    try {
      const calendarEvents = await exportMutation.mutateAsync({
        tasks: steps.map((s) => ({
          title: s.title,
          description: s.description,
          estimatedTime: s.estimatedTime,
        })),
      });

      if (calendarEvents && calendarEvents.totalEvents > 0) {
        toast.success(`${calendarEvents.totalEvents} tasks exported`);
        setFlowState("export");
      } else {
        toast.error("Failed to generate calendar events");
      }
    } catch (error) {
      toast.error("Failed to export tasks");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const totalTime = timerActive ? timeRemaining : steps.reduce((sum, s) => sum + s.estimatedTime, 0);
  const completedCount = steps.filter((s) => s.completed).length;

  return (
    <div className="mobile-frame">
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
                  onChange={(e) => {
                    setGranularity(parseInt(e.target.value));
                    setGranularityPreset("balanced");
                  }}
                />
              </div>

              <p className="mobile-body-sm" style={{ marginBottom: "16px", color: "var(--pixel-text-light)", fontStyle: "italic" }}>
                Time estimates adjust based on your focus level
              </p>

              <button
                className="mobile-button"
                onClick={handleBrainDumpSubmit}
                disabled={isLoading || !brainDump.trim()}
              >
                {isLoading ? "PROCESSING..." : "BREAK IT DOWN"}
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
                background: timerActive ? "linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)" : undefined,
                borderColor: timerActive ? "#ef4444" : undefined,
              }}
              onClick={timerActive ? handleStopTimer : handleStartTimer}
            >
              <div className="mobile-summary-label">{timerActive ? "TIME REMAINING" : "TOTAL TIME"}</div>
              <div className="mobile-summary-value" style={{ color: timerActive ? "#ef4444" : "var(--pixel-accent)" }}>
                {Math.round(totalTime / 60)}H {totalTime % 60}M
              </div>
              <div className="mobile-body-sm" style={{ marginTop: "8px" }}>
                {timerActive ? "Click to stop" : "Click to start countdown"}
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

            <button
              onClick={handleExport}
              disabled={isLoading || steps.length === 0}
              className="mobile-button"
            >
              {isLoading ? "EXPORTING..." : "EXPORT TO CALENDAR"}
            </button>
          </>
        )}

        {/* Flow: Export Success */}
        {flowState === "export" && (
          <>
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div className="mobile-success-message">
                <div className="mobile-success-title">SUCCESS!</div>
                <div className="mobile-success-text">
                  {steps.length} TASKS EXPORTED TO CALENDAR
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setFlowState("input");
                setBrainDump("");
                setSteps([]);
              }}
              className="mobile-button"
            >
              START OVER
            </button>
          </>
        )}
      </div>
      
      {/* Footer Navigation */}
      <footer className="border-t-2 border-border p-4 bg-card text-center space-y-3">
        <div className="flex gap-2 justify-center flex-wrap">
          <button
            onClick={() => navigate("/about")}
            className="px-4 py-2 border-2 border-border bg-background hover:bg-accent text-foreground font-vt323 text-sm"
          >
            ABOUT
          </button>
          <button
            onClick={() => navigate("/blog")}
            className="px-4 py-2 border-2 border-border bg-background hover:bg-accent text-foreground font-vt323 text-sm"
          >
            BLOG
          </button>
        </div>
        <p className="font-vt323 text-xs text-muted-foreground">
          DoTheThing - Task Management for ADHD Brains
        </p>
      </footer>
    </div>
  );
}
