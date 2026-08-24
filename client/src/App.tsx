import { ThemeProvider } from "./contexts/ThemeContext";
import { TimerProvider } from "./contexts/TimerContext";
import { lazy, Suspense } from "react";
import "./pixel-art-refined.css";
import "./landing-system-reconciliation.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";
import Quiz from "./pages/Quiz";
import ProductProof from "./pages/ProductProof";
import GoblinToolsComparison from "./pages/GoblinToolsComparison";
import EditorialStandards from "./pages/EditorialStandards";
import MediaKit from "./pages/MediaKit";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";
import { Switch, Route } from "wouter";
import { BlogPostsProvider, type BlogPostRecord } from "./contexts/BlogPostsContext";

const CurrentTasks = lazy(() => import("./pages/CurrentTasks"));

function DeferredCurrentTasks() {
  return <Suspense fallback={<main className="min-h-screen bg-[#f6f5f2] px-4 py-24 text-center text-[#26364a]" aria-busy="true">Loading your current tasks…</main>}><CurrentTasks /></Suspense>;
}

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/current-tasks"} component={DeferredCurrentTasks} />
      <Route path={"/about"} component={About} />
      <Route path={"/how-it-works"} component={ProductProof} />
      <Route path={"/compare/goblin-tools"} component={GoblinToolsComparison} />
      <Route path={"/editorial-standards"} component={EditorialStandards} />
      <Route path={"/media"} component={MediaKit} />
      <Route path={"/faq"} component={FAQ} />
      <Route path={"/blog/:slug"} component={BlogPost} />
      <Route path={"/blog"} component={Blog} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/quiz"} component={Quiz} />
      <Route path={"/privacy"} component={Privacy} />
      <Route path={"/terms"} component={Terms} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App({ initialBlogPosts }: { initialBlogPosts?: BlogPostRecord[] | null }) {
  return (
    <ThemeProvider>
      <BlogPostsProvider initialPosts={initialBlogPosts}>
        <TimerProvider>
          <Router />
        </TimerProvider>
      </BlogPostsProvider>
    </ThemeProvider>
  );
}

export default App;
