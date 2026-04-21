import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <div className="flex min-h-screen bg-background">
            {/* Main Content */}
            <main className="flex-1 flex flex-col">
              <Router />
            </main>
            
            {/* Sidebar for Google Ads */}
            <aside className="hidden lg:block w-80 bg-card border-l border-border p-6 overflow-y-auto">
              <div className="space-y-6">
                {/* Ad Placeholder 1 */}
                <div className="bg-muted rounded-lg p-4 h-96 flex items-center justify-center text-muted-foreground text-sm">
                  <div className="text-center">
                    <p className="font-medium">Advertisement</p>
                    <p className="text-xs mt-1">Google Ads will appear here</p>
                  </div>
                </div>
                
                {/* Ad Placeholder 2 */}
                <div className="bg-muted rounded-lg p-4 h-96 flex items-center justify-center text-muted-foreground text-sm">
                  <div className="text-center">
                    <p className="font-medium">Advertisement</p>
                    <p className="text-xs mt-1">Google Ads will appear here</p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
          
          {/* Bottom Ad Banner */}
          <footer className="bg-card border-t border-border">
            <div className="container mx-auto px-4 py-4">
              <div className="bg-muted rounded-lg p-4 h-24 flex items-center justify-center text-muted-foreground text-sm">
                <div className="text-center">
                  <p className="font-medium">Advertisement</p>
                  <p className="text-xs mt-1">Google Ads will appear here</p>
                </div>
              </div>
            </div>
          </footer>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
