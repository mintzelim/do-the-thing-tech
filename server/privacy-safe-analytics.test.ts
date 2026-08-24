import fs from 'node:fs';
import path from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { bucketCount, trackProductEvent } from '../client/src/lib/analytics';

const root = path.resolve(import.meta.dirname, '..');
const home = fs.readFileSync(path.join(root, 'client/src/pages/Home.tsx'), 'utf8');
const tasks = fs.readFileSync(path.join(root, 'client/src/pages/CurrentTasks.tsx'), 'utf8');
const quiz = fs.readFileSync(path.join(root, 'client/src/pages/Quiz.tsx'), 'utf8');
const homeContent = fs.readFileSync(path.join(root, 'client/src/components/HomeContent.tsx'), 'utf8');
const privacy = fs.readFileSync(path.join(root, 'client/src/pages/Privacy.tsx'), 'utf8');

afterEach(() => vi.unstubAllGlobals());

describe('privacy-safe product analytics', () => {
  it('sends the approved event to GA4 without a fallback duplicate', () => {
    const gtag = vi.fn();
    const dataLayer: unknown[] = [];
    vi.stubGlobal('window', { gtag, dataLayer });
    trackProductEvent('task_breakdown_completed', { input_mode: 'brain_dump', step_count_bucket: '2_3' });
    expect(gtag).toHaveBeenCalledWith('event', 'task_breakdown_completed', { input_mode: 'brain_dump', step_count_bucket: '2_3' });
    expect(dataLayer).toHaveLength(0);
  });

  it('uses dataLayer when gtag is unavailable and buckets counts without raw task data', () => {
    const dataLayer: unknown[] = [];
    vi.stubGlobal('window', { dataLayer });
    trackProductEvent('task_completed', { task_position_bucket: bucketCount(4) });
    expect(dataLayer).toEqual([{ event: 'task_completed', task_position_bucket: '4_6' }]);
    expect(bucketCount(1)).toBe('1');
    expect(bucketCount(7)).toBe('7_plus');
  });

  it('instruments only the approved safe product moments', () => {
    expect(home).toContain('trackProductEvent("task_breakdown_completed"');
    expect(tasks).toContain('trackProductEvent("task_completed"');
    expect(tasks).toContain('trackProductEvent("timer_started"');
    expect(quiz).toContain("trackProductEvent('quiz_completed')");
    expect(homeContent).toContain('trackProductEvent("guide_opened"');
    expect(home).not.toContain('brainDump:');
    expect(quiz).not.toContain('result_key');
  });

  it('discloses active Google services and the privacy boundary on the policy page', () => {
    expect(privacy).toContain('Google Measurement and Advertising');
    expect(privacy).toContain('Google Tag Manager and Google Analytics');
    expect(privacy).toContain('raw task text, task titles, quiz answers, or health-related inferences');
    expect(privacy).toContain('Google AdSense');
  });
});
