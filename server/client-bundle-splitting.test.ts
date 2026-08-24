import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const root = path.resolve(import.meta.dirname, '..');
const app = fs.readFileSync(path.join(root, 'client/src/App.tsx'), 'utf8');
const viteConfig = fs.readFileSync(path.join(root, 'vite.config.ts'), 'utf8');

describe('client bundle splitting', () => {
  it('defers the noindex Current Tasks route behind a suspense boundary', () => {
    expect(app).toContain('lazy(() => import("./pages/CurrentTasks"))');
    expect(app).toContain('<Suspense fallback=');
    expect(app).toContain('component={DeferredCurrentTasks}');
  });

  it('keeps stable framework, data, markdown, and UI vendor chunk boundaries', () => {
    expect(viteConfig).toContain('manualChunks(id)');
    expect(viteConfig).toContain('return "framework"');
    expect(viteConfig).toContain('return "data-client"');
    expect(viteConfig).toContain('return "markdown"');
    expect(viteConfig).toContain('return "ui"');
  });
});
