import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from "react";

type TimerContextType = {
  timeRemaining: number; // countdown state is always stored in seconds
  timerActive: boolean;
  setTimeRemaining: (time: number) => void;
  setTimerActive: (active: boolean) => void;
  startTimer: (totalSeconds: number) => void;
  stopTimer: () => void;
  adjustTime: (deltaSeconds: number) => void;
  deductTime: (seconds: number) => void;
};

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export function TimerProvider({ children }: { children: ReactNode }) {
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const savedState = localStorage.getItem("doTheThing_state");
    if (!savedState) return;

    try {
      const parsed = JSON.parse(savedState);
      setTimeRemaining(Number(parsed.timeRemaining) || 0);
      setTimerActive(Boolean(parsed.timerActive));
    } catch (error) {
      console.error("Failed to load timer state:", error);
    }
  }, []);

  useEffect(() => {
    const savedState = localStorage.getItem("doTheThing_state");
    const parsed = savedState ? JSON.parse(savedState) : {};

    parsed.timeRemaining = timeRemaining;
    parsed.timerActive = timerActive;

    localStorage.setItem("doTheThing_state", JSON.stringify(parsed));
  }, [timeRemaining, timerActive]);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (!timerActive || timeRemaining <= 0) {
      if (timerActive && timeRemaining <= 0) {
        setTimerActive(false);
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        const next = Math.max(0, prev - 1);

        if (next <= 0) {
          setTimerActive(false);
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        }

        return next;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [timerActive, timeRemaining]);

  const startTimer = (totalSeconds: number) => {
    const safeSeconds = Math.max(0, Math.round(totalSeconds));
    setTimeRemaining(safeSeconds);
    setTimerActive(safeSeconds > 0);
  };

  const stopTimer = () => {
    setTimerActive(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const adjustTime = (deltaSeconds: number) => {
    setTimeRemaining((prev) => {
      const next = Math.max(0, prev + Math.round(deltaSeconds));

      if (next <= 0) {
        setTimerActive(false);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }

      return next;
    });
  };

  const deductTime = (seconds: number) => {
    adjustTime(-Math.abs(seconds));
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
        adjustTime,
        deductTime,
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
