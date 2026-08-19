import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const read = (path: string) => readFileSync(resolve(process.cwd(), path), 'utf8');
const flow = read('client/src/components/quiz/QuizFlow.tsx');
const results = read('client/src/components/quiz/QuizResults.tsx');
const mascot = read('client/src/components/quiz/QuizMascot.tsx');
const mascotStyles = read('client/src/quiz-mascot-assets.css');
const page = read('client/src/pages/Quiz.tsx');

describe('approved quiz result voice and canonical mascot interim refresh', () => {
  it('uses the approved direct, everyday result descriptions for all seven existing scoring keys', () => {
    expect(flow).toContain('big green GO button');
    expect(flow).toContain('wander off-screen');
    expect(flow).toContain('leave a good book on the last page');
    expect(flow).toContain('volume set higher than everyone else');
    expect(flow).toContain('climbing a mountain in flip-flops');
    expect(flow).toContain('sixteen tabs are playing at once');
    expect(flow).toContain('midnight fact-finding mission');
    expect(flow).toContain('export function calculateQuizResult');
  });

  it('keeps the empowering reflection structure while making the wording specific and personality-like', () => {
    expect(results).toContain('future self has agreed to finish it');
    expect(results).toContain('arrive wearing a dramatic cape');
    expect(results).toContain('full-screen warning');
    expect(results).toContain('not a clinical diagnosis or assessment');
  });

  it('replaces the shared CSS placeholder with the hosted canonical purple mascot for the entire quiz', () => {
    expect(mascot).toContain("assetUrl('/manus-storage/audience-howitworks-remote-workers_7ce7f448.png')");
    expect(mascot).toContain('className="quiz-mascot-image"');
    expect(results).toContain('quiz-result-mascot--${result.resultKey}');
    expect(page).toContain("import '../quiz-mascot-assets.css'");
    expect(mascotStyles).toContain('.quiz-mascot-stage .quiz-mascot-image');
    expect(mascotStyles).toContain('.quiz-mascot-stage .quiz-mascot-body');
    expect(mascotStyles).toContain('display: none !important');
  });
});
