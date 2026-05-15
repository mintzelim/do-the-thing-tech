import { Button } from '@/components/ui/button';

interface QuizHeroProps {
  onStartQuiz: () => void;
}

export default function QuizHero({ onStartQuiz }: QuizHeroProps) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-b from-[#4a5a8a] to-[#2d3a5c]">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22><rect fill=%22%23000%22 width=%22100%22 height=%22100%22/><rect fill=%22%23222%22 x=%221%22 y=%221%22 width=%2298%22 height=%2298%22/></svg>')] bg-repeat"></div>
      </div>

      <div className="relative z-10 text-center space-y-8 sm:space-y-12 max-w-4xl mx-auto">
        <h1 className="font-['Press_Start_2P'] text-[#edeeee] text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-relaxed uppercase px-4 drop-shadow-lg">
          What's Your ADHD Type?
        </h1>

        <div className="space-y-6 px-4">
          <p className="font-['Press_Start_2P'] text-white text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed max-w-3xl mx-auto drop-shadow">
            Nope, your brain isn't broken!
          </p>
          <p className="font-['Press_Start_2P'] text-white text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed max-w-3xl mx-auto drop-shadow">
            It's just wired a 'lil differently.
          </p>
          <p className="font-['Press_Start_2P'] text-white text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto drop-shadow">
            Take this 10-question quiz to discover which of the 7 ADHD types matches your brain pattern.
          </p>
        </div>

        <button
          onClick={onStartQuiz}
          className="bg-[#585be9] border-4 border-black px-8 py-4 sm:px-12 sm:py-5 hover:bg-[#4a4dd4] transition-all hover:shadow-lg active:scale-95"
        >
          <p className="font-['Press_Start_2P'] text-[#edeeee] text-sm sm:text-base md:text-lg leading-relaxed">
            Start quiz now
          </p>
        </button>
      </div>
    </section>
  );
}
