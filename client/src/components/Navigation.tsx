import { useLocation } from "wouter";
import { useState, useEffect } from "react";
import { assetUrl } from "@/lib/assetUrl";

export default function Navigation() {
  const [location, navigate] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasRunningTasks, setHasRunningTasks] = useState(false);

  useEffect(() => {
    const checkTasks = () => {
      const savedState = localStorage.getItem("doTheThing_state");
      if (!savedState) {
        setHasRunningTasks(false);
        return;
      }

      try {
        const parsed = JSON.parse(savedState);
        setHasRunningTasks(Array.isArray(parsed.steps) && parsed.steps.length > 0);
      } catch {
        setHasRunningTasks(false);
      }
    };

    checkTasks();
    window.addEventListener("storage", checkTasks);
    return () => window.removeEventListener("storage", checkTasks);
  }, [location]);

  const isActive = (path: string) => {
    if (path === "/blog") return location === "/blog" || location.startsWith("/blog/");
    if (path === "/quiz") return location === "/quiz" || location.startsWith("/quiz/");
    return location === path;
  };

  const navItems = [
    { path: "/", label: "HOME" },
    { path: "/about", label: "ABOUT" },
    { path: "/blog", label: "BLOG" },
    { path: "/quiz", label: "QUIZ" },
    { path: "/contact", label: "CONTACT" },
    { path: "/privacy", label: "PRIVACY" },
    { path: "/terms", label: "TERMS" },
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="reference-header-shell">
      <nav className="reference-header" aria-label="Main navigation">
        <button
          onClick={() => handleNavClick("/")}
          className="reference-brand"
          title="DoTheThing"
          aria-label="DoTheThing home"
        >
          <img
            src={assetUrl("/manus-storage/logo_dabca0e9.png")}
            alt="DoTheThing Logo"
            className="reference-brand-logo"
          />
        </button>

        <div className="reference-desktop-nav">
          <div className="reference-nav-links">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`reference-nav-link ${isActive(item.path) ? "is-active" : ""}`}
              >
                {item.label}
              </button>
            ))}
            {hasRunningTasks && (
              <button
                onClick={() => handleNavClick("/current-tasks")}
                className={`reference-nav-link ${isActive("/current-tasks") ? "is-active" : ""}`}
              >
                CURRENT TASKS
              </button>
            )}
          </div>
          <button onClick={() => handleNavClick("/")} className="reference-header-cta">
            START A TASK <span aria-hidden="true">→</span>
          </button>
        </div>

        <div className="reference-mobile-actions">
          {hasRunningTasks && (
            <button onClick={() => handleNavClick("/current-tasks")} className="reference-mobile-task-link">
              TASKS
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="reference-menu-button"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="reference-mobile-menu">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavClick(item.path)}
              className={`reference-mobile-link ${isActive(item.path) ? "is-active" : ""}`}
            >
              {item.label}
            </button>
          ))}
          {hasRunningTasks && (
            <button
              onClick={() => handleNavClick("/current-tasks")}
              className={`reference-mobile-link ${isActive("/current-tasks") ? "is-active" : ""}`}
            >
              CURRENT TASKS
            </button>
          )}
          <button onClick={() => handleNavClick("/")} className="reference-mobile-cta">
            START A TASK <span aria-hidden="true">→</span>
          </button>
        </div>
      )}
    </header>
  );
}
