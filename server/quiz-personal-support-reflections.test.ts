import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const results = readFileSync(resolve(process.cwd(), 'client/src/components/quiz/QuizResults.tsx'), 'utf8');

describe('personal-support quiz reflections', () => {
  it('gives all seven outcomes a unique positive reminder quote', () => {
    const quotes = [...results.matchAll(/quote: '([^']+)'/g)].map((match) => match[1]);
    expect(quotes).toHaveLength(7);
    expect(new Set(quotes).size).toBe(7);
    expect(quotes).toContain('I can be careful without carrying every possible outcome.');
  });

  it('keeps every Kind Next Step as a practical self-support action instead of a tool instruction', () => {
    const steps = [...results.matchAll(/nextStep: '([^']+)'/g)].map((match) => match[1]);
    expect(steps).toHaveLength(7);
    expect(new Set(steps).size).toBe(7);
    for (const step of steps) {
      expect(step.toLowerCase()).not.toContain('task tool');
      expect(step.toLowerCase()).not.toContain('dothething');
      expect(step.toLowerCase()).not.toContain('click');
    }
    expect(steps).toContain('Put both feet on the floor, breathe out a little longer than you breathe in, then choose the kindest two-minute action.');
  });
});
