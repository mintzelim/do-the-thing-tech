import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { Zap, Clock, CheckCircle2, Loader } from "lucide-react";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

type TaskStep = {
  id: string;
  title: string;
  description?: string;
  estimatedTime?: number;
  completed?: boolean;
};

type AppState = "entry" | "breakdown" | "estimating" | "scheduled";

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const [appState, setAppState] = useState<AppState>("entry");
  const [inputValue, setInputValue] = useState("");
  const [granularity, setGranularity] = useState(50);
  const [focusLevel, setFocusLevel] = useState<"hyperfocus" | "normal" | "distracted">("normal");
  const [taskSteps, setTaskSteps] = useState<TaskStep[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const breakdownMutation = trpc.tasks.breakdown.useMutation();
  const estimateMutation = trpc.tasks.estimateTasks.useMutation();

  const handleSubmit = async () => {
    if (!inputValue.trim()) return;
    
    setIsLoading(true);
    try {
      const result = await breakdownMutation.mutateAsync({
        input: inputValue,
        granularity,
      });
      
      setTaskSteps(result);
      setAppState("breakdown");
    } catch (error) {
      console.error("Error breaking down task:", error);
      toast.error("Failed to break down task. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getGranularityLabel = () => {
    if (granularity < 25) return "Tiny Steps";
    if (granularity < 50) return "Small Steps";
    if (granularity < 75) return "Medium Steps";
    return "Big Milestones";
  };

  const getTimeBuffer = () => {
    if (focusLevel === "hyperfocus") return 20;
    if (focusLevel === "distracted") return 30;
    return 25; // normal
  };

  const getTotalTime = () => {
    const base = taskSteps.reduce((sum, step) => sum + (step.estimatedTime || 0), 0);
    const buffer = getTimeBuffer();
    return Math.ceil(base * (1 + buffer / 100));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 px-4">
        <Card className="max-w-md w-full p-8 text-center space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">DoTheThing</h1>
            <p className="text-muted-foreground">Break down overwhelming tasks into manageable steps</p>
          </div>
          <p className="text-sm text-muted-foreground">
            Sign in to start organizing your thoughts and managing your time effectively.
          </p>
          <Button 
            className="w-full" 
            onClick={() => window.location.href = getLoginUrl()}
          >
            Sign In to Get Started
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">DoTheThing</h1>
            <p className="text-xs text-muted-foreground">Welcome, {user?.name || "there"}!</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        {appState === "entry" && (
          <div className="space-y-8 animate-fade-in">
            {/* Entry Point Card */}
            <Card className="p-8 border-2 border-primary/20 hover:border-primary/40 transition-colors">
              <div className="space-y-4">
                <div>
                  <label className="text-lg font-semibold text-foreground mb-2 block">
                    I need to...
                  </label>
                  <Textarea
                    placeholder="Enter a single task or brain dump everything you need to do. Be as specific or vague as you want!"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="min-h-32 resize-none text-base"
                  />
                </div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>💡 <strong>Single task:</strong> "Write project proposal"</p>
                  <p>🧠 <strong>Brain dump:</strong> "Fix bug, update docs, respond to emails, plan meeting"</p>
                </div>
                <Button
                  onClick={handleSubmit}
                  disabled={!inputValue.trim() || isLoading}
                  className="w-full h-12 text-base font-semibold"
                >
                  {isLoading ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin mr-2" />
                      Breaking down...
                    </>
                  ) : (
                    "Break It Down"
                  )}
                </Button>
              </div>
            </Card>

            {/* Info Cards */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="p-4 bg-card/50">
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-sm text-foreground">Smart Breakdown</h3>
                    <p className="text-xs text-muted-foreground mt-1">AI breaks tasks into actionable steps</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4 bg-card/50">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-sm text-foreground">Time Estimates</h3>
                    <p className="text-xs text-muted-foreground mt-1">Realistic estimates with ADHD buffers</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4 bg-card/50">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-sm text-foreground">Export to Calendar</h3>
                    <p className="text-xs text-muted-foreground mt-1">Sync with Google Calendar</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {appState === "breakdown" && (
          <div className="space-y-8 animate-fade-in">
            {/* Granularity Control */}
            <Card className="p-6 border-primary/20">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="font-semibold text-foreground">Step Granularity</label>
                    <span className="text-sm font-medium text-primary">{getGranularityLabel()}</span>
                  </div>
                  <Slider
                    value={[granularity]}
                    onValueChange={(val) => setGranularity(val[0])}
                    min={0}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>Tiny Steps</span>
                    <span>Big Milestones</span>
                  </div>
                </div>

                {/* ADHD Presets */}
                <div className="pt-4 border-t border-border">
                  <p className="text-sm font-medium text-foreground mb-3">ADHD-Friendly Presets</p>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      variant={granularity < 33 ? "default" : "outline"}
                      size="sm"
                      onClick={() => setGranularity(20)}
                      className="text-xs"
                    >
                      Tiny Steps
                    </Button>
                    <Button
                      variant={granularity >= 33 && granularity < 66 ? "default" : "outline"}
                      size="sm"
                      onClick={() => setGranularity(50)}
                      className="text-xs"
                    >
                      Balanced
                    </Button>
                    <Button
                      variant={granularity >= 66 ? "default" : "outline"}
                      size="sm"
                      onClick={() => setGranularity(80)}
                      className="text-xs"
                    >
                      Milestones
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Task Steps */}
            <Card className="p-6 border-primary/20">
              <h2 className="text-xl font-bold text-foreground mb-4">Your Breakdown</h2>
              <div className="space-y-3">
                {taskSteps.map((step, idx) => (
                  <div key={step.id} className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold text-sm">
                      {idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground">{step.title}</h3>
                      {step.description && <p className="text-sm text-muted-foreground mt-1">{step.description}</p>}
                    </div>
                    {step.estimatedTime && (
                      <div className="flex-shrink-0 text-right">
                        <p className="text-sm font-semibold text-foreground">{step.estimatedTime} min</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Focus Level & Estimator */}
            <Card className="p-6 border-secondary/20 bg-secondary/5">
              <div className="space-y-4">
                <div>
                  <label className="font-semibold text-foreground mb-3 block">Your Focus Level</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: "hyperfocus" as const, label: "Hyperfocus", icon: "🎯" },
                      { value: "normal" as const, label: "Normal", icon: "😊" },
                      { value: "distracted" as const, label: "Distracted", icon: "🌀" },
                    ].map((level) => (
                      <Button
                        key={level.value}
                        variant={focusLevel === level.value ? "default" : "outline"}
                        onClick={() => setFocusLevel(level.value)}
                        className="flex flex-col items-center gap-1 h-auto py-3"
                      >
                        <span className="text-lg">{level.icon}</span>
                        <span className="text-xs">{level.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Time Summary */}
                <div className="pt-4 border-t border-border">
                  <div className="bg-card rounded-lg p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Base Time:</span>
                      <span className="font-semibold text-foreground">{taskSteps.reduce((sum, s) => sum + (s.estimatedTime || 0), 0)} min</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Time Buffer ({getTimeBuffer()}%):</span>
                      <span className="font-semibold text-foreground">+{Math.ceil(taskSteps.reduce((sum, s) => sum + (s.estimatedTime || 0), 0) * getTimeBuffer() / 100)} min</span>
                    </div>
                    <div className="flex justify-between text-base font-bold pt-2 border-t border-border">
                      <span className="text-foreground">Total Time:</span>
                      <span className="text-primary">{getTotalTime()} minutes</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setAppState("entry")} className="flex-1">
                Back
              </Button>
              <Button 
                className="flex-1" 
                onClick={() => {
                  toast.success("Calendar export coming soon!");
                  setAppState("scheduled");
                }}
              >
                Export to Calendar
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
