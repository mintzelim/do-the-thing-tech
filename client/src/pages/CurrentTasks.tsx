import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useTimer } from "@/contexts/TimerContext";
import Navigation from "@/components/Navigation";
import "../pixel-art-refined.css";

type Step = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  estimatedTime: number; // always stored in minutes
};

const minutesToSeconds = (minutes: number) => Math.max(0, Math.round(minutes * 60));
const getRemainingTotalSeconds = (steps: Step[]) =>
  steps.filter((step) => !step.completed).reduce((sum, step) => sum + minutesToSeconds(step.estimatedTime), 0);

export default function CurrentTasks() {
  const [, navigate] = useLocation();
  const [steps, setSteps] = useState<Step[]>([]);
  const { timerActive, timeRemaining, startTimer, stopTimer, adjustTime } = useTimer();

  useEffect(() => {
    const savedState = localStorage.getItem("doTheThing_state");
    if (!savedState) return;

    try {
      const parsed = JSON.parse(savedState);
      setSteps(parsed.steps || []);
    } catch (error) {
      console.error("Failed to load saved state:", error);
    }
  }, []);

  useEffect(() => {
    const savedState = localStorage.getItem("doTheThing_state");
    const parsed = savedState ? JSON.parse(savedState) : {};
    parsed.steps = steps;
    localStorage.setItem("doTheThing_state", JSON.stringify(parsed));
  }, [steps]);

  const playClickSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const now = audioContext.currentTime;
      
      // Create a satisfying click sound - high frequency percussive tone
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // High frequency click that quickly decays
      oscillator.frequency.setValueAtTime(1200, now);
      oscillator.frequency.exponentialRampToValueAtTime(400, now + 0.1);
      oscillator.type = "sine";
      
      // Quick attack and decay for percussive feel
      gainNode.gain.setValueAtTime(0.25, now);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      
      oscillator.start(now);
      oscillator.stop(now + 0.1);
    } catch (error) {
      console.error("Could not play sound:", error);
    }
  };

  const handleStartTimer = () => {
    startTimer(getRemainingTotalSeconds(steps));
  };

  const handleStopTimer = () => {
    stopTimer();
  };

  const toggleStepComplete = (stepId: string) => {
    playClickSound();

    setSteps((prev) => {
      const step = prev.find((s) => s.id === stepId);
      if (!step) return prev;

      const seconds = minutesToSeconds(step.estimatedTime);
      const nextCompleted = !step.completed;

      if (timerActive) {
        adjustTime(nextCompleted ? -seconds : seconds);
      }

      const updated = prev.map((s) => (s.id === stepId ? { ...s, completed: nextCompleted } : s));
      const allCompleted = updated.length > 0 && updated.every((s) => s.completed);

      if (allCompleted) {
        stopTimer();
      }

      return updated;
    });
  };

  const updateStepTime = (stepId: string, nextMinutes: number) => {
    const safeMinutes = Math.max(1, Number.isFinite(nextMinutes) ? nextMinutes : 1);

    setSteps((prev) => {
      const step = prev.find((s) => s.id === stepId);
      if (!step) return prev;

      if (timerActive && !step.completed) {
        const deltaSeconds = minutesToSeconds(safeMinutes - step.estimatedTime);
        adjustTime(deltaSeconds);
      }

      return prev.map((s) => (s.id === stepId ? { ...s, estimatedTime: safeMinutes } : s));
    });
  };

  const deleteStep = (stepId: string) => {
    setSteps((prev) => {
      const step = prev.find((s) => s.id === stepId);
      if (!step) return prev;

      if (timerActive && !step.completed) {
        adjustTime(-minutesToSeconds(step.estimatedTime));
      }

      return prev.filter((s) => s.id !== stepId);
    });
  };

  if (steps.length === 0) {
    return (
      <div className="mobile-frame">
        <Navigation />
        <div className="mobile-content">
          <div style={{ textAlign: "center", padding: "40px 20px" }}>
            <h2 className="mobile-heading-2" style={{ marginBottom: "20px" }}>NO TASKS YET</h2>
            <p className="mobile-body" style={{ marginBottom: "30px" }}>
              Go to HOME and create a task breakdown to get started.
            </p>
            <button className="mobile-button" onClick={() => navigate("/")}>CREATE TASKS</button>
          </div>
        </div>
      </div>
    );
  }

  const remainingTotalSeconds = getRemainingTotalSeconds(steps);
  const completedCount = steps.filter((s) => s.completed).length;
  const allCompleted = steps.every((s) => s.completed);

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

      <div className="mobile-content">
        {allCompleted ? (
          <>
            <h1 className="mobile-heading-1" style={{ textAlign: "center", marginBottom: "20px" }}>
              YOU DID IT!
            </h1>
            <div className="mobile-card" style={{ textAlign: "center" }}>
              <h2 className="mobile-heading-2" style={{ marginBottom: "16px" }}>
                ALL {steps.length} TASKS COMPLETED
              </h2>
              <p className="mobile-body" style={{ marginBottom: "24px" }}>
                Amazing work! You crushed it today.
              </p>
              <button className="mobile-button" onClick={() => {
                localStorage.removeItem('doTheThing_state');
                navigate("/");
              }}>CREATE NEW TASKS</button>
            </div>
          </>
        ) : (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <button
                onClick={() => navigate("/")}
                className="mobile-button-small"
                style={{ marginBottom: 0 }}
              >
                BACK
              </button>
              <h1 className="mobile-heading-1" style={{ margin: 0, flex: 1 }}>
                CURRENT TASKS
              </h1>
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
                {timerActive ? formatDisplayTime(timeRemaining) : formatDisplayTime(remainingTotalSeconds)}
              </div>
              <div className="mobile-body-sm" style={{ marginTop: "8px" }}>
                {timerActive ? "Click to stop" : "Click to start countdown"}
              </div>
              <div className="mobile-body-sm" style={{ marginTop: "8px", color: "var(--pixel-text-light)" }}>
                PROGRESS: {completedCount}/{steps.length}
              </div>
            </div>

            <div>
              {steps.map((step) => (
                <div key={step.id} className={`mobile-task-item ${step.completed ? "completed" : ""}`}>
                  <input
                    type="checkbox"
                    className="mobile-task-checkbox"
                    checked={step.completed}
                    onChange={() => toggleStepComplete(step.id)}
                    style={{ width: "20px", height: "20px", cursor: "pointer" }}
                  />
                  <div className="mobile-task-content">
                    <div className="mobile-task-title" style={{ textDecoration: step.completed ? "line-through" : "none" }}>
                      {step.title}
                    </div>
                    {step.description && (
                      <div className="mobile-task-desc" style={{ textDecoration: step.completed ? "line-through" : "none" }}>
                        {step.description}
                      </div>
                    )}
                    <div className="mobile-task-time">
                      <input
                        type="number"
                        className="mobile-task-time-input"
                        value={step.estimatedTime}
                        onFocus={(e) => e.currentTarget.select()}
                        onClick={(e) => e.currentTarget.select()}
                        onChange={(e) => updateStepTime(step.id, parseInt(e.target.value, 10) || 0)}
                        min="1"
                      />
                      <span className="mobile-body-sm" style={{ marginBottom: 0 }}>MIN</span>
                      <button className="mobile-task-delete" onClick={() => deleteStep(step.id)}>
                        DELETE
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <footer
        style={{
          textAlign: "center",
          padding: "20px",
          borderTop: "3px solid var(--pixel-border)",
          marginTop: "auto",
          backgroundColor: "var(--pixel-card-bg)",
          fontFamily: "'VT323', monospace",
          fontSize: "12px",
          color: "var(--pixel-text-light)",
        }}
      >
        <a href="/" style={{ color: "var(--pixel-text-light)", textDecoration: "none", marginRight: "16px" }}>HOME</a>
        <a href="/privacy" style={{ color: "var(--pixel-text-light)", textDecoration: "none", marginRight: "16px" }}>PRIVACY</a>
        <a href="/terms" style={{ color: "var(--pixel-text-light)", textDecoration: "none" }}>TERMS</a>
      </footer>
    </div>
  );
}
