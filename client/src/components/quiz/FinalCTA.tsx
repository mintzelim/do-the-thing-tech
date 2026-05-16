interface FinalCTAProps {
  onStartQuiz: () => void;
}

export default function FinalCTA({ onStartQuiz }: FinalCTAProps) {
  return (
    <section className="relative w-full py-24 px-4 sm:px-6 lg:px-8 bg-white">
      {/* Decorative clouds */}
      <div className="absolute top-8 left-8 text-4xl opacity-40">☁️</div>
      <div className="absolute top-16 right-12 text-5xl opacity-30">☁️</div>
      <div className="absolute bottom-12 left-1/4 text-3xl opacity-35">☁️</div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Title */}
        <h2
          className="font-['Press_Start_2P'] text-purple-600 text-2xl sm:text-3xl md:text-4xl mb-6 leading-tight"
          style={{ minHeight: '4rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          READY TO DISCOVER YOUR ADHD TYPE?
        </h2>

        {/* Description */}
        <p className="text-gray-800 text-base sm:text-lg mb-12 leading-relaxed">
          It only takes 10 questions. No judgment. Just honest insights about your brain.
        </p>

        {/* CTA Button */}
        <button
          onClick={onStartQuiz}
          className="bg-purple-600 border-4 border-purple-800 px-8 py-4 sm:px-12 sm:py-5 hover:bg-purple-700 transition-all hover:shadow-lg active:scale-95"
        >
          <p className="font-['Press_Start_2P'] text-white text-sm sm:text-base md:text-lg leading-relaxed">
            Start quiz now
          </p>
        </button>
      </div>
    </section>
  );
}
