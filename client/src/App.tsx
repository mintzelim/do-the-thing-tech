import { ThemeProvider } from "./contexts/ThemeContext";
import { TimerProvider } from "./contexts/TimerContext";
import { lazy, Suspense } from "react";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import CurrentTasks from "./pages/CurrentTasks";
import NotFound from "./pages/NotFound";
import { Switch, Route } from "wouter";

// Lazy load non-critical pages
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));

function LoadingFallback() {
  return <div style={{ padding: "2rem", textAlign: "center" }}>Loading...</div>;
}

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/current-tasks"} component={CurrentTasks} />
      <Route path={"/about"}>
        <Suspense fallback={<LoadingFallback />}>
          <About />
        </Suspense>
      </Route>
      <Route path={"/blog/:slug"} component={BlogPost} />
      <Route path={"/blog"} component={Blog} />
      <Route path={"/contact"}>
        <Suspense fallback={<LoadingFallback />}>
          <Contact />
        </Suspense>
      </Route>
      <Route path={"/privacy"}>
        <Suspense fallback={<LoadingFallback />}>
          <Privacy />
        </Suspense>
      </Route>
      <Route path={"/terms"}>
        <Suspense fallback={<LoadingFallback />}>
          <Terms />
        </Suspense>
      </Route>
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider>
      <TimerProvider>
        <Router />
      </TimerProvider>
    </ThemeProvider>
  );
}

export default App;
