import { useState } from 'react';
import { Button } from '@/components/ui/button';
import QuizHero from '@/components/quiz/QuizHero';
import ADHDTypesDisplay from '@/components/quiz/ADHDTypesDisplay';
import WhyTakeQuiz from '@/components/quiz/WhyTakeQuiz';
import FinalCTA from '@/components/quiz/FinalCTA';
import QuizFlow from '@/components/quiz/QuizFlow';
import QuizResults from '@/components/quiz/QuizResults';

export type QuizStep = 'hero' | 'quiz' | 'results';

export interface QuizResult {
  type: string;
  score: number;
  character: string;
  description: string;
}

export default function Quiz() {
  const [step, setStep] = useState<QuizStep>('hero');
  const [result, setResult] = useState<QuizResult | null>(null);

  const handleStartQuiz = () => {
    setStep('quiz');
  };

  const handleQuizComplete = (quizResult: QuizResult) => {
    setResult(quizResult);
    setStep('results');
  };

  const handleRetakeQuiz = () => {
    setResult(null);
    setStep('quiz');
  };

  const handleBackToHome = () => {
    setStep('hero');
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-[#edeeee] w-full overflow-x-hidden">
      {step === 'hero' && (
        <>
          <QuizHero onStartQuiz={handleStartQuiz} />
          <ADHDTypesDisplay />
          <WhyTakeQuiz />
          <FinalCTA onStartQuiz={handleStartQuiz} />
        </>
      )}
      {step === 'quiz' && <QuizFlow onComplete={handleQuizComplete} />}
      {step === 'results' && result && (
        <QuizResults
          result={result}
          onRetakeQuiz={handleRetakeQuiz}
          onBackToHome={handleBackToHome}
        />
      )}
    </div>
  );
}
