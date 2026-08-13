import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useTimer } from "@/contexts/TimerContext";
import Navigation from "@/components/Navigation";
import PinTabTutorial from "@/components/PinTabTutorial";
import Footer from "@/components/Footer";
import { assetUrl } from "@/lib/assetUrl";
import "../pixel-art-refined.css";
import "../current-tasks-refined.css";

type Step = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  estimatedTime: number;
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
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      oscillator.frequency.setValueAtTime(1200, now);
      oscillator.frequency.exponentialRampToValueAtTime(400, now + 0.1);
      oscillator.type = "sine";
      gainNode.gain.setValueAtTime(0.25, now);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      oscillator.start(now);
      oscillator.stop(now + 0.1);
    } catch (error) {
      console.error("Could not play sound:", error);
    }
  };

  const toggleStepComplete = (stepId: string) => {
    playClickSound();
    setSteps((previousSteps) => previousSteps.map((step) => {
      if (step.id !== stepId) return step;
      const isCompleting = !step.completed;
      if (timerActive) {
        const timeChange = minutesToSeconds(step.estimatedTime) * (isCompleting ? -1 : 1);
        setTimeout(() => adjustTime(timeChange), 0);
      }
      return { ...step, completed: isCompleting };
    }));
  };

  const updateStepTime = (stepId: string, newTime: number) => {
    const oldStep = steps.find((step) => step.id === stepId);
    if (oldStep && timerActive && newTime !== oldStep.estimatedTime) {
      setTimeout(() => adjustTime((newTime - oldStep.estimatedTime) * 60), 0);
    }
    setSteps((previousSteps) => previousSteps.map((step) => step.id === stepId ? { ...step, estimatedTime: newTime } : step));
  };

  const deleteStep = (stepId: string) => {
    const stepToDelete = steps.find((step) => step.id === stepId);
    if (stepToDelete && timerActive) setTimeout(() => adjustTime(-minutesToSeconds(stepToDelete.estimatedTime)), 0);
    setSteps((previousSteps) => previousSteps.filter((step) => step.id !== stepId));
  };

  const addCustomTask = () => {
    const newStep: Step = { id: `custom-${Date.now()}`, title: "New Task", description: "", completed: false, estimatedTime: 15 };
    setSteps((previousSteps) => [...previousSteps, newStep]);
    if (timerActive) setTimeout(() => adjustTime(15 * 60), 0);
  };

  const startEditing = (stepId: string) => {
    const step = steps.find((candidate) => candidate.id === stepId);
    if (!step) return;
    setEditingId(stepId);
    setEditingTitle(step.title);
    setEditingDescription(step.description || "");
  };

  const finishEditing = (stepId: string) => {
    setSteps((previousSteps) => previousSteps.map((step) => step.id === stepId ? { ...step, title: editingTitle, description: editingDescription } : step));
    setEditingId(null);
    setEditingTitle("");
    setEditingDescription("");
  };

  const handleDragStart = (event: React.DragEvent, stepId: string) => {
    setDraggedId(stepId);
    event.dataTransfer.effectAllowed = "move";
  };

  const handleDrop = (event: React.DragEvent, targetStepId: string) => {
    event.preventDefault();
    if (!draggedId || draggedId === targetStepId) return setDraggedId(null);
    setSteps((previousSteps) => {
      const draggedIndex = previousSteps.findIndex((step) => step.id === draggedId);
      const targetIndex = previousSteps.findIndex((step) => step.id === targetStepId);
      if (draggedIndex === -1 || targetIndex === -1) return previousSteps;
      const reorderedSteps = [...previousSteps];
      const [draggedStep] = reorderedSteps.splice(draggedIndex, 1);
      reorderedSteps.splice(targetIndex, 0, draggedStep);
      return reorderedSteps;
    });
    setDraggedId(null);
  };

  const formatDisplayTime = (seconds: number) => {
    const safeSeconds = Math.max(0, Math.round(seconds));
    const hours = Math.floor(safeSeconds / 3600);
    const minutes = Math.floor((safeSeconds % 3600) / 60);
    const remainingSeconds = safeSeconds % 60;
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m ${remainingSeconds}s`;
  };

  const renderEmptyState = () => (
    <main className="current-tasks-shell current-tasks-empty">
      <p className="current-tasks-eyebrow">YOUR FOCUS QUEUE</p>
      <h1>NO TASKS YET</h1>
      <p>Go to Home and create a task breakdown to get started.</p>
      <button className="current-tasks-primary" onClick={() => navigate("/")}>CREATE TASKS <span aria-hidden="true">→</span></button>
    </main>
  );

  const remainingTotalSeconds = getRemainingTotalSeconds(steps);
  const completedCount = steps.filter((step) => step.completed).length;
  const allCompleted = steps.length > 0 && steps.every((step) => step.completed);

  return (
    <div className="mobile-frame current-tasks-page">
      <Navigation />
      {steps.length === 0 ? renderEmptyState() : (
        <main className="current-tasks-shell">
          <PinTabTutorial alwaysShowOnCurrentTasks />
          {allCompleted ? (
            <section className="current-tasks-complete" aria-labelledby="complete-heading">
              <div className="current-tasks-complete-art" aria-hidden="true">
                <span className="current-tasks-celebration-bubble">YAY!</span>
                <img src={assetUrl("/manus-storage/dothething-how-it-works-focus-transparent_c55dcc2f.png")} alt="" />
              </div>
              <p className="current-tasks-eyebrow">FOCUS QUEUE COMPLETE</p>
              <h1 id="complete-heading">YOU DID IT!</h1>
              <p>All {steps.length} tasks are complete. Amazing work.</p>
              <button className="current-tasks-primary" onClick={() => { localStorage.removeItem("doTheThing_state"); navigate("/"); }}>CREATE NEW TASKS <span aria-hidden="true">→</span></button>
            </section>
          ) : (
            <>
              <header className="current-tasks-header">
                <button className="current-tasks-back" onClick={() => navigate("/")}><span aria-hidden="true">←</span> BACK</button>
                <div>
                  <p className="current-tasks-eyebrow">YOUR FOCUS QUEUE</p>
                  <h1>CURRENT TASKS</h1>
                </div>
              </header>

              <button className={`current-tasks-summary ${timerActive ? "is-active" : ""}`} onClick={timerActive ? stopTimer : () => startTimer(remainingTotalSeconds)} aria-pressed={timerActive}>
                <span className="current-tasks-summary-label">{timerActive ? "TIME REMAINING" : "TOTAL TIME"}</span>
                <strong>{timerActive ? formatDisplayTime(timeRemaining) : formatDisplayTime(remainingTotalSeconds)}</strong>
                <span className="current-tasks-summary-action">{timerActive ? "STOP COUNTDOWN" : "START COUNTDOWN"} <span aria-hidden="true">→</span></span>
                <span className="current-tasks-summary-progress">PROGRESS {completedCount}/{steps.length}</span>
              </button>

              <section className="current-tasks-list" aria-label="Current task list">
                {steps.map((step) => (
                  <article key={step.id} className={`current-task-card ${step.completed ? "is-complete" : ""} ${draggedId === step.id ? "is-dragging" : ""}`} draggable onDragStart={(event) => handleDragStart(event, step.id)} onDragOver={(event) => event.preventDefault()} onDrop={(event) => handleDrop(event, step.id)}>
                    <span className="current-task-grip" aria-hidden="true" />
                    <input className="current-task-checkbox" type="checkbox" checked={step.completed} onChange={() => toggleStepComplete(step.id)} aria-label={`Mark ${step.title} complete`} />
                    <div className="current-task-main">
                      {editingId === step.id ? (
                        <div className="current-task-editor">
                          <input value={editingTitle} onChange={(event) => setEditingTitle(event.target.value)} placeholder="Task title" aria-label="Task title" />
                          <textarea value={editingDescription} onChange={(event) => setEditingDescription(event.target.value)} placeholder="Task description" aria-label="Task description" />
                          <div className="current-task-editor-actions"><button className="current-task-edit" onClick={() => finishEditing(step.id)}>SAVE</button><button className="current-task-cancel" onClick={() => setEditingId(null)}>CANCEL</button></div>
                        </div>
                      ) : (
                        <>
                          <h2 className="current-task-title">{step.title}</h2>
                          {step.description && <p className="current-task-description">{step.description}</p>}
                          <div className="current-task-controls">
                            <label className="current-task-duration"><input type="number" value={step.estimatedTime} onFocus={(event) => event.currentTarget.select()} onClick={(event) => event.currentTarget.select()} onChange={(event) => updateStepTime(step.id, parseInt(event.target.value, 10) || 0)} min="1" aria-label={`${step.title} estimated minutes`} /><span>MIN</span></label>
                            <button className="current-task-edit" onClick={() => startEditing(step.id)}>EDIT</button>
                            <button className="current-task-delete" onClick={() => deleteStep(step.id)}>DELETE</button>
                          </div>
                        </>
                      )}
                    </div>
                  </article>
                ))}
              </section>

              <button className="current-tasks-add" onClick={addCustomTask}><span aria-hidden="true">+</span> ADD TASK</button>
            </>
          )}
        </main>
      )}
      <Footer />
    </div>
  );
}
