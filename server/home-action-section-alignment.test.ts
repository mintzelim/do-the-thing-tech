import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const read = (path: string) => readFileSync(resolve(process.cwd(), path), 'utf8');
const home = read('client/src/components/HomeContent.tsx');
const styles = read('client/src/landing-system-reconciliation.css');

describe('homepage action-section alignment', () => {
  it('keeps the first CTA copy left-led with the scroll action as its own desktop layout item', () => {
    const section = home.slice(home.indexOf('CTA SECTION 1'), home.indexOf('SECTION 4'));
    expect(section).toContain('cta-reference-copy');
    expect(section).toContain('cta-reference-button');
    expect(section.indexOf('cta-reference-copy')).toBeLessThan(section.indexOf('cta-reference-button'));
    expect(styles).toContain('grid-template-columns: minmax(128px, .34fr) minmax(0, 1fr) auto');
    expect(styles).toContain('white-space: nowrap');
  });

  it('removes the Featured Posts micro-label and centres its reader-facing heading and deck', () => {
    const section = home.slice(home.indexOf('SECTION 7: FEATURED POSTS'), home.indexOf('CTA SECTION 2'));
    expect(section).not.toContain('ONE MORE THING');
    expect(section).not.toContain('featured-posts-kicker');
    expect(section).toContain('featured-posts-title');
    expect(section).toContain('featured-posts-deck');
    expect(styles).toContain('text-align: center !important');
  });
});
