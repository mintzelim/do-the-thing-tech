import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from "react";

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
  const timerRefRef = useRef<NodeJS.Timeout | null>(null);
  const timeRemainingRef = useRef(0);

  // Load persisted timer state
  useEffect(() => {
    const savedState = localStorage.getItem('doTheThing_state');
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        const savedTime = parsed.timeRemaining || 0;
        setTimeRemaining(savedTime);
        timeRemainingRef.current = savedTime;
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

  // Accurate countdown timer using useRef to avoid dependency issues
  useEffect(() => {
    // Update ref when state changes
    timeRemainingRef.current = timeRemaining;
  }, [timeRemaining]);

  useEffect(() => {
    // Clear any existing interval
    if (timerRefRef.current) {
      clearInterval(timerRefRef.current);
      timerRefRef.current = null;
    }

    // If timer is not active or time is 0 or less, stop it
    if (!timerActive || timeRemaining <= 0) {
      if (timeRemaining <= 0 && timerActive) {
        setTimerActive(false);
      }
      return;
    }

    // Create a new interval that runs every 1000ms
    timerRefRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        const newTime = prev - 1;
        timeRemainingRef.current = newTime;
        
        // Stop timer when it reaches 0
        if (newTime <= 0) {
          setTimerActive(false);
          if (timerRefRef.current) {
            clearInterval(timerRefRef.current);
            timerRefRef.current = null;
          }
          return 0;
        }
        
        return newTime;
      });
    }, 1000);

    // Cleanup function
    return () => {
      if (timerRefRef.current) {
        clearInterval(timerRefRef.current);
        timerRefRef.current = null;
      }
    };
  }, [timerActive]); // Only depend on timerActive, not timeRemaining

  const startTimer = (totalSeconds: number) => {
    // Clear any existing timer first
    if (timerRefRef.current) {
      clearInterval(timerRefRef.current);
      timerRefRef.current = null;
    }
    
    setTimeRemaining(totalSeconds);
    timeRemainingRef.current = totalSeconds;
    setTimerActive(true);
  };

  const stopTimer = () => {
    setTimerActive(false);
    if (timerRefRef.current) {
      clearInterval(timerRefRef.current);
      timerRefRef.current = null;
    }
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
