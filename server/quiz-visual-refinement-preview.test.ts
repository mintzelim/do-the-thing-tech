import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const preview = readFileSync(resolve(process.cwd(), 'docs/quiz-visual-refinement-preview.html'), 'utf8');

describe('quiz visual refinement preview', () => {
  it('keeps three approval-only card-composition directions available for selection', () => {
    expect(preview).toContain('OPTION 01 · SCENE STACK');
    expect(preview).toContain('OPTION 02 · PATTERN DOMINOES');
    expect(preview).toContain('OPTION 03 · QUIET TRAIL');
    expect(preview).toContain('The existing pattern names and descriptions remain exactly as published.');
  });

  it('uses all seven true-alpha mascot scenes and preserves the seven published pattern names', () => {
    for (const key of ['spark-starter-alpha_c537785a', 'thought-wanderer-alpha_ed8084e4', 'deep-dive-mind-alpha_f1140570', 'signal-catcher-alpha_5be86008', 'mood-powered-mind-alpha_ad11b96f', 'many-tabs-mind-alpha_ae85bd31', 'careful-scout-alpha_0d92965f']) {
      expect(preview).toContain(key);
    }
    for (const name of ['The Spark Starter', 'The Thought Wanderer', 'The Deep-Dive Mind', 'The Signal Catcher', 'The Mood-Powered Mind', 'The Many-Tabs Mind', 'The Careful Scout']) {
      expect(preview).toContain(name);
    }
  });
});
