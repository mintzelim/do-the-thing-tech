import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { useTimer } from "@/contexts/TimerContext";
import Navigation from "@/components/Navigation";
import PinTabTutorial from "@/components/PinTabTutorial";
import Footer from "@/components/Footer";
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
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [editingDescription, setEditingDescription] = useState("");
  const { timerActive, timeRemaining, startTimer, stopTimer, adjustTime } = useTimer();
  
  // Track pending timer adjustments to apply after state updates
  const pendingAdjustmentRef = useRef<number | null>(null);

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

  // Apply pending timer adjustments after state updates
  useEffect(() => {
    if (pendingAdjustmentRef.current !== null) {
      adjustTime(pendingAdjustmentRef.current);
      pendingAdjustmentRef.current = null;
    }
  }, [steps, adjustTime]);

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
      const updatedSteps = prev.map((step) => {
        if (step.id === stepId) {
          const isCompleting = !step.completed;
          // Queue timer adjustment to happen after state update
          if (isCompleting && timerActive) {
            const timeInSeconds = minutesToSeconds(step.estimatedTime);
            pendingAdjustmentRef.current = -timeInSeconds;
          } else if (!isCompleting && timerActive) {
            // When unchecking, add time back
            const timeInSeconds = minutesToSeconds(step.estimatedTime);
            pendingAdjustmentRef.current = timeInSeconds;
          }
          return { ...step, completed: !step.completed };
        }
        return step;
      });
      return updatedSteps;
    });
  };

  const updateStepTime = (stepId: string, newTime: number) => {
    const oldStep = steps.find((s) => s.id === stepId);
    if (oldStep) {
      const timeDifference = (newTime - oldStep.estimatedTime) * 60; // Convert minutes to seconds
      
      // Queue timer adjustment to happen after state update
      if (timerActive && timeDifference !== 0) {
        pendingAdjustmentRef.current = timeDifference;
      }
    }
    
    setSteps((prev) =>
      prev.map((step) => (step.id === stepId ? { ...step, estimatedTime: newTime } : step))
    );
  };

  const deleteStep = (stepId: string) => {
    const stepToDelete = steps.find((s) => s.id === stepId);
    if (stepToDelete) {
      const timeToDeduce = stepToDelete.estimatedTime * 60; // Convert minutes to seconds
      
      // Queue timer adjustment to happen after state update
      if (timerActive && timeToDeduce > 0) {
        pendingAdjustmentRef.current = -timeToDeduce;
      }
    }
    
    setSteps((prev) => prev.filter((step) => step.id !== stepId));
  };

  const addCustomTask = () => {
    const newStep: Step = {
      id: `custom-${Date.now()}`,
      title: "New Task",
      description: "",
      completed: false,
      estimatedTime: 15,
    };
    setSteps((prev) => [...prev, newStep]);
    
    // Increase timer by the new task's estimated time if timer is active
    if (timerActive) {
      pendingAdjustmentRef.current = 15 * 60; // Convert minutes to seconds
    }
  };

  const startEditing = (stepId: string) => {
    const step = steps.find((s) => s.id === stepId);
    if (step) {
      setEditingId(stepId);
      setEditingTitle(step.title);
      setEditingDescription(step.description || "");
    }
  };

  const finishEditing = (stepId: string) => {
    setSteps((prev) =>
      prev.map((step) =>
        step.id === stepId
          ? { ...step, title: editingTitle, description: editingDescription }
          : step
      )
    );
    setEditingId(null);
    setEditingTitle("");
    setEditingDescription("");
  };

  const handleDragStart = (e: React.DragEvent, stepId: string) => {
    setDraggedId(stepId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, targetStepId: string) => {
    e.preventDefault();
    if (!draggedId || draggedId === targetStepId) {
      setDraggedId(null);
      return;
    }

    setSteps((prev) => {
      const draggedIndex = prev.findIndex((s) => s.id === draggedId);
      const targetIndex = prev.findIndex((s) => s.id === targetStepId);

      if (draggedIndex === -1 || targetIndex === -1) return prev;

      const newSteps = [...prev];
      const [draggedStep] = newSteps.splice(draggedIndex, 1);
      newSteps.splice(targetIndex, 0, draggedStep);

      return newSteps;
    });

    setDraggedId(null);
  };

  if (steps.length === 0) {
    return (
      <div className="mobile-frame">
        <Navigation />
        <PinTabTutorial showAfterBreakdown={false} />
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
        <PinTabTutorial alwaysShowOnCurrentTasks={true} />
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

            <div style={{ display: "grid", gap: "12px", marginTop: "20px" }}>
              {steps.map((step) => (
                <div
                  key={step.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, step.id)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, step.id)}
                  className="mobile-card"
                  style={{
                    opacity: step.completed ? 0.6 : 1,
                    textDecoration: step.completed ? "line-through" : "none",
                    cursor: "grab",
                  }}
                >
                  <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <input
                      type="checkbox"
                      checked={step.completed}
                      onChange={() => toggleStepComplete(step.id)}
                      style={{
                        width: "20px",
                        height: "20px",
                        cursor: "pointer",
                        marginTop: "2px",
                        flexShrink: 0,
                      }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      {editingId === step.id ? (
                        <>
                          <input
                            type="text"
                            value={editingTitle}
                            onChange={(e) => setEditingTitle(e.target.value)}
                            className="mobile-input"
                            style={{ marginBottom: "8px" }}
                          />
                          <textarea
                            value={editingDescription}
                            onChange={(e) => setEditingDescription(e.target.value)}
                            className="mobile-textarea"
                            style={{ marginBottom: "8px", minHeight: "60px" }}
                          />
                          <div style={{ display: "flex", gap: "8px" }}>
                            <button
                              onClick={() => finishEditing(step.id)}
                              className="mobile-button-small"
                              style={{ marginBottom: 0 }}
                            >
                              SAVE
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="mobile-button-small"
                              style={{ marginBottom: 0 }}
                            >
                              CANCEL
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <h3 className="mobile-heading-3" style={{ margin: "0 0 4px 0" }}>
                            {step.title}
                          </h3>
                          {step.description && (
                            <p className="mobile-body-sm" style={{ margin: "0 0 8px 0", color: "var(--pixel-text-light)" }}>
                              {step.description}
                            </p>
                          )}
                          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                            <span className="mobile-body-sm" style={{ fontWeight: "bold" }}>
                              {step.estimatedTime}m
                            </span>
                            <button
                              onClick={() => startEditing(step.id)}
                              className="mobile-button-small"
                              style={{ marginBottom: 0, padding: "4px 8px", fontSize: "12px" }}
                            >
                              EDIT
                            </button>
                            <button
                              onClick={() => deleteStep(step.id)}
                              className="mobile-button-small"
                              style={{ marginBottom: 0, padding: "4px 8px", fontSize: "12px", backgroundColor: "#fee2e2", color: "#c62828" }}
                            >
                              DELETE
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={addCustomTask}
              className="mobile-button"
              style={{ marginTop: "20px" }}
            >
              + ADD CUSTOM TASK
            </button>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
