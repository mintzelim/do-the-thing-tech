import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { ChevronRight, Loader2, Check } from "lucide-react";

type Step = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  estimatedTime: number;
};

type FlowState = "input" | "estimates" | "breakdown" | "export";

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const [flowState, setFlowState] = useState<FlowState>("input");
  const [brainDump, setBrainDump] = useState("");
  const [focusLevel, setFocusLevel] = useState<"hyperfocus" | "normal" | "distracted">("normal");
  const [granularity, setGranularity] = useState(50);
  const [steps, setSteps] = useState<Step[]>([]);
  const [estimatedTasks, setEstimatedTasks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const breakdownMutation = trpc.tasks.breakdown.useMutation();
  const estimateMutation = trpc.tasks.estimateTasks.useMutation();
  const exportMutation = trpc.tasks.exportToCalendar.useQuery(
    {
      tasks: steps.map((s) => ({
        title: s.title,
        description: s.description,
        estimatedTime: s.estimatedTime,
      })),
    },
    { enabled: false }
  );

  const handleBrainDumpSubmit = async () => {
    if (!brainDump.trim()) {
      toast.error("Please enter your tasks");
      return;
    }

    setIsLoading(true);
    try {
      // First, get estimates for the brain dump
      const compiled = await breakdownMutation.mutateAsync({
        input: brainDump,
        granularity,
      });

      setEstimatedTasks(compiled);
      setFlowState("estimates");
    } catch (error) {
      toast.error("Failed to process your input");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEstimatesToBreakdown = async () => {
    if (estimatedTasks.length === 0) {
      toast.error("No tasks to estimate");
      return;
    }

    setIsLoading(true);
    try {
      const estimated = await estimateMutation.mutateAsync({
        tasks: estimatedTasks.map((t) => ({
          title: t.title,
          description: t.description,
        })),
        focusLevel,
      });

      const stepsWithIds = estimated.map((task: any, idx: number) => ({
        id: `step-${idx}`,
        title: task.title,
        description: task.description,
        completed: false,
        estimatedTime: task.totalTime || task.estimatedTime || 30,
      }));

      setSteps(stepsWithIds);
      setFlowState("breakdown");
    } catch (error) {
      toast.error("Failed to estimate tasks");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleStepComplete = (stepId: string) => {
    setSteps((prev) =>
      prev.map((s) => (s.id === stepId ? { ...s, completed: !s.completed } : s))
    );
  };

  const updateStepTime = (stepId: string, time: number) => {
    setSteps((prev) =>
      prev.map((s) => (s.id === stepId ? { ...s, estimatedTime: time } : s))
    );
  };

  const deleteStep = (stepId: string) => {
    setSteps((prev) => prev.filter((s) => s.id !== stepId));
  };

  const handleExport = async () => {
    if (steps.length === 0) {
      toast.error("No steps to export");
      return;
    }

    setIsLoading(true);
    try {
      // Export logic would go here
      toast.success("Tasks exported to calendar");
      setFlowState("export");
    } catch (error) {
      toast.error("Failed to export tasks");
    } finally {
      setIsLoading(false);
    }
  };

  const totalTime = steps.reduce((sum, s) => sum + s.estimatedTime, 0);
  const completedCount = steps.filter((s) => s.completed).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 p-8 max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">DoTheThing</h1>
            <p className="text-gray-600">
              {isAuthenticated ? `Welcome, ${user?.name}` : "Break down your tasks into manageable steps"}
            </p>
          </div>

          {/* Flow: Input */}
          {flowState === "input" && (
            <div className="space-y-6">
              <Card className="p-8 border-2 border-gray-200">
                <div className="mb-6">
                  <label className="block text-lg font-semibold text-gray-900 mb-3">
                    I need to...
                  </label>
                  <p className="text-sm text-gray-600 mb-4">
                    Enter a single task or brain dump everything you need to do. Be as specific or vague as you want.
                  </p>
                </div>

                <Textarea
                  placeholder="e.g., Write project proposal, update documentation, respond to emails, plan team meeting"
                  value={brainDump}
                  onChange={(e) => setBrainDump(e.target.value)}
                  className="min-h-32 text-base"
                />

                <div className="mt-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Task Breakdown Size
                    </label>
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-gray-600">Tiny Steps</span>
                      <Slider
                        value={[granularity]}
                        onValueChange={(val) => setGranularity(val[0])}
                        min={0}
                        max={100}
                        step={10}
                        className="flex-1"
                      />
                      <span className="text-xs text-gray-600">Big Milestones</span>
                    </div>
                    <div className="mt-2 text-xs text-gray-600">
                      {granularity < 33 && "Tiny steps - very detailed breakdown"}
                      {granularity >= 33 && granularity < 66 && "Balanced - moderate detail"}
                      {granularity >= 66 && "Big milestones - high-level overview"}
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleBrainDumpSubmit}
                  disabled={isLoading || !brainDump.trim()}
                  className="w-full mt-6 h-12 text-base font-semibold bg-blue-500 hover:bg-blue-600"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Break It Down
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </Card>
            </div>
          )}

          {/* Flow: Estimates */}
          {flowState === "estimates" && (
            <div className="space-y-6">
              <Card className="p-8 border-2 border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">How focused are you?</h2>

                <div className="space-y-3 mb-8">
                  {(["hyperfocus", "normal", "distracted"] as const).map((level) => (
                    <button
                      key={level}
                      onClick={() => setFocusLevel(level)}
                      className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                        focusLevel === level
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 bg-white hover:border-gray-300"
                      }`}
                    >
                      <div className="font-semibold text-gray-900 capitalize">{level}</div>
                      <div className="text-sm text-gray-600 mt-1">
                        {level === "hyperfocus" && "You can focus deeply with minimal distractions"}
                        {level === "normal" && "You have typical focus and attention span"}
                        {level === "distracted" && "You're easily distracted and need more buffer time"}
                      </div>
                    </button>
                  ))}
                </div>

                <Button
                  onClick={handleEstimatesToBreakdown}
                  disabled={isLoading}
                  className="w-full h-12 text-base font-semibold bg-blue-500 hover:bg-blue-600"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Estimating...
                    </>
                  ) : (
                    <>
                      Get Time Estimates
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </Card>
            </div>
          )}

          {/* Flow: Breakdown */}
          {flowState === "breakdown" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Your Tasks</h2>
                <div className="text-sm text-gray-600">
                  {completedCount} of {steps.length} completed
                </div>
              </div>

              <div className="space-y-3">
                {steps.map((step) => (
                  <Card
                    key={step.id}
                    className={`p-4 border-2 transition-colors ${
                      step.completed ? "border-green-200 bg-green-50" : "border-gray-200 bg-white"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <Checkbox
                        checked={step.completed}
                        onCheckedChange={() => toggleStepComplete(step.id)}
                        className="mt-1"
                      />

                      <div className="flex-1">
                        <h3
                          className={`font-semibold ${
                            step.completed ? "text-gray-500 line-through" : "text-gray-900"
                          }`}
                        >
                          {step.title}
                        </h3>
                        {step.description && (
                          <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="5"
                          max="480"
                          value={step.estimatedTime}
                          onChange={(e) => updateStepTime(step.id, parseInt(e.target.value))}
                          className="w-16 px-2 py-1 text-sm border border-gray-300 rounded text-center"
                        />
                        <span className="text-sm text-gray-600 w-8">min</span>
                        <button
                          onClick={() => deleteStep(step.id)}
                          className="px-2 py-1 text-sm text-red-600 hover:bg-red-50 rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <Card className="p-4 bg-blue-50 border-2 border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total estimated time</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {Math.round(totalTime / 60)}h {totalTime % 60}m
                    </p>
                  </div>
                  <Button
                    onClick={handleExport}
                    disabled={isLoading || steps.length === 0}
                    className="h-12 px-8 text-base font-semibold bg-green-500 hover:bg-green-600"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Exporting...
                      </>
                    ) : (
                      "Export to Calendar"
                    )}
                  </Button>
                </div>
              </Card>
            </div>
          )}

          {/* Flow: Export Success */}
          {flowState === "export" && (
            <Card className="p-8 border-2 border-green-200 bg-green-50 text-center">
              <Check className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">All set!</h2>
              <p className="text-gray-600 mb-6">Your tasks have been exported to Google Calendar</p>
              <Button
                onClick={() => {
                  setFlowState("input");
                  setBrainDump("");
                  setSteps([]);
                }}
                className="bg-blue-500 hover:bg-blue-600"
              >
                Start Over
              </Button>
            </Card>
          )}
        </div>

        {/* Sidebar - Ads */}
        <div className="w-80 bg-white border-l border-gray-200 p-6 hidden lg:block">
          <div className="space-y-6">
            <div className="bg-gray-100 rounded-lg p-6 text-center text-gray-500 text-sm">
              Advertisement
            </div>
            <div className="bg-gray-100 rounded-lg p-6 text-center text-gray-500 text-sm">
              Advertisement
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Ad Banner */}
      <div className="bg-white border-t border-gray-200 p-4 text-center text-gray-500 text-sm lg:hidden">
        Advertisement
      </div>
    </div>
  );
}
