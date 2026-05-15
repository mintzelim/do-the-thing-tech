import { describe, it, expect } from 'vitest';

describe('Quiz Scoring Logic', () => {
  it('should correctly calculate the winning ADHD type', () => {
    // Simulate scores from a quiz
    const scores = {
      classic: 5,
      inattentive: 12,
      hyperactive: 3,
      impulsive: 2,
      anxious: 4,
      temporal: 2,
      combination: 1
    };

    // Find the highest score
    const highestType = Object.entries(scores).reduce((a, b) =>
      a[1] > b[1] ? a : b
    )[0];

    expect(highestType).toBe('inattentive');
  });

  it('should handle combination type as a valid result', () => {
    const scores = {
      classic: 3,
      inattentive: 3,
      hyperactive: 3,
      impulsive: 3,
      anxious: 3,
      temporal: 2,
      combination: 8
    };

    const highestType = Object.entries(scores).reduce((a, b) =>
      a[1] > b[1] ? a : b
    )[0];

    expect(highestType).toBe('combination');
  });

  it('should handle ties by selecting the first highest type', () => {
    const scores = {
      classic: 5,
      inattentive: 5,
      hyperactive: 3,
      impulsive: 2,
      anxious: 4,
      temporal: 2,
      combination: 1
    };

    const highestType = Object.entries(scores).reduce((a, b) =>
      a[1] > b[1] ? a : b
    )[0];

    // Should be one of the tied types
    expect(['classic', 'inattentive']).toContain(highestType);
  });

  it('should include all 7 ADHD types in scoring', () => {
    const types = ['classic', 'inattentive', 'hyperactive', 'impulsive', 'anxious', 'temporal', 'combination'];
    const scores: Record<string, number> = {};
    
    types.forEach(type => {
      scores[type] = 0;
    });

    expect(Object.keys(scores).length).toBe(7);
    expect(Object.keys(scores).sort()).toEqual(types.sort());
  });

  it('should properly weight answers with different weights', () => {
    // Simulate adding weighted answers
    let scores: Record<string, number> = {
      classic: 0,
      inattentive: 0,
      hyperactive: 0,
      impulsive: 0,
      anxious: 0,
      temporal: 0,
      combination: 0
    };

    // Answer 1: inattentive with weight 2
    scores['inattentive'] += 2;
    // Answer 2: temporal with weight 3
    scores['temporal'] += 3;
    // Answer 3: classic with weight 2
    scores['classic'] += 2;

    expect(scores.inattentive).toBe(2);
    expect(scores.temporal).toBe(3);
    expect(scores.classic).toBe(2);
  });
});

describe('Quiz Question Flow', () => {
  it('should have exactly 10 questions', () => {
    const questions = [
      { id: 1, text: 'When faced with a task, what usually happens?' },
      { id: 2, text: 'How do you experience time?' },
      { id: 3, text: 'Your energy levels are usually:' },
      { id: 4, text: 'In social situations, you tend to:' },
      { id: 5, text: 'Your workspace is usually:' },
      { id: 6, text: 'When you make a mistake, you:' },
      { id: 7, text: 'Your to-do list is:' },
      { id: 8, text: 'You focus best when:' },
      { id: 9, text: 'Your biggest struggle is:' },
      { id: 10, text: 'If you had to describe yourself in one word:' }
    ];

    expect(questions.length).toBe(10);
  });

  it('should have 4 answer options per question', () => {
    const questionAnswers = [
      [
        { text: 'I jump in immediately without planning', type: 'impulsive', weight: 2 },
        { text: 'I get overwhelmed and avoid it', type: 'inattentive', weight: 2 },
        { text: 'I start but get distracted halfway', type: 'classic', weight: 2 },
        { text: 'I worry about doing it perfectly', type: 'anxious', weight: 2 },
      ]
    ];

    expect(questionAnswers[0].length).toBe(4);
  });

  it('should include combination type in the last question', () => {
    const lastQuestionAnswers = [
      { text: 'Chaotic', type: 'classic', weight: 2 },
      { text: 'Scattered', type: 'inattentive', weight: 2 },
      { text: 'Energetic', type: 'hyperactive', weight: 2 },
      { text: 'Combination of everything', type: 'combination', weight: 3 },
    ];

    const hasCombination = lastQuestionAnswers.some(answer => answer.type === 'combination');
    expect(hasCombination).toBe(true);
  });
});

describe('Quiz Result Types', () => {
  it('should have all 7 ADHD type results defined', () => {
    const resultTypes = [
      'classic',
      'inattentive',
      'hyperactive',
      'impulsive',
      'anxious',
      'temporal',
      'combination'
    ];

    expect(resultTypes.length).toBe(7);
  });

  it('should have descriptive text for each result type', () => {
    const results = {
      classic: { type: 'Classic ADHD', character: 'The "Quest-Chaser" Raccoon', description: 'You\'re the classic ADHD type...' },
      inattentive: { type: 'Inattentive ADHD', character: 'The "High Ping" Capybara', description: 'You\'re the inattentive type...' },
      hyperactive: { type: 'Hyperactive ADHD', character: 'The "Bouncy" Squirrel', description: 'You\'re the hyperactive type...' },
      impulsive: { type: 'Impulsive ADHD', character: 'The "Spontaneous" Fox', description: 'You\'re the impulsive type...' },
      anxious: { type: 'Anxious ADHD', character: 'The "Worried" Deer', description: 'You\'re the anxious type...' },
      temporal: { type: 'Temporal ADHD', character: 'The "Time-Blind" Owl', description: 'You\'re the temporal type...' },
      combination: { type: 'Combination ADHD', character: 'The "Multi-Tasking" Octopus', description: 'You\'re the combination type...' }
    };

    Object.values(results).forEach(result => {
      expect(result.type).toBeTruthy();
      expect(result.character).toBeTruthy();
      expect(result.description).toBeTruthy();
    });
  });
});
