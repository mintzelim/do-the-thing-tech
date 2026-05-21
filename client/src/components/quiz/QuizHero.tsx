import { Button } from '@/components/ui/button';

interface QuizHeroProps {
  onStartQuiz: () => void;
}

export default function QuizHero({ onStartQuiz }: QuizHeroProps) {
  return (
    <section 
      className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40"
      style={{
        backgroundImage: 'url(/figma-quiz-assets/quiz-hero-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/5"></div>

      <div className="relative z-10 text-center space-y-8 sm:space-y-12 max-w-5xl mx-auto">
        <h1 className="font-['Press_Start_2P'] text-[#edeeee] text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-relaxed uppercase px-4 drop-shadow-lg">
          What's Your ADHD Type?
        </h1>

        <div className="space-y-8 px-4">
          <p className="font-['Press_Start_2P'] text-white text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed max-w-3xl mx-auto drop-shadow">
            Nope, your brain isn't broken!
          </p>
          <p className="font-['Press_Start_2P'] text-white text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed max-w-3xl mx-auto drop-shadow">
            It's just wired a 'lil differently.
          </p>
          <p className="font-['Press_Start_2P'] text-white text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed max-w-3xl mx-auto drop-shadow">            Take this 10-question quiz to discover which of the 7 ADHD types matches your brain pattern.
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
