import { useLocation } from "wouter";

export default function Footer() {
  const [, navigate] = useLocation();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <footer
      style={{
        textAlign: "center",
        padding: "20px",
        borderTop: "3px solid var(--pixel-border)",
        marginTop: "auto",
        backgroundColor: "var(--pixel-card-bg)",
        fontFamily: "'VT323', monospace",
        fontSize: "12px",
        color: "var(--pixel-text-light)",
      }}
    >
      <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap", marginBottom: "12px" }}>
        <button
          onClick={() => handleNavigation("/")}
          style={{
            backgroundColor: "transparent",
            border: "none",
            color: "var(--pixel-text-light)",
            textDecoration: "none",
            cursor: "pointer",
            fontFamily: "'VT323', monospace",
            fontSize: "12px",
            padding: 0,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
          onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
        >
          HOME
        </button>
        <button
          onClick={() => handleNavigation("/about")}
          style={{
            backgroundColor: "transparent",
            border: "none",
            color: "var(--pixel-text-light)",
            textDecoration: "none",
            cursor: "pointer",
            fontFamily: "'VT323', monospace",
            fontSize: "12px",
            padding: 0,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
          onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
        >
          ABOUT
        </button>
        <button
          onClick={() => handleNavigation("/blog")}
          style={{
            backgroundColor: "transparent",
            border: "none",
            color: "var(--pixel-text-light)",
            textDecoration: "none",
            cursor: "pointer",
            fontFamily: "'VT323', monospace",
            fontSize: "12px",
            padding: 0,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
          onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
        >
          BLOG
        </button>
        <button
          onClick={() => handleNavigation("/contact")}
          style={{
            backgroundColor: "transparent",
            border: "none",
            color: "var(--pixel-text-light)",
            textDecoration: "none",
            cursor: "pointer",
            fontFamily: "'VT323', monospace",
            fontSize: "12px",
            padding: 0,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
          onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
        >
          CONTACT
        </button>
        <button
          onClick={() => handleNavigation("/privacy")}
          style={{
            backgroundColor: "transparent",
            border: "none",
            color: "var(--pixel-text-light)",
            textDecoration: "none",
            cursor: "pointer",
            fontFamily: "'VT323', monospace",
            fontSize: "12px",
            padding: 0,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
          onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
        >
          PRIVACY
        </button>
        <button
          onClick={() => handleNavigation("/terms")}
          style={{
            backgroundColor: "transparent",
            border: "none",
            color: "var(--pixel-text-light)",
            textDecoration: "none",
            cursor: "pointer",
            fontFamily: "'VT323', monospace",
            fontSize: "12px",
            padding: 0,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
          onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
        >
          TERMS
        </button>
      </div>
      <p style={{ margin: 0, fontSize: "11px", color: "var(--pixel-text-light)" }}>
        DoTheThing - Task Management for ADHD Brains
      </p>
    </footer>
  );
}
