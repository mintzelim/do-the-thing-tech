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
      
      // Recover timer with timestamp-based recovery
      if (parsed.timerActive && parsed.timerStartTimestamp) {
        const now = Date.now();
        const elapsedMs = now - parsed.timerStartTimestamp;
        const elapsedSeconds = Math.floor(elapsedMs / 1000);
        const originalTimeRemaining = Number(parsed.timeRemaining) || 0;
        const recoveredTime = Math.max(0, originalTimeRemaining - elapsedSeconds);
        
        setTimeRemaining(recoveredTime);
        setTimerActive(recoveredTime > 0);
      } else {
        setTimeRemaining(Number(parsed.timeRemaining) || 0);
        setTimerActive(Boolean(parsed.timerActive));
      }
    } catch (error) {
      console.error("Failed to load timer state:", error);
    }
  }, []);

  useEffect(() => {
    const savedState = localStorage.getItem("doTheThing_state");
    let parsed: any = {};
    
    if (savedState) {
      try {
        parsed = JSON.parse(savedState);
      } catch (error) {
        console.error("[Timer] Failed to parse saved state, clearing corrupted data:", error);
        localStorage.removeItem("doTheThing_state");
        parsed = {};
      }
    }

    parsed.timeRemaining = timeRemaining;
    parsed.timerActive = timerActive;
    
    // Save timestamp when timer is active for recovery
    if (timerActive) {
      parsed.timerStartTimestamp = Date.now();
    } else {
      delete parsed.timerStartTimestamp;
    }

    localStorage.setItem("doTheThing_state", JSON.stringify(parsed));
  }, [timeRemaining, timerActive]);

  // Beforeunload warning is now handled by BeforeUnloadModal component

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
    
    // Save start timestamp for recovery
    const savedState = localStorage.getItem("doTheThing_state");
    let parsed: any = {};
    if (savedState) {
      try {
        parsed = JSON.parse(savedState);
      } catch (error) {
        console.error("[Timer] Failed to parse saved state in startTimer:", error);
        parsed = {};
      }
    }
    parsed.timerStartTimestamp = Date.now();
    localStorage.setItem("doTheThing_state", JSON.stringify(parsed));
  };

  const stopTimer = () => {
    setTimerActive(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    // Clear timer timestamp when stopped
    const savedState = localStorage.getItem("doTheThing_state");
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        delete parsed.timerStartTimestamp;
        localStorage.setItem("doTheThing_state", JSON.stringify(parsed));
      } catch (error) {
        console.error("[Timer] Failed to parse saved state in stopTimer:", error);
        localStorage.removeItem("doTheThing_state");
      }
    }
  };

  const adjustTime = (deltaSeconds: number) => {
    setTimeRemaining((prev) => {
      const next = Math.max(0, prev + Math.round(deltaSeconds));

      // If adding time back and timer was stopped, restart it
      if (deltaSeconds > 0 && !timerActive && next > 0) {
        setTimerActive(true);
      }

      // If time reaches zero, stop the timer
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
