import QuizMascot from './QuizMascot';
interface FinalCTAProps { onStartQuiz: () => void; }
export default function FinalCTA({ onStartQuiz }: FinalCTAProps) {
  return <section className="quiz-cta"><div className="quiz-shell quiz-panel quiz-cta-panel"><div><p className="quiz-eyebrow">READY WHEN YOU ARE</p><h2>Ready to discover your ADHD type?</h2><p>It only takes 10 questions. No judgment. Just honest insights about your brain.</p><button onClick={onStartQuiz} className="quiz-primary-action">START QUIZ NOW <span aria-hidden="true">→</span></button></div><QuizMascot speech="One answer at a time." /></div></section>;
}
