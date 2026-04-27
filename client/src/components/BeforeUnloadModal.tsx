import { useState, useEffect } from "react";

export default function BeforeUnloadModal() {
  const [showModal, setShowModal] = useState(false);
  const [allowLeave, setAllowLeave] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      const savedState = localStorage.getItem("doTheThing_state");
      if (!savedState) return;

      try {
        const parsed = JSON.parse(savedState);
        const hasUnfinishedTasks = parsed.steps && parsed.steps.some((step: any) => !step.completed);
        const timerRunning = parsed.timerActive && parsed.timeRemaining > 0;

        if ((hasUnfinishedTasks || timerRunning) && !allowLeave) {
          setShowModal(true);
          e.preventDefault();
          e.returnValue = "";
        }
      } catch (error) {
        console.error("Failed to check beforeunload condition:", error);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [allowLeave]);

  const handleStay = () => {
    setShowModal(false);
  };

  const handleLeave = () => {
    setAllowLeave(true);
    window.location.href = "/";
  };

  if (!showModal) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      {/* Pixel-art modal */}
      <div
        style={{
          border: "4px solid var(--pixel-text)",
          backgroundColor: "var(--pixel-card-bg)",
          padding: "24px",
          maxWidth: "400px",
          boxShadow: "8px 8px 0px rgba(0, 0, 0, 0.3)",
        }}
      >
        {/* Tab icon */}
        <div style={{ fontSize: "48px", marginBottom: "16px", textAlign: "center" }}>
          📑
        </div>

        <h2
          style={{
            fontFamily: "'VT323', monospace",
            fontSize: "18px",
            fontWeight: "bold",
            color: "var(--pixel-text)",
            marginBottom: "12px",
            textAlign: "center",
            lineHeight: "1.4",
          }}
        >
          If you close the tab, I'll forget everything we did!
        </h2>

        <p
          style={{
            fontFamily: "'VT323', monospace",
            fontSize: "14px",
            color: "var(--pixel-text-light)",
            marginBottom: "24px",
            textAlign: "center",
          }}
        >
          Are you sure?
        </p>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "center",
          }}
        >
          <button
            onClick={handleStay}
            style={{
              padding: "8px 16px",
              border: "2px solid var(--pixel-accent)",
              backgroundColor: "var(--pixel-accent)",
              color: "white",
              fontFamily: "'VT323', monospace",
              fontSize: "14px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "4px 4px 0px rgba(0, 0, 0, 0.2)";
              e.currentTarget.style.transform = "translate(-2px, -2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.transform = "translate(0, 0)";
            }}
          >
            STAY
          </button>

          <button
            onClick={handleLeave}
            style={{
              padding: "8px 16px",
              border: "2px solid var(--pixel-border)",
              backgroundColor: "var(--pixel-bg)",
              color: "var(--pixel-text)",
              fontFamily: "'VT323', monospace",
              fontSize: "14px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#f5f5f5";
              e.currentTarget.style.boxShadow = "4px 4px 0px rgba(0, 0, 0, 0.2)";
              e.currentTarget.style.transform = "translate(-2px, -2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "var(--pixel-bg)";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.transform = "translate(0, 0)";
            }}
          >
            LEAVE
          </button>
        </div>
      </div>
    </div>
  );
}
