import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const display = readFileSync(resolve(process.cwd(), 'client/src/components/quiz/ADHDTypesDisplay.tsx'), 'utf8');
const styles = readFileSync(resolve(process.cwd(), 'client/src/quiz-pattern-mascots.css'), 'utf8');

describe('approved quiz Scene Stack layout', () => {
  it('uses the approved larger-scene gallery markup without changing the seven published names', () => {
    expect(display).toContain('quiz-pattern-grid quiz-scene-stack');
    expect(display).toContain('className="quiz-pattern-art"');
    expect(display).toContain('className="quiz-pattern-mascot"');

    for (const name of [
      'The Spark Starter',
      'The Thought Wanderer',
      'The Deep-Dive Mind',
      'The Signal Catcher',
      'The Mood-Powered Mind',
      'The Many-Tabs Mind',
      'The Careful Scout',
    ]) {
      expect(display).toContain(name);
    }
  });

  it('uses a four-plus-three desktop gallery with scaled mascot scenes and responsive collapse', () => {
    expect(styles).toContain('grid-template-columns: repeat(4, minmax(0, 1fr));');
    expect(styles).toContain('.quiz-scene-stack .quiz-pattern-card:nth-child(5)');
    expect(styles).toContain('grid-column: 2;');
    expect(styles).toContain('height: 134px;');
    expect(styles).toContain('transform: scale(1.62);');
    expect(styles).toContain('grid-template-columns: repeat(2, minmax(0, 1fr));');
    expect(styles).toContain('grid-template-columns: 1fr;');
  });
});
