import { useLocation } from "wouter";
import { useState } from "react";

export default function Navigation() {
  const [location, navigate] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          </div>

          {/* Mobile: CURRENT TASKS button (always visible) + Hamburger */}
          <div className="md:hidden flex items-center gap-2">
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
