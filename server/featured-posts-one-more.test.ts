import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const read = (path: string) => readFileSync(resolve(process.cwd(), path), 'utf8');
const home = read('client/src/components/HomeContent.tsx');
const styles = read('client/src/landing-system-reconciliation.css');

describe('selected Featured Posts Option 03 — One More Thing', () => {
  it('uses one optional lead guide and a compact secondary reading stack', () => {
    expect(home).toContain('If you have room for one more read.');
    expect(home).toContain('featured-posts-one-more');
    expect(home).toContain('featured-posts-lead');
    expect(home).toContain('featured-posts-stack');
    expect(home).toContain('/blog/adhd-in-women');
    for (const href of ['/blog/adhd-burnout-recovery', '/blog/how-adhd-affects-task-management', '/blog/time-blindness-in-adhd', '/blog/adhd-perfectionism']) {
      expect(home).toContain(href);
    }
    expect(home).not.toContain('className="blog-links-grid"');
    expect(home).not.toContain('featured-posts-kicker');
  });

  it('keeps the live section to one surface with calm dividers rather than nested cards', () => {
    expect(styles).toContain('.featured-posts-one-more');
    expect(styles).toContain('border-top: 1px solid var(--landing-item-border)');
    expect(styles).toContain('border-right: 1px solid var(--landing-item-border)');
    expect(styles).toContain('.featured-posts-stack-link');
    expect(styles).not.toContain('.featured-posts-one-more {\n  box-shadow');
  });
});
