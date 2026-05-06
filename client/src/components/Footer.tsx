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
      <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginTop: "12px", marginBottom: "8px" }}>
        <a
          href="https://www.instagram.com/dothething.tech?igsh=MWxhM2xqMzM0ZHE1OQ=="
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "var(--pixel-text-light)",
            textDecoration: "none",
            fontFamily: "'VT323', monospace",
            fontSize: "12px",
            padding: "4px 8px",
            border: "1px solid var(--pixel-border)",
            backgroundColor: "transparent",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--pixel-border)";
            e.currentTarget.style.textDecoration = "underline";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.textDecoration = "none";
          }}
        >
          INSTAGRAM
        </a>
        <a
          href="https://www.tiktok.com/@dothething.tech?_r=1&_t=ZS-967yRO88m9c"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "var(--pixel-text-light)",
            textDecoration: "none",
            fontFamily: "'VT323', monospace",
            fontSize: "12px",
            padding: "4px 8px",
            border: "1px solid var(--pixel-border)",
            backgroundColor: "transparent",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--pixel-border)";
            e.currentTarget.style.textDecoration = "underline";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.textDecoration = "none";
          }}
        >
          TIKTOK
        </a>
      </div>
      <p style={{ margin: 0, fontSize: "11px", color: "var(--pixel-text-light)" }}>
        DoTheThing - Task Management for ADHD Brains
      </p>
    </footer>
  );
}
