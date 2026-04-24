import { useLocation } from "wouter";
import { useState } from "react";

export default function Navigation() {
  const [location, navigate] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location === path;

  const navItems = [
    { path: "/", label: "HOME" },
    { path: "/current-tasks", label: "CURRENT TASKS" },
    { path: "/about", label: "ABOUT" },
    { path: "/blog", label: "BLOG" },
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
        <div className="flex items-center justify-between gap-6">
          <button
            onClick={() => navigate("/")}
            className="font-vt323 text-2xl font-bold text-foreground hover:text-accent transition-colors"
          >
            DO THE THING
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
          </div>

          {/* Mobile Hamburger Menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex flex-col gap-1 p-2"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-0.5 bg-foreground transition-all" />
            <div className="w-6 h-0.5 bg-foreground transition-all" />
            <div className="w-6 h-0.5 bg-foreground transition-all" />
          </button>
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

      {/* Mobile Timer Display (always visible) */}
      <div className="md:hidden bg-card border-b-2 border-border px-4 py-2">
        {location === "/current-tasks" && (
          <div className="text-center font-vt323 text-sm text-foreground">
            ⏱ Timer running in background
          </div>
        )}
      </div>
    </>
  );
}
