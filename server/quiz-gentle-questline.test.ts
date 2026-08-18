import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const read = (path: string) => readFileSync(resolve(process.cwd(), path), 'utf8');
const quizPage = read('client/src/pages/Quiz.tsx');
const hero = read('client/src/components/quiz/QuizHero.tsx');
const flow = read('client/src/components/quiz/QuizFlow.tsx');
const results = read('client/src/components/quiz/QuizResults.tsx');
const types = read('client/src/components/quiz/ADHDTypesDisplay.tsx');
const styles = read('client/src/quiz-system.css');
const reflectionStyles = read('client/src/quiz-result-reflections.css');

describe('selected Quiz Option 03 — Gentle Questline', () => {
  it('uses the shared landing-system quiz stylesheet and canonical mascot without legacy game-screen treatments', () => {
    expect(quizPage).toContain("import '../quiz-system.css'");
    expect(hero).toContain("QuizMascot");
    expect(styles).toContain('.quiz-page{min-height:100vh;background:#f6f5f2');
    expect(styles).toContain('.quiz-panel{border:1px solid #a8afc2;border-radius:14px;background:#fffefb');
    expect(styles).toContain('.quiz-checkpoint-rail{display:grid;grid-template-columns:repeat(10');
    expect(styles).toContain('@media(max-width:760px)');
    expect(styles).toContain('.quiz-hero-grid,.quiz-result-panel,.quiz-cta-panel{grid-template-columns:1fr}');
    expect(hero).not.toContain('Press_Start_2P');
    expect(hero).not.toContain('quiz-hero-bg.png');
    expect(flow).not.toContain('205-9867.webp');
  });

  it('keeps the experience unmistakably framed as the ten-question ADHD Type Quiz', () => {
    expect(hero).toContain('ADHD TYPE QUIZ');
    expect(hero).toContain("What&apos;s Your ADHD Type?");
    expect(hero).toContain('Take this 10-question quiz to discover which of the 7 ADHD types matches your brain pattern.');
    expect(flow).toContain('Find your type in 10 questions.');
    expect(results).toContain('YOUR QUIZ PATTERN');
    expect(types).toContain('The 7 Quiz Patterns');
    expect(types).toContain('Dr. Amen/Amen Clinics&apos; seven-type framework');
  });

  it('preserves ten-question weighted scoring and adds a clear non-diagnostic boundary', () => {
    expect(flow).toContain('export const QUIZ_QUESTIONS');
    expect(flow).toContain('Array(QUIZ_QUESTIONS.length).fill(null)');
    expect(flow).toContain('export function calculateQuizResult');
    expect(flow).toContain('SEE MY ADHD TYPE');
    expect(results).toContain('we use friendly names here');
    expect(results).toContain('Classic ADD, Inattentive ADD, Overfocused ADD, Temporal Lobe ADD, Limbic ADD, Ring of Fire ADD, and Anxious ADD');
    expect(results).toContain('not a clinical diagnosis or assessment');
    expect(hero).toContain('not a medical diagnosis or a clinical assessment');
  });

  it('renders the approved empowering reflection structure for all calculated results', () => {
    expect(results).toContain('THE TRICKY BIT');
    expect(results).toContain('YOUR BRIGHT SIDE');
    expect(results).toContain('A KIND NEXT STEP');
    expect(results).toContain('ringOfFire');
    expect(reflectionStyles).toContain('.quiz-reflection-card.is-bright');
    expect(reflectionStyles).toContain('.quiz-reflection-card.is-next');
  });
});
