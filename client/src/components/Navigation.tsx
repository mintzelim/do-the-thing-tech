import { useLocation } from "wouter";

export default function Navigation() {
  const [location, navigate] = useLocation();

  const isActive = (path: string) => location === path;

  return (
    <nav className="border-b-2 border-border bg-card px-6 py-4">
      <div className="flex items-center justify-between gap-6">
        <button
          onClick={() => navigate("/")}
          className="font-vt323 text-lg font-bold text-foreground hover:text-accent transition-colors"
        >
          DO THE THING
        </button>
        
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/")}
            className={`px-4 py-2 border-2 font-vt323 text-sm transition-colors ${
              isActive("/")
                ? "border-accent bg-accent text-white"
                : "border-border bg-background text-foreground hover:bg-accent hover:text-white"
            }`}
          >
            HOME
          </button>
          <button
            onClick={() => navigate("/about")}
            className={`px-4 py-2 border-2 font-vt323 text-sm transition-colors ${
              isActive("/about")
                ? "border-accent bg-accent text-white"
                : "border-border bg-background text-foreground hover:bg-accent hover:text-white"
            }`}
          >
            ABOUT
          </button>
          <button
            onClick={() => navigate("/blog")}
            className={`px-4 py-2 border-2 font-vt323 text-sm transition-colors ${
              isActive("/blog")
                ? "border-accent bg-accent text-white"
                : "border-border bg-background text-foreground hover:bg-accent hover:text-white"
            }`}
          >
            BLOG
          </button>
          <button
            onClick={() => navigate("/privacy")}
            className={`px-4 py-2 border-2 font-vt323 text-sm transition-colors ${
              isActive("/privacy")
                ? "border-accent bg-accent text-white"
                : "border-border bg-background text-foreground hover:bg-accent hover:text-white"
            }`}
          >
            PRIVACY
          </button>
          <button
            onClick={() => navigate("/terms")}
            className={`px-4 py-2 border-2 font-vt323 text-sm transition-colors ${
              isActive("/terms")
                ? "border-accent bg-accent text-white"
                : "border-border bg-background text-foreground hover:bg-accent hover:text-white"
            }`}
          >
            TERMS
          </button>
        </div>
      </div>
    </nav>
  );
}
