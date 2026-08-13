import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const page = readFileSync(resolve(process.cwd(), "client/src/pages/CurrentTasks.tsx"), "utf8");
const styles = readFileSync(resolve(process.cwd(), "client/src/current-tasks-refined.css"), "utf8");
const proTip = readFileSync(resolve(process.cwd(), "client/src/components/PinTabTutorial.tsx"), "utf8");

describe("Current Tasks Focus Queue system", () => {
  it("uses the selected header, summary, task-row, and dashed utility patterns", () => {
    expect(page).toContain('className="current-tasks-header"');
    expect(page).toContain("YOUR FOCUS QUEUE");
    expect(page).toContain('className="current-tasks-back"');
    expect(page).toContain('className="current-tasks-summary');
    expect(page).toContain('className="current-tasks-add"');
    expect(styles).toContain(".current-tasks-header");
    expect(styles).toContain(".current-tasks-back");
    expect(styles).toContain(".current-tasks-add");
  });

  it("aligns the drag handle, checkbox, and task title without removing task operations", () => {
    expect(page).toContain('className="current-task-grip"');
    expect(page).toContain('className="current-task-checkbox"');
    expect(page).toContain('className="current-task-title"');
    expect(page).toContain("toggleStepComplete(step.id)");
    expect(page).toContain("handleDrop(event, step.id)");
    expect(page).toContain("startEditing(step.id)");
    expect(page).toContain("deleteStep(step.id)");
    expect(styles).toContain("grid-template-columns:10px 22px minmax(0,1fr)");
    expect(styles).toContain(".current-task-title");
  });

  it("uses the dedicated in-context Pro Tip treatment and preserves reduced-motion safeguards", () => {
    expect(proTip).toContain('"current-tasks-pro-tip"');
    expect(styles).toContain(".current-tasks-pro-tip");
    expect(styles).toContain("@media(prefers-reduced-motion:reduce)");
  });
});
