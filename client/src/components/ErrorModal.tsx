import { useState, useEffect } from "react";
import "../pixel-art-refined.css";

interface ErrorModalProps {
  isOpen: boolean;
  message: string;
  onRetry: () => void;
  onClose: () => void;
}

export function ErrorModal({ isOpen, message, onRetry, onClose }: ErrorModalProps) {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (isOpen && message) {
      setIsTyping(true);
      setDisplayText("");
      let index = 0;
      const interval = setInterval(() => {
        if (index < message.length) {
          setDisplayText(message.substring(0, index + 1));
          index++;
        } else {
          setIsTyping(false);
          clearInterval(interval);
        }
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isOpen, message]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-background border-4 border-foreground p-8 max-w-md w-full mx-4 pixel-art-box">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-foreground mb-4">⚠️ ERROR</h2>
          <div className="min-h-24 text-foreground font-mono text-sm leading-relaxed">
            {displayText}
            {isTyping && <span className="animate-pulse">▌</span>}
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={onRetry}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 border-2 border-blue-700 active:translate-y-1"
          >
            RETRY
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 border-2 border-gray-600 active:translate-y-1"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
}
