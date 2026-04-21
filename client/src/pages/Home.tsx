import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import "../pixel-art-theme.css";

type Step = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  estimatedTime: number;
};

type FlowState = "input" | "estimates" | "breakdown" | "export";
type GranularityPreset = "tiny" | "balanced" | "big";

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const [flowState, setFlowState] = useState<FlowState>("input");
  const [brainDump, setBrainDump] = useState("");
  const [focusLevel, setFocusLevel] = useState<"hyperfocus" | "normal" | "distracted">("normal");
  const [granularity, setGranularity] = useState(50);
  const [granularityPreset, setGranularityPreset] = useState<GranularityPreset>("balanced");
  const [steps, setSteps] = useState<Step[]>([]);
  const [estimatedTasks, setEstimatedTasks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const breakdownMutation = trpc.tasks.breakdown.useMutation();
  const estimateMutation = trpc.tasks.estimateTasks.useMutation();
  const exportMutation = trpc.tasks.exportToCalendar.useMutation();

  // Granularity preset handler
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

      setEstimatedTasks(compiled);
      setFlowState("estimates");
    } catch (error) {
      toast.error("Failed to process your input");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEstimatesToBreakdown = async () => {
    if (estimatedTasks.length === 0) {
      toast.error("No tasks to estimate");
      return;
    }

    setIsLoading(true);
    try {
      const estimated = await estimateMutation.mutateAsync({
        tasks: estimatedTasks.map((t) => ({
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
      toast.error("Failed to estimate tasks");
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
        toast.success(`${calendarEvents.totalEvents} tasks exported to calendar`);
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
    <div style={{ backgroundColor: "#1a1a2e", minHeight: "100vh", padding: "20px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "40px" }}>
          <h1 className="pixel-heading pixel-heading-large">DoTheThing</h1>
          <p className="pixel-text" style={{ color: "#16c784", marginTop: "8px" }}>
            {isAuthenticated ? `Welcome, ${user?.name}` : "Break down your tasks"}
          </p>
        </div>

        {/* Flow: Input */}
        {flowState === "input" && (
          <div style={{ marginBottom: "20px" }}>
            <div className="pixel-card" style={{ padding: "24px" }}>
              <h2 className="pixel-heading">I need to...</h2>

              <p className="pixel-text" style={{ color: "#f5f5f5", marginTop: "16px", marginBottom: "16px" }}>
                Enter a single task or brain dump everything you need to do.
              </p>

              <textarea
                className="pixel-textarea"
                placeholder="e.g., Write project proposal, update documentation, respond to emails"
                value={brainDump}
                onChange={(e) => setBrainDump(e.target.value)}
                style={{
                  width: "100%",
                  minHeight: "120px",
                  marginBottom: "20px",
                  boxSizing: "border-box",
                }}
              />

              <div style={{ marginBottom: "20px" }}>
                <p className="pixel-text" style={{ color: "#f5f5f5", marginBottom: "12px" }}>
                  Task Breakdown Size
                </p>

                {/* Granularity Presets */}
                <div style={{ display: "flex", gap: "8px", marginBottom: "12px", flexWrap: "wrap" }}>
                  <button
                    className={`pixel-preset-button ${granularityPreset === "tiny" ? "active" : ""}`}
                    onClick={() => handleGranularityPreset("tiny")}
                  >
                    Tiny Steps
                  </button>
                  <button
                    className={`pixel-preset-button ${granularityPreset === "balanced" ? "active" : ""}`}
                    onClick={() => handleGranularityPreset("balanced")}
                  >
                    Balanced
                  </button>
                  <button
                    className={`pixel-preset-button ${granularityPreset === "big" ? "active" : ""}`}
                    onClick={() => handleGranularityPreset("big")}
                  >
                    Big Milestones
                  </button>
                </div>

                {/* Granularity Slider */}
                <input
                  type="range"
                  className="pixel-slider"
                  min="0"
                  max="100"
                  value={granularity}
                  onChange={(e) => {
                    setGranularity(parseInt(e.target.value));
                    setGranularityPreset("balanced"); // Reset preset when manually adjusting
                  }}
                  style={{ width: "100%", marginBottom: "8px" }}
                />

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span className="pixel-text" style={{ fontSize: "10px", color: "#888888" }}>
                    Tiny
                  </span>
                  <span className="pixel-text" style={{ fontSize: "10px", color: "#888888" }}>
                    Big
                  </span>
                </div>
              </div>

              <button
                className="pixel-button"
                onClick={handleBrainDumpSubmit}
                disabled={isLoading || !brainDump.trim()}
                style={{ width: "100%", padding: "16px" }}
              >
                {isLoading ? "Processing..." : "Break It Down"}
              </button>
            </div>
          </div>
        )}

        {/* Flow: Estimates */}
        {flowState === "estimates" && (
          <div style={{ marginBottom: "20px" }}>
            <div className="pixel-card" style={{ padding: "24px" }}>
              <h2 className="pixel-heading">How focused are you?</h2>

              <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                {(["hyperfocus", "normal", "distracted"] as const).map((level) => (
                  <button
                    key={level}
                    className={`pixel-focus-button ${focusLevel === level ? "active" : ""}`}
                    onClick={() => setFocusLevel(level)}
                  >
                    <div style={{ marginBottom: "4px" }}>{level.toUpperCase()}</div>
                    <div style={{ fontSize: "10px" }}>
                      {level === "hyperfocus" && "Deep focus, minimal distractions"}
                      {level === "normal" && "Typical focus and attention"}
                      {level === "distracted" && "Easily distracted, need buffer time"}
                    </div>
                  </button>
                ))}
              </div>

              <button
                className="pixel-button"
                onClick={handleEstimatesToBreakdown}
                disabled={isLoading}
                style={{ width: "100%", padding: "16px" }}
              >
                {isLoading ? "Estimating..." : "Get Time Estimates"}
              </button>
            </div>
          </div>
        )}

        {/* Flow: Breakdown */}
        {flowState === "breakdown" && (
          <div style={{ marginBottom: "20px" }}>
            <div style={{ marginBottom: "20px" }}>
              <h2 className="pixel-heading">Your Tasks</h2>
              <p className="pixel-text" style={{ color: "#888888", marginTop: "8px" }}>
                {completedCount} of {steps.length} completed
              </p>
            </div>

            <div style={{ marginBottom: "20px" }}>
              {steps.map((step) => (
                <div
                  key={step.id}
                  className="pixel-card"
                  style={{
                    padding: "16px",
                    marginBottom: "12px",
                    opacity: step.completed ? 0.6 : 1,
                  }}
                >
                  <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <input
                      type="checkbox"
                      className="pixel-checkbox"
                      checked={step.completed}
                      onChange={() => toggleStepComplete(step.id)}
                      style={{ marginTop: "4px" }}
                    />

                    <div style={{ flex: 1 }}>
                      <h3
                        className="pixel-text"
                        style={{
                          textDecoration: step.completed ? "line-through" : "none",
                          color: step.completed ? "#888888" : "#f5f5f5",
                          marginBottom: "4px",
                        }}
                      >
                        {step.title}
                      </h3>
                      {step.description && (
                        <p className="pixel-text" style={{ fontSize: "10px", color: "#cccccc" }}>
                          {step.description}
                        </p>
                      )}
                    </div>

                    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                      <input
                        type="number"
                        min="5"
                        max="480"
                        value={step.estimatedTime}
                        onChange={(e) => updateStepTime(step.id, parseInt(e.target.value))}
                        className="pixel-input"
                        style={{ width: "60px", padding: "8px", fontSize: "10px" }}
                      />
                      <span className="pixel-text" style={{ fontSize: "10px" }}>min</span>
                      <button
                        onClick={() => deleteStep(step.id)}
                        className="pixel-preset-button"
                        style={{ padding: "6px 12px", fontSize: "10px" }}
                      >
                        Del
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pixel-card" style={{ padding: "20px", backgroundColor: "#0f3460" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <p className="pixel-text" style={{ fontSize: "10px", color: "#888888", marginBottom: "4px" }}>
                    Total Time
                  </p>
                  <p className="pixel-heading" style={{ fontSize: "20px", color: "#16c784" }}>
                    {Math.round(totalTime / 60)}h {totalTime % 60}m
                  </p>
                </div>
                <button
                  onClick={handleExport}
                  disabled={isLoading || steps.length === 0}
                  className="pixel-button"
                  style={{ padding: "16px 24px" }}
                >
                  {isLoading ? "Exporting..." : "Export"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Flow: Export Success */}
        {flowState === "export" && (
          <div className="pixel-card" style={{ padding: "32px", textAlign: "center", backgroundColor: "#00d084" }}>
            <h2 className="pixel-heading" style={{ color: "#1a1a2e", marginBottom: "16px" }}>
              SUCCESS!
            </h2>
            <p className="pixel-text" style={{ color: "#1a1a2e", marginBottom: "24px" }}>
              Your tasks have been exported to calendar
            </p>
            <button
              onClick={() => {
                setFlowState("input");
                setBrainDump("");
                setSteps([]);
              }}
              className="pixel-button"
              style={{ padding: "16px 32px" }}
            >
              Start Over
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
