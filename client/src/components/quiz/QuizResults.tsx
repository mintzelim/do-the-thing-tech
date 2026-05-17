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
    <div className="w-full bg-[#edeeee] py-6 sm:py-8 md:py-12 px-3 sm:px-4 md:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-xs sm:max-w-sm md:max-w-2xl w-full">
        {/* Results Card */}
        <div className="bg-[#f4eba7] border-4 border-black p-4 sm:p-6 md:p-8 lg:p-12 mb-6 sm:mb-8">
          <div className="text-center space-y-4 sm:space-y-6 md:space-y-8">
            <h1 className="font-['Press_Start_2P'] text-[#585be9] text-lg sm:text-2xl md:text-3xl lg:text-4xl leading-tight uppercase">
              Your Result
            </h1>

            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              <p className="font-['Press_Start_2P'] text-[#21201e] text-sm sm:text-lg md:text-2xl leading-relaxed">
                {result.type}
              </p>
              <p className="font-['Press_Start_2P'] text-[#585be9] text-xs sm:text-base md:text-lg leading-relaxed">
                {result.character}
              </p>
            </div>

            <div className="bg-white border-3 border-black p-3 sm:p-4 md:p-6 lg:p-8">
              <p className="font-['Press_Start_2P'] text-[#21201e] text-xs sm:text-sm md:text-base leading-relaxed">
                {result.description}
              </p>
            </div>

            <div className="pt-2 sm:pt-3 md:pt-4">
              <p className="font-['Press_Start_2P'] text-[#585be9] text-xs sm:text-sm md:text-base">
                Score: {result.score}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 sm:gap-4 justify-center">
          <button
            onClick={onRetakeQuiz}
            className="w-full bg-[#585be9] border-4 border-black px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-4 hover:bg-[#4a4dd4] active:bg-[#3d3fc4] transition-all active:scale-95 min-h-[44px] sm:min-h-[48px]"
          >
            <p className="font-['Press_Start_2P'] text-[#edeeee] text-xs sm:text-sm md:text-base leading-relaxed">
              Retake Quiz
            </p>
          </button>
          <button
            onClick={onBackToHome}
            className="w-full bg-[#21201e] border-4 border-black px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-4 hover:bg-[#0a0a08] active:bg-[#000000] transition-all active:scale-95 min-h-[44px] sm:min-h-[48px]"
          >
            <p className="font-['Press_Start_2P'] text-[#edeeee] text-xs sm:text-sm md:text-base leading-relaxed">
              Back Home
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
