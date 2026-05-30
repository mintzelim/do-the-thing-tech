import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"pixel" | "professional">("pixel");
  const [mounted, setMounted] = useState(false);

  // Initialize theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("dothething-theme") as "pixel" | "professional" | null;
    const initialTheme = savedTheme || "pixel";
    setTheme(initialTheme);
    applyTheme(initialTheme);
    setMounted(true);
  }, []);

  const applyTheme = (newTheme: "pixel" | "professional") => {
    if (newTheme === "professional") {
      document.documentElement.setAttribute("data-theme", "professional");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    localStorage.setItem("dothething-theme", newTheme);
  };

  const toggleTheme = () => {
    const newTheme = theme === "pixel" ? "professional" : "pixel";
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  if (!mounted) return null;

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      style={{
        padding: "8px 12px",
        border: "2px solid currentColor",
        background: "transparent",
        cursor: "pointer",
        fontSize: "12px",
        fontWeight: "600",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
        borderRadius: theme === "professional" ? "8px" : "0px",
        transition: "all 0.2s ease",
      }}
      title={`Switch to ${theme === "pixel" ? "Professional" : "Pixel"} mode`}
    >
      {theme === "pixel" ? "✨ Pro" : "🎨 Pixel"}
    </button>
  );
}
