import { useState } from "react";
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
  const [flowState, setFlowState] = useState<FlowState>("input");
  const [brainDump, setBrainDump] = useState("");
  const [focusLevel, setFocusLevel] = useState<"hyperfocus" | "normal" | "distracted">("normal");
  const [granularity, setGranularity] = useState(50);
  const [granularityPreset, setGranularityPreset] = useState<GranularityPreset>("balanced");
  const [steps, setSteps] = useState<Step[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const breakdownMutation = trpc.tasks.breakdown.useMutation();
  const estimateMutation = trpc.tasks.estimateTasks.useMutation();
  const exportMutation = trpc.tasks.exportToCalendar.useMutation();

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

  const totalTime = steps.reduce((sum, s) => sum + s.estimatedTime, 0);
  const completedCount = steps.filter((s) => s.completed).length;

  return (
    <div className="mobile-frame">
      <div className="mobile-content">
        {/* Flow: Input */}
        {flowState === "input" && (
          <>
            <h1 className="mobile-heading-1">DO THE THING</h1>

            <div className="mobile-card">
              <h2 className="mobile-heading-2">I NEED TO...</h2>
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
            <h1 className="mobile-heading-1">YOUR TASKS</h1>

            <div className="mobile-summary">
              <div className="mobile-summary-label">TOTAL TIME</div>
              <div className="mobile-summary-value">
                {Math.round(totalTime / 60)}H {totalTime % 60}M
              </div>
              <div className="mobile-body-sm" style={{ marginTop: "8px" }}>
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
    </div>
  );
}
