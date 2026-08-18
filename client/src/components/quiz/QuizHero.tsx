import QuizMascot from './QuizMascot';

interface QuizHeroProps { onStartQuiz: () => void; }

export default function QuizHero({ onStartQuiz }: QuizHeroProps) {
  return <section className="quiz-landing-hero"><div className="quiz-shell quiz-hero-grid"><div className="quiz-hero-copy"><p className="quiz-eyebrow">ADHD TYPE QUIZ</p><h1>What&apos;s Your ADHD Type?</h1><p className="quiz-hero-lede"><strong>Nope, your brain isn&apos;t broken!</strong><br />It&apos;s just wired a &apos;lil differently.<br /><br />Take this 10-question quiz to discover which of the 7 ADHD types matches your brain pattern.</p><p className="quiz-safety-note">A quick reminder: this quiz is for self-reflection, not a medical diagnosis or a clinical assessment. A qualified clinician can help with anything consequential.</p><button onClick={onStartQuiz} className="quiz-primary-action">START QUIZ NOW <span aria-hidden="true">→</span></button></div><QuizMascot speech="Let’s find your type." /></div></section>;
}
