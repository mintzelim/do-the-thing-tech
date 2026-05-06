import { ThemeProvider } from "./contexts/ThemeContext";
import { useEffect } from "react";
import { TimerProvider } from "./contexts/TimerContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";
import CurrentTasks from "./pages/CurrentTasks";
import NotFound from "./pages/NotFound";
import { Switch, Route } from "wouter";
import { enhancedSchema, injectSchema } from "./lib/enhancedSchema";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/current-tasks"} component={CurrentTasks} />
      <Route path={"/about"} component={About} />
      <Route path={"/blog/:slug"} component={BlogPost} />
      <Route path={"/blog"} component={Blog} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/privacy"} component={Privacy} />
      <Route path={"/terms"} component={Terms} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    // Inject enhanced schema on mount
    injectSchema(enhancedSchema);
  }, []);

  return (
    <ThemeProvider>
      <TimerProvider>
        <Router />
      </TimerProvider>
    </ThemeProvider>
  );
}

export default App;
