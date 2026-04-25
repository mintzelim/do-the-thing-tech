import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { useTimer } from "@/contexts/TimerContext";
import Navigation from "@/components/Navigation";
import "../pixel-art-refined.css";

type Step = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  estimatedTime: number;
};

export default function CurrentTasks() {
  const [, navigate] = useLocation();
  const [steps, setSteps] = useState<Step[]>([]);
  const { timerActive, timeRemaining, startTimer, stopTimer } = useTimer();
  const clickSoundRef = useRef<HTMLAudioElement | null>(null);

  // Load persisted state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('doTheThing_state');
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        setSteps(parsed.steps || []);
        // Timer state is managed by TimerContext
      } catch (error) {
        console.error('Failed to load saved state:', error);
      }
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    const state = localStorage.getItem('doTheThing_state');
    if (state) {
      try {
        const parsed = JSON.parse(state);
        parsed.steps = steps;
        parsed.timeRemaining = timeRemaining;
        localStorage.setItem('doTheThing_state', JSON.stringify(parsed));
      } catch (error) {
        console.error('Failed to save state:', error);
      }
    }
  }, [steps, timeRemaining]);

  // Global timer is managed by TimerContextRemaining]);

  // Play mouse click sound
  const playClickSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const now = audioContext.currentTime;
      
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      const filter = audioContext.createBiquadFilter();
      
      oscillator.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(150, now);
      oscillator.frequency.exponentialRampToValueAtTime(50, now + 0.05);
      oscillator.type = "square";
      
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

  const handleStartTimer = () => {
    const total = steps.reduce((sum, s) => sum + s.estimatedTime, 0);
    startTimer(total);
  };

  const handleStopTimer = () => {
    stopTimer();
  };

  const toggleStepComplete = (stepId: string) => {
    playClickSound();
    
    setSteps((prev) => {
      const updated = prev.map((s) => (s.id === stepId ? { ...s, completed: !s.completed } : s));
      
      // Check if all tasks are completed
      const allCompleted = updated.every((s) => s.completed);
      if (allCompleted && updated.length > 0) {
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
      
      return updated;
    });
  };

  const updateStepTime = (stepId: string, time: number) => {
    setSteps((prev) =>
      prev.map((s) => (s.id === stepId ? { ...s, estimatedTime: time } : s))
    );
  };

  const deleteStep = (stepId: string) => {
    setSteps((prev) => prev.filter((s) => s.id !== stepId));
  };

  // Redirect if no tasks
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
            <button
              className="mobile-button"
              onClick={() => navigate("/")}
            >
              CREATE TASKS
            </button>
          </div>
        </div>
      </div>
    );
  }

  const totalTime = steps.reduce((sum, s) => sum + s.estimatedTime, 0);
  const completedCount = steps.filter((s) => s.completed).length;
  const allCompleted = steps.every((s) => s.completed);

  // Format time
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
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
                Great work! You've completed everything on your list.
              </p>
              <button
                className="mobile-button"
                onClick={() => navigate("/")}
              >
                CREATE NEW TASKS
              </button>
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
                {timerActive ? formatTime(timeRemaining) : formatTime(totalTime)}
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
                <div
                  key={step.id}
                  className={`mobile-task-item ${step.completed ? "completed" : ""}`}
                >
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
                        onChange={(e) => updateStepTime(step.id, parseInt(e.target.value) || 0)}
                        min="1"
                      />
                      <span className="mobile-body-sm" style={{ marginBottom: 0 }}>MIN</span>
                      <button
                        className="mobile-task-delete"
                        onClick={() => deleteStep(step.id)}
                      >
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

      <footer style={{
        textAlign: "center",
        padding: "20px",
        borderTop: "3px solid var(--pixel-border)",
        marginTop: "auto",
        backgroundColor: "var(--pixel-card-bg)",
        fontFamily: "'VT323', monospace",
        fontSize: "12px",
        color: "var(--pixel-text-light)",
      }}>
        <a href="/" style={{ color: "var(--pixel-text-light)", textDecoration: "none", marginRight: "16px" }}>HOME</a>
        <a href="/privacy" style={{ color: "var(--pixel-text-light)", textDecoration: "none", marginRight: "16px" }}>PRIVACY</a>
        <a href="/terms" style={{ color: "var(--pixel-text-light)", textDecoration: "none" }}>TERMS</a>
      </footer>
    </div>
  );
}
