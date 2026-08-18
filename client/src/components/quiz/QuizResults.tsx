import { QuizResult } from '@/pages/Quiz';
import QuizMascot from './QuizMascot';

interface QuizResultsProps { result: QuizResult; onRetakeQuiz: () => void; onBackToHome: () => void; }

export default function QuizResults({ result, onRetakeQuiz, onBackToHome }: QuizResultsProps) {
  return <section className="quiz-result-page"><div className="quiz-shell quiz-result-shell"><div className="quiz-panel quiz-result-panel"><QuizMascot speech="You made it." /><div><p className="quiz-eyebrow">YOUR ADHD TYPE</p><h1 className="quiz-result-title">Here&apos;s your result.</h1><p className="quiz-result-type">{result.type}</p><p className="quiz-result-subtitle">{result.character}</p><p className="quiz-result-description">{result.description}</p><p className="quiz-result-boundary"><strong>Worth knowing:</strong> this quiz is a self-reflection tool, not a clinical diagnosis or assessment. A qualified clinician can help if you want a formal ADHD evaluation.</p><div className="quiz-result-actions"><button onClick={onRetakeQuiz} className="quiz-secondary-action">RETAKE QUIZ</button><button onClick={onBackToHome} className="quiz-primary-action">TRY THE TASK TOOL →</button></div></div></div></div></section>;
}
