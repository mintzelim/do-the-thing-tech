import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
// BeforeUnloadModal removed - no leave-page warnings
import { ThemeProvider } from "./contexts/ThemeContext";
import { TimerProvider } from "./contexts/TimerContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import BlogCategories from "./pages/BlogCategories";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";
import CurrentTasks from "./pages/CurrentTasks";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/current-tasks"} component={CurrentTasks} />
      <Route path={"/about"} component={About} />
       <Route path={"/blog/categories"} component={BlogCategories} />
      <Route path={"/:blog/:slug"} component={BlogPost} />
      <Route path={"/:blog"} component={Blog} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/privacy"} component={Privacy} />
      <Route path={"/terms"} component={Terms} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Inject Organization schema on app load
  useEffect(() => {
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "DoTheThing",
      url: "https://dothething.tech",
      logo: "https://dothething.tech/favicon.ico",
      description: "Break down overwhelming tasks into manageable steps with AI-powered task management for ADHD",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "Customer Support",
        url: "https://dothething.tech/contact",
      },
    };

    // Check if schema already exists
    const existingSchema = document.querySelector('script[id="org-schema"]');
    if (!existingSchema) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = "org-schema";
      script.textContent = JSON.stringify(organizationSchema);
      document.head.appendChild(script);
    }
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TimerProvider>
          <TooltipProvider>
            <Toaster />
            {/* BeforeUnloadModal removed - no leave-page warnings */}
            <main className="flex-1 flex flex-col">
              <Router />
            </main>
          </TooltipProvider>
        </TimerProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
