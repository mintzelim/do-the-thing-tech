import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const read = (path: string) => readFileSync(resolve(process.cwd(), path), 'utf8');
const navigation = read('client/src/components/Navigation.tsx');
const navigationStyles = read('client/src/navigation-layout.css');
const about = read('client/src/pages/About.tsx');

describe('whole-site audit fixes', () => {
  it('loads a dedicated shared header layout from the component used on every public route', () => {
    expect(navigation).toContain('import "@/navigation-layout.css";');
    expect(navigationStyles).toContain('.reference-header {');
    expect(navigationStyles).toContain('display: flex;');
    expect(navigationStyles).toContain('.reference-brand-logo {');
    expect(navigationStyles).toContain('width: 184px;');
    expect(navigationStyles).toContain('@media (max-width: 860px)');
  });

  it('describes Boundless One Ventures accurately without calling it a neurodivergent-focused software company', () => {
    expect(about).toContain('an AI × craft software company creating thoughtful, human-centred digital tools');
    expect(about).not.toContain('a neurodivergent-focused software company');
  });
});
