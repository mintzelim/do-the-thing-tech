import { describe, expect, it } from 'vitest';
import { ADHD_TYPE_RESULTS, calculateQuizResult, QUIZ_QUESTIONS, type QuizTypeKey } from '../client/src/components/quiz/QuizFlow';

const typeKeys = Object.keys(ADHD_TYPE_RESULTS) as QuizTypeKey[];

describe('ADHD Type Quiz weighted result paths', () => {
  it('maps all seven named Dr. Amen framework labels to their own result profile', () => {
    expect(typeKeys).toEqual(['classic', 'inattentive', 'overfocused', 'temporal', 'limbic', 'ringOfFire', 'anxious']);
    expect(new Set(Object.values(ADHD_TYPE_RESULTS).map((profile) => profile.type)).size).toBe(7);
  });

  it('gives every framework outcome a distinct plain-language pattern explanation rather than a generic label', () => {
    const descriptions = Object.values(ADHD_TYPE_RESULTS).map((profile) => profile.description);
    expect(new Set(descriptions).size).toBe(7);
    expect(ADHD_TYPE_RESULTS.classic.description).toContain('action-first pattern');
    expect(ADHD_TYPE_RESULTS.inattentive.description).toContain('internally busy pattern');
    expect(ADHD_TYPE_RESULTS.overfocused.description).toContain('strong-stickiness pattern');
    expect(ADHD_TYPE_RESULTS.temporal.description).toContain('time, memory cues, and emotional reactions');
    expect(ADHD_TYPE_RESULTS.limbic.description).toContain('low-gear pattern');
    expect(ADHD_TYPE_RESULTS.ringOfFire.description).toContain('sixteen tabs');
    expect(ADHD_TYPE_RESULTS.anxious.description).toContain('risk scanner');
    descriptions.forEach((description) => expect(description).toContain('This result points to'));
  });

  it('gives every type at least three selectable paths in the ten-question quiz', () => {
    typeKeys.forEach((typeKey) => {
      const matchingAnswers = QUIZ_QUESTIONS.flatMap((question) => question.answers.filter((answer) => answer.type === typeKey));
      expect(matchingAnswers.length, `${typeKey} should have multiple live answer paths`).toBeGreaterThanOrEqual(3);
    });
  });

  it('calculates a distinct matching result for an answer path concentrated on each framework label', () => {
    typeKeys.forEach((typeKey) => {
      const path = QUIZ_QUESTIONS.flatMap((question) => question.answers.filter((answer) => answer.type === typeKey));
      const result = calculateQuizResult(path);
      expect(result.resultKey).toBe(typeKey);
      expect(result.type).toBe(ADHD_TYPE_RESULTS[typeKey].type);
    });
  });

  it('does not default all answer patterns to Anxious ADHD', () => {
    const classicPath = QUIZ_QUESTIONS.flatMap((question) => question.answers.filter((answer) => answer.type === 'classic'));
    const anxiousPath = QUIZ_QUESTIONS.flatMap((question) => question.answers.filter((answer) => answer.type === 'anxious'));
    expect(calculateQuizResult(classicPath).type).toBe('Classic ADHD');
    expect(calculateQuizResult(anxiousPath).type).toBe('Anxious ADHD');
  });
});
