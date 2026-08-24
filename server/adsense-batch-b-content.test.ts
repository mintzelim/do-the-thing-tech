import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const blog = (filename: string) => readFileSync(resolve(process.cwd(), "blog", filename), "utf8");

describe("AdSense readiness Batch B", () => {
  it("makes commercial comparisons transparent and provider-verifiable", () => {
    const tools = blog("23-best-adhd-tools-2026.md");
    const ai = blog("24-ai-that-breaks-down-tasks-adhd.md");
    expect(tools).toContain("How This Comparison Was Made");
    expect(tools).toContain("disclosure:");
    expect(tools).toContain("Two Example Stacks (Neither Is a Requirement)");
    expect(ai).toContain("An AI-Plan Quality Check");
    expect(ai).toContain("AI-generated list is a draft, not an authority.");
    expect(ai).toContain("disclosure:");
    expect(ai).not.toContain("No other free tool adjusts estimates");
  });

  it("keeps task-completion and ADHD-in-women guidance non-diagnostic and source-aware", () => {
    const completion = blog("25-adhd-never-finish-anything.md");
    const women = blog("31-adhd-in-women.md");
    expect(completion).toContain("A Three-Minute Restart Card");
    expect(completion).toContain("practical patterns, not diagnoses");
    expect(completion).not.toContain("3 specific neurological mechanisms");
    expect(women).toContain("What research suggests:");
    expect(women).toContain("no one symptom pattern, cycle change, or online checklist can diagnose ADHD");
    expect(women).toContain("treatment or medication changes should be discussed");
  });

  it("replaces the remaining high-certainty RSD guide with a safe, source-aware boundary", () => {
    const rsd = blog("30-rejection-sensitive-dysphoria-rsd.md");
    expect(rsd).toContain("not a formal diagnosis");
    expect(rsd).toContain("A Small Plan for the First Ten Minutes");
    expect(rsd).toContain("Only a qualified prescriber can discuss medication");
    expect(rsd).not.toContain("nearly all people with ADHD");
    expect(rsd).not.toContain("most common off-label treatment for RSD");
  });

  it("keeps lifespan guidance clear about uncertainty rather than making individual predictions", () => {
    const lifespan = blog("22-does-adhd-go-away.md");
    expect(lifespan).toContain("ADHD paths vary.");
    expect(lifespan).toContain("Group statistics cannot tell you what will happen in one individual case.");
    expect(lifespan).toContain("evidence is developing");
    expect(lifespan).not.toContain("Only 9% of childhood cases reach persistent full remission by 25.");
  });
});
