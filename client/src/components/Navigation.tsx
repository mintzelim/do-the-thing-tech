import { useLocation } from "wouter";
import { useState, useEffect } from "react";

export default function Navigation() {
  const [location, navigate] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasRunningTasks, setHasRunningTasks] = useState(false);

  useEffect(() => {
    const checkTasks = () => {
      const savedState = localStorage.getItem('doTheThing_state');
      if (savedState) {
        try {
          const parsed = JSON.parse(savedState);
          const steps = parsed.steps || [];
          setHasRunningTasks(steps.length > 0);
        } catch (error) {
          setHasRunningTasks(false);
        }
      } else {
        setHasRunningTasks(false);
      }
    };

    checkTasks();

    // Listen for storage changes
    window.addEventListener('storage', checkTasks);
    return () => window.removeEventListener('storage', checkTasks);
  }, [location]);

  const isActive = (path: string) => location === path;

  const navItems = [
    { path: "/", label: "HOME" },
    { path: "/about", label: "ABOUT" },
    { path: "/blog", label: "BLOG" },
    { path: "/contact", label: "CONTACT" },
    { path: "/privacy", label: "PRIVACY" },
    { path: "/terms", label: "TERMS" },
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="border-b-2 border-border bg-card px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => navigate("/")}
            className="hover:opacity-80 transition-opacity"
            title="DoTheThing"
          >
            <img
              src="/manus-storage/DoTheThing_Logo_166a1c8b.png"
              alt="DoTheThing Logo"
              className="h-12 w-auto"
            />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-4">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`px-6 py-3 border-2 font-vt323 text-base transition-colors ${
                  isActive(item.path)
                    ? "border-accent bg-accent text-white"
                    : "border-border bg-background text-foreground hover:bg-accent hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
            {hasRunningTasks && (
              <button
                onClick={() => handleNavClick("/current-tasks")}
                className={`px-6 py-3 border-2 font-vt323 text-base transition-colors ${
                  isActive("/current-tasks")
                    ? "border-accent bg-accent text-white"
                    : "border-border bg-background text-foreground hover:bg-accent hover:text-white"
                }`}
              >
                CURRENT TASKS
              </button>
            )}
          </div>

          {/* Mobile: CURRENT TASKS button (only if running tasks) + Hamburger */}
          <div className="md:hidden flex items-center gap-2">
            {hasRunningTasks && (
              <button
                onClick={() => handleNavClick("/current-tasks")}
                className={`px-4 py-2 border-2 font-vt323 text-sm transition-colors ${
                  isActive("/current-tasks")
                    ? "border-accent bg-accent text-white"
                    : "border-border bg-background text-foreground"
                }`}
              >
                TASKS
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex flex-col gap-1 p-2"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-0.5 bg-foreground transition-all" />
              <div className="w-6 h-0.5 bg-foreground transition-all" />
              <div className="w-6 h-0.5 bg-foreground transition-all" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 flex flex-col gap-2 border-t-2 border-border pt-4">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`w-full px-4 py-3 border-2 font-vt323 text-base transition-colors text-left ${
                  isActive(item.path)
                    ? "border-accent bg-accent text-white"
                    : "border-border bg-background text-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>
    </>
  );
}
