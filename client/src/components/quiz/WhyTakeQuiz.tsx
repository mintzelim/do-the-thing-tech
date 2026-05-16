export default function WhyTakeQuiz() {
  const features = [
    {
      icon: '🧠',
      title: 'UNDERSTAND YOUR BRAIN',
      description:
        'Learn which of the 7 ADHD types matches your brain pattern and discover your unique strengths.'
    },
    {
      icon: '🎴',
      title: 'GET YOUR ADHD TYPE CARD',
      description:
        'Receive a beautiful trading card with your ADHD type, character, and personalized stats.'
    },
    {
      icon: '🕸️',
      title: 'SHARE & CONNECT',
      description:
        'Download your card and share it on TikTok, Instagram, Facebook, and Twitter to connect with others.'
    }
  ];

  return (
    <section
      className="relative w-full py-24 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage:
          'url(https://raw.githubusercontent.com/dothething/assets/main/quiz-landscape-background.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Title */}
        <h2
          className="font-['Press_Start_2P'] text-white text-3xl sm:text-4xl md:text-5xl text-center mb-16 drop-shadow-lg"
          style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}
        >
          WHY TAKE THIS QUIZ?
        </h2>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-purple-600 border-4 border-purple-800 p-6 sm:p-8 flex flex-col items-center text-center hover:bg-purple-700 transition-colors"
            >
              {/* Icon */}
              <div className="text-5xl sm:text-6xl mb-4">{feature.icon}</div>

              {/* Title */}
              <h3
                className="font-['Press_Start_2P'] text-white text-sm sm:text-base md:text-lg mb-4 leading-tight"
                style={{ minHeight: '3rem' }}
              >
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-white text-sm sm:text-base leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
