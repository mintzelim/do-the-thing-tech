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
  const pendingAdjustmentRef = useRef<number | null>(null);

  // Apply pending timer adjustments after state updates
  useEffect(() => {
    if (pendingAdjustmentRef.current !== null) {
      adjustTime(pendingAdjustmentRef.current);
      pendingAdjustmentRef.current = null;
    }
  }, [steps, adjustTime]);

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
    
    // Queue timer adjustment to happen after state update
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

  const saveEditing = () => {
    if (editingId) {
      setSteps((prev) =>
        prev.map((step) =>
          step.id === editingId
            ? { ...step, title: editingTitle, description: editingDescription }
            : step
        )
      );
      setEditingId(null);
      setEditingTitle("");
      setEditingDescription("");
    }
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingTitle("");
    setEditingDescription("");
  };

  const handleDragStart = (stepId: string) => {
    setDraggedId(stepId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (targetStepId: string) => {
    if (!draggedId || draggedId === targetStepId) return;

    const draggedIndex = steps.findIndex((s) => s.id === draggedId);
    const targetIndex = steps.findIndex((s) => s.id === targetStepId);

    if (draggedIndex === -1 || targetIndex === -1) return;

    const newSteps = [...steps];
    const [draggedStep] = newSteps.splice(draggedIndex, 1);
    newSteps.splice(targetIndex, 0, draggedStep);

    setSteps(newSteps);
    setDraggedId(null);
  };

  const handleDragEnd = () => {
    setDraggedId(null);
  };

  return (
    <div className="mobile-frame">
      <Navigation />
      <div className="mobile-content">
        <h1 className="mobile-heading-1">CURRENT TASKS</h1>

        <div className="mobile-summary" style={{ marginBottom: "20px" }}>
          <div className="mobile-summary-label">{timerActive ? "TIME REMAINING" : "TOTAL TIME"}</div>
          <div className="mobile-summary-value" style={{ color: timerActive ? "#ef4444" : "var(--pixel-accent)" }}>
            {timerActive ? formatTime(timeRemaining) : formatTime(getRemainingTotalSeconds(steps))}
          </div>
          <div style={{ marginTop: "12px", display: "flex", gap: "8px" }}>
            <button
              onClick={handleStartTimer}
              disabled={timerActive || steps.length === 0}
              className="mobile-button"
              style={{ flex: 1 }}
            >
              START
            </button>
            <button
              onClick={handleStopTimer}
              disabled={!timerActive}
              className="mobile-button"
              style={{ flex: 1 }}
            >
              STOP
            </button>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto" }}>
          {steps.map((step) => (
            <div
              key={step.id}
              className={`mobile-task-item ${step.completed ? "completed" : ""} ${draggedId === step.id ? "dragging" : ""}`}
              draggable
              onDragStart={() => handleDragStart(step.id)}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(step.id)}
              onDragEnd={handleDragEnd}
            >
              <div className="mobile-task-drag-handle" title="Drag to reorder">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="8" cy="6" r="1" fill="currentColor" />
                  <circle cx="8" cy="12" r="1" fill="currentColor" />
                  <circle cx="8" cy="18" r="1" fill="currentColor" />
                  <circle cx="16" cy="6" r="1" fill="currentColor" />
                  <circle cx="16" cy="12" r="1" fill="currentColor" />
                  <circle cx="16" cy="18" r="1" fill="currentColor" />
                </svg>
              </div>
              <input
                type="checkbox"
                className="mobile-checkbox mobile-task-checkbox"
                checked={step.completed}
                onChange={() => toggleStepComplete(step.id)}
              />

              {editingId === step.id ? (
                <div className="mobile-task-content" style={{ flex: 1 }}>
                  <input
                    type="text"
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                    className="mobile-task-time-input"
                    style={{ width: "100%", marginBottom: "8px" }}
                    placeholder="Task title"
                  />
                  <textarea
                    value={editingDescription}
                    onChange={(e) => setEditingDescription(e.target.value)}
                    className="mobile-textarea"
                    style={{ width: "100%", marginBottom: "8px", minHeight: "60px" }}
                    placeholder="Description (optional)"
                  />
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      onClick={saveEditing}
                      className="mobile-button"
                      style={{ flex: 1, padding: "6px 12px", fontSize: "12px" }}
                    >
                      SAVE
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="mobile-button"
                      style={{ flex: 1, padding: "6px 12px", fontSize: "12px" }}
                    >
                      CANCEL
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mobile-task-content">
                  <div
                    className="mobile-task-title"
                    style={{
                      textDecoration: step.completed ? "line-through" : "none",
                      cursor: "pointer",
                    }}
                    onClick={() => startEditing(step.id)}
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
              )}
            </div>
          ))}
        </div>

        <button
          onClick={addCustomTask}
          className="mobile-button"
          style={{ marginTop: "16px" }}
        >
          + ADD TASK
        </button>

        <PinTabTutorial showAfterBreakdown={false} />
      </div>
      <Footer />
    </div>
  );
}

function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${secs}s`;
  } else {
    return `${secs}s`;
  }
}
