import { describe, expect, it } from 'vitest';
import { QUIZ_QUESTIONS, calculateQuizResult } from '../client/src/components/quiz/QuizFlow';

const answer = (questionIndex: number, answerIndex: number) => QUIZ_QUESTIONS[questionIndex].answers[answerIndex];

describe('representative quiz outcome paths', () => {
  it('returns the Spark Starter for a classic initiation-and-impulse profile', () => {
    const result = calculateQuizResult([
      answer(0, 0), answer(1, 3), answer(2, 2), answer(3, 1), answer(4, 0),
      answer(5, 0), answer(6, 3), answer(7, 0), answer(8, 1), answer(9, 0),
    ]);
    expect(result.resultKey).toBe('classic');
    expect(result.type).toBe('The Spark Starter');
  });

  it('returns the Thought Wanderer for a sustained attention-drift profile', () => {
    const result = calculateQuizResult([
      answer(0, 1), answer(1, 2), answer(2, 2), answer(3, 2), answer(4, 2),
      answer(5, 3), answer(6, 3), answer(7, 1), answer(8, 3), answer(9, 1),
    ]);
    expect(result.resultKey).toBe('inattentive');
    expect(result.type).toBe('The Thought Wanderer');
  });

  it('returns the Deep-Dive Mind for an overfocused-perfectionism profile', () => {
    const result = calculateQuizResult([
      answer(0, 0), answer(1, 0), answer(2, 1), answer(3, 0), answer(4, 1),
      answer(5, 1), answer(6, 1), answer(7, 3), answer(8, 0), answer(9, 3),
    ]);
    expect(result.resultKey).toBe('overfocused');
    expect(result.type).toBe('The Deep-Dive Mind');
  });

  it('returns the Careful Scout for an anxiety-led profile', () => {
    const result = calculateQuizResult([
      answer(0, 3), answer(1, 3), answer(2, 3), answer(3, 3), answer(4, 1),
      answer(5, 0), answer(6, 1), answer(7, 0), answer(8, 3), answer(9, 2),
    ]);
    expect(result.resultKey).toBe('anxious');
    expect(result.type).toBe('The Careful Scout');
  });
});
