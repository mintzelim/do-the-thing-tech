import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type TimerContextType = {
  timeRemaining: number;
  timerActive: boolean;
  setTimeRemaining: (time: number) => void;
  setTimerActive: (active: boolean) => void;
  startTimer: (totalSeconds: number) => void;
  stopTimer: () => void;
};

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export function TimerProvider({ children }: { children: ReactNode }) {
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  // Load persisted timer state
  useEffect(() => {
    const savedState = localStorage.getItem('doTheThing_state');
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        setTimeRemaining(parsed.timeRemaining || 0);
        setTimerActive(parsed.timerActive || false);
      } catch (error) {
        console.error('Failed to load timer state:', error);
      }
    }
  }, []);

  // Save timer state to localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('doTheThing_state');
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        parsed.timeRemaining = timeRemaining;
        parsed.timerActive = timerActive;
        localStorage.setItem('doTheThing_state', JSON.stringify(parsed));
      } catch (error) {
        console.error('Failed to save timer state:', error);
      }
    }
  }, [timeRemaining, timerActive]);

  // Global timer countdown
  useEffect(() => {
    if (!timerActive || timeRemaining <= 0) {
      if (timeRemaining <= 0) {
        setTimerActive(false);
      }
      return;
    }

    const interval = setInterval(() => {
      setTimeRemaining((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [timerActive, timeRemaining]);

  const startTimer = (totalSeconds: number) => {
    setTimeRemaining(totalSeconds);
    setTimerActive(true);
  };

  const stopTimer = () => {
    setTimerActive(false);
  };

  return (
    <TimerContext.Provider
      value={{
        timeRemaining,
        timerActive,
        setTimeRemaining,
        setTimerActive,
        startTimer,
        stopTimer,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
}

export function useTimer() {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error("useTimer must be used within TimerProvider");
  }
  return context;
}
