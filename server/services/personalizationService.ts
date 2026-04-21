import type { UserProfile } from "../../drizzle/schema";

export interface PersonalizationFlags {
  needsMicroSteps: boolean;
  needsBreaks: boolean;
  needsWarmupSteps: boolean;
  preferShortBlocks: boolean;
  needsMotivation: boolean;
}

/**
 * Convert profile answers into personalization flags
 * These flags adjust how we break down tasks and estimate time
 */
export function getPersonalizationFlags(profile: UserProfile | null): PersonalizationFlags {
  if (!profile) {
    return {
      needsMicroSteps: false,
      needsBreaks: false,
      needsWarmupSteps: false,
      preferShortBlocks: false,
      needsMotivation: false,
    };
  }

  return {
    needsMicroSteps: profile.isNeurodivergent?.toLowerCase() === "yes" || false,
    needsBreaks: !!profile.mainDistraction,
    needsWarmupSteps: profile.biggestChallenge?.toLowerCase().includes("starting") || false,
    preferShortBlocks: profile.workStyle?.toLowerCase().includes("pomodoro") || false,
    needsMotivation: (profile.biggestChallenge?.toLowerCase().includes("motivation") ||
      profile.biggestChallenge?.toLowerCase().includes("procrastination")) || false,
  };
}

/**
 * Generate personalized breakdown prompt for LLM
 */
export function getPersonalizedPrompt(
  task: string,
  granularity: number,
  flags: PersonalizationFlags
): string {
  let prompt = `Break down this task into steps:\n\n"${task}"\n\n`;

  if (flags.needsMicroSteps) {
    prompt += "The user is neurodivergent and benefits from detailed, micro-steps. ";
  }

  if (flags.needsWarmupSteps) {
    prompt += "The user struggles with starting tasks. Include a warm-up step at the beginning. ";
  }

  if (flags.preferShortBlocks) {
    prompt += "The user prefers Pomodoro-style work (25-min blocks). Keep steps short and focused. ";
  }

  if (flags.needsMotivation) {
    prompt += "The user struggles with motivation. Include quick wins and progress checkpoints. ";
  }

  prompt += `\nGranularity level: ${granularity}/100 (0=tiny steps, 100=big milestones)\n`;
  prompt += "Return as JSON array of {title, description, estimatedMinutes}";

  return prompt;
}

/**
 * Adjust time estimates based on personalization
 */
export function adjustTimeEstimate(
  baseMinutes: number,
  flags: PersonalizationFlags,
  focusLevel: "hyperfocus" | "normal" | "distracted"
): number {
  let adjusted = baseMinutes;

  // Add buffer for breaks if user gets distracted
  if (flags.needsBreaks) {
    adjusted *= 1.15; // 15% extra for break time
  }

  // Add buffer for warm-up steps
  if (flags.needsWarmupSteps) {
    adjusted *= 1.1; // 10% extra for warm-up
  }

  // Apply focus level buffer
  const focusBuffers = {
    hyperfocus: 1.15,
    normal: 1.2,
    distracted: 1.3,
  };

  adjusted *= focusBuffers[focusLevel];

  return Math.round(adjusted);
}

/**
 * Generate break suggestions based on profile
 */
export function generateBreakSuggestions(flags: PersonalizationFlags): string[] {
  const suggestions: string[] = [];

  if (flags.needsBreaks) {
    suggestions.push("Take a 5-minute break every 25 minutes");
  }

  if (flags.preferShortBlocks) {
    suggestions.push("Use Pomodoro technique: 25 min work, 5 min break");
  }

  if (flags.needsMotivation) {
    suggestions.push("Celebrate small wins - mark tasks as complete!");
  }

  if (flags.needsMicroSteps) {
    suggestions.push("Complete one micro-step at a time for momentum");
  }

  return suggestions;
}
