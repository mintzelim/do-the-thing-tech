import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const root = path.resolve(import.meta.dirname, '..');
const kit = fs.readFileSync(path.join(root, 'docs/future-blog-visual-kit.md'), 'utf8');

describe('future blog visual kit', () => {
  it('documents three distinct canonical-mascot scenes for future articles', () => {
    expect(kit).toContain('blog-kit-first-step-trail.png');
    expect(kit).toContain('blog-kit-focus-lantern.png');
    expect(kit).toContain('blog-kit-reset-garden.png');
    expect(kit).toContain('canonical lavender rounded-rectangle mascot');
  });

  it('requires GitHub release delivery rather than Manus storage delivery', () => {
    expect(kit).toContain('https://github.com/mintzelim/do-the-thing-tech/releases/download/dothething-assets-v1/');
    expect(kit).not.toContain('/manus-storage/');
  });
});
