import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const read = (path: string) => readFileSync(resolve(process.cwd(), path), 'utf8');
const html = read('docs/featured-posts-minimal-exploration.html');
const markdown = read('docs/featured-posts-minimal-exploration.md');
const homeContent = read('client/src/components/HomeContent.tsx');

describe('Featured Posts minimal exploration', () => {
  it('presents three quieter reading-continuation directions for approval', () => {
    expect(html).toContain('APPROVAL ONLY');
    expect(html).toContain('Quiet List');
    expect(html).toContain('Editorial Shelf');
    expect(html).toContain('One More Thing');
    expect(html).toContain('Learning Paths should remain the primary');
    expect(markdown).toContain('**01 · Quiet List**');
    expect(markdown).toContain('**02 · Editorial Shelf**');
    expect(markdown).toContain('**03 · One More Thing**');
  });

  it('preserves a single-surface, no-image continuation system without changing the live section', () => {
    expect(html).toContain('no illustrations, no competing CTA card, one warm-white surface');
    expect(html).toContain('VIEW ALL POSTS');
    expect(homeContent).not.toContain('Quiet List');
    expect(homeContent).not.toContain('Editorial Shelf');
    expect(homeContent).not.toContain('One More Thing');
  });
});
