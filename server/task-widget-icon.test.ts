import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const read = (path: string) => readFileSync(resolve(process.cwd(), path), 'utf8');
const home = read('client/src/pages/Home.tsx');
const styles = read('client/src/pixel-art-refined.css');

describe('task widget heading icon', () => {
  it('uses a readable checklist SVG instead of an unsupported square glyph', () => {
    expect(home).toContain('<span className="reference-task-icon" aria-hidden="true">');
    expect(home).toContain('<svg viewBox="0 0 24 24" focusable="false">');
    expect(home).toContain('m4.5 7 2 2 3.5-4');
    expect(home).not.toContain('reference-task-icon" aria-hidden="true">▣');
    expect(styles).toContain('.reference-task-icon svg{width:24px;height:24px');
  });
});
