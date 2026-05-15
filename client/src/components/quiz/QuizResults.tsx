import { QuizResult } from '@/pages/Quiz';

interface QuizResultsProps {
  result: QuizResult;
  onRetakeQuiz: () => void;
  onBackToHome: () => void;
}

export default function QuizResults({
  result,
  onRetakeQuiz,
  onBackToHome
}: QuizResultsProps) {
  return (
    <div className="min-h-screen bg-[#edeeee] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        {/* Results Card */}
        <div className="bg-[#f4eba7] border-4 border-black p-8 sm:p-12 mb-8">
          <div className="text-center space-y-8">
            <h1 className="font-['Press_Start_2P'] text-[#585be9] text-2xl sm:text-3xl md:text-4xl leading-relaxed uppercase">
              Your Result
            </h1>

            <div className="space-y-4">
              <p className="font-['Press_Start_2P'] text-[#21201e] text-xl sm:text-2xl leading-relaxed">
                {result.type}
              </p>
              <p className="font-['Press_Start_2P'] text-[#585be9] text-base sm:text-lg leading-relaxed">
                {result.character}
              </p>
            </div>

            <div className="bg-white border-3 border-black p-6 sm:p-8">
              <p className="font-['Press_Start_2P'] text-[#21201e] text-sm sm:text-base leading-relaxed">
                {result.description}
              </p>
            </div>

            <div className="pt-4">
              <p className="font-['Press_Start_2P'] text-[#585be9] text-sm">
                Score: {result.score}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onRetakeQuiz}
            className="bg-[#585be9] border-4 border-black px-8 py-4 hover:bg-[#4a4dd4] transition-all active:scale-95"
          >
            <p className="font-['Press_Start_2P'] text-[#edeeee] text-sm sm:text-base leading-relaxed">
              Retake Quiz
            </p>
          </button>
          <button
            onClick={onBackToHome}
            className="bg-[#21201e] border-4 border-black px-8 py-4 hover:bg-[#0a0a08] transition-all active:scale-95"
          >
            <p className="font-['Press_Start_2P'] text-[#edeeee] text-sm sm:text-base leading-relaxed">
              Back Home
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
