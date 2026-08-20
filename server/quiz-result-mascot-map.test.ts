import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const read = (path: string) => readFileSync(resolve(process.cwd(), path), 'utf8');
const results = read('client/src/components/quiz/QuizResults.tsx');
const mascotMap = read('client/src/components/quiz/quizResultMascots.ts');
const mascot = read('client/src/components/quiz/QuizMascot.tsx');
const typeDisplay = read('client/src/components/quiz/ADHDTypesDisplay.tsx');

describe('seven result-specific purple mascot scenes', () => {
  it('maps every live quiz result key to its own generated illustration and meaningful alternative text', () => {
    expect(mascotMap).toContain("classic: { path: '/manus-storage/quiz-spark-starter-alpha_c537785a.png'");
    expect(mascotMap).toContain("inattentive: { path: '/manus-storage/quiz-thought-wanderer-alpha_ed8084e4.png'");
    expect(mascotMap).toContain("overfocused: { path: '/manus-storage/quiz-deep-dive-mind-alpha_f1140570.png'");
    expect(mascotMap).toContain("temporal: { path: '/manus-storage/quiz-signal-catcher-alpha_5be86008.png'");
    expect(mascotMap).toContain("limbic: { path: '/manus-storage/quiz-mood-powered-mind-alpha_ad11b96f.png'");
    expect(mascotMap).toContain("ringOfFire: { path: '/manus-storage/quiz-many-tabs-mind-alpha_ae85bd31.png'");
    expect(mascotMap).toContain("anxious: { path: '/manus-storage/quiz-careful-scout-alpha_0d92965f.png'");
    expect(results).toContain('imagePath={mascot.path} imageAlt={mascot.alt}');
  });

  it('uses the same matching image map on all seven pre-quiz pattern cards', () => {
    expect(typeDisplay).toContain("import { QUIZ_RESULT_MASCOTS } from './quizResultMascots'");
    expect(typeDisplay).toContain("resultKey: 'classic'");
    expect(typeDisplay).toContain("resultKey: 'anxious'");
    expect(typeDisplay).toContain('className="quiz-pattern-mascot"');
    expect(typeDisplay).toContain('src={assetUrl(mascot.path)} alt={mascot.alt}');
  });

  it('keeps generic shared quiz placements decorative while exposing result-scene alternatives to assistive technology', () => {
    expect(mascot).toContain("const mascotPath = imagePath ?? '/manus-storage/audience-howitworks-remote-workers_7ce7f448.png'");
    expect(mascot).toContain('aria-hidden={imageAlt ? undefined : true}');
    expect(mascot).toContain('alt={imageAlt}');
  });
});
