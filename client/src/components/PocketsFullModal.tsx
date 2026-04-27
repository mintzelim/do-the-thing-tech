import { useLocation } from "wouter";

interface PocketsFullModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartOver: () => void;
}

export default function PocketsFullModal({ isOpen, onClose, onStartOver }: PocketsFullModalProps) {
  const [, setLocation] = useLocation();

  if (!isOpen) return null;

  const handleTakeMeThere = () => {
    onClose();
    setLocation("/current-tasks");
  };

  const handleStartOver = () => {
    onStartOver();
    onClose();
  };

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
      onClick={onClose}
    >
      {/* Pixel-art modal - click inside to prevent closing */}
      <div
        style={{
          border: "4px solid var(--pixel-text)",
          backgroundColor: "var(--pixel-card-bg)",
          padding: "24px",
          maxWidth: "450px",
          boxShadow: "8px 8px 0px rgba(0, 0, 0, 0.3)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Backpack/Pocket icon */}
        <div style={{ fontSize: "48px", marginBottom: "16px", textAlign: "center" }}>
          🎒
        </div>

        <h2
          style={{
            fontFamily: "'VT323', monospace",
            fontSize: "20px",
            fontWeight: "bold",
            color: "var(--pixel-text)",
            marginBottom: "12px",
            textAlign: "center",
            lineHeight: "1.4",
          }}
        >
          Oh! My pockets are full!
        </h2>

        <p
          style={{
            fontFamily: "'VT323', monospace",
            fontSize: "14px",
            color: "var(--pixel-text)",
            marginBottom: "20px",
            textAlign: "center",
            lineHeight: "1.5",
          }}
        >
          If we jump into new tasks now, your current ones will poof away! To keep them safe, you can hop over to Current Tasks and add them in manually.
        </p>

        <p
          style={{
            fontFamily: "'VT323', monospace",
            fontSize: "14px",
            color: "var(--pixel-text)",
            marginBottom: "24px",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Should we keep going or head over to Current Tasks?
        </p>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={handleTakeMeThere}
            style={{
              padding: "10px 16px",
              border: "2px solid var(--pixel-accent)",
              backgroundColor: "var(--pixel-accent)",
              color: "white",
              fontFamily: "'VT323', monospace",
              fontSize: "14px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "all 0.2s",
              minWidth: "140px",
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
            TAKE ME THERE
          </button>

          <button
            onClick={handleStartOver}
            style={{
              padding: "10px 16px",
              border: "2px solid var(--pixel-border)",
              backgroundColor: "var(--pixel-bg)",
              color: "var(--pixel-text)",
              fontFamily: "'VT323', monospace",
              fontSize: "14px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "all 0.2s",
              minWidth: "140px",
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
            START OVER
          </button>
        </div>
      </div>
    </div>
  );
}
