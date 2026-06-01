interface ADHDType {
  id: number;
  title: string;
  character: string;
  description: string;
  image: string;
}

const ADHD_TYPES: ADHDType[] = [
  {
    id: 1,
    title: '★ CLASSIC ★',
    character: 'The "Quest-Chaser" Raccoon',
    description: 'Hyperactive, impulsive, and always on a mission',
    image: '/figma-quiz-assets/01-classic-adhd-raccoon.jpg'
  },
  {
    id: 2,
    title: '★ INATTENTIVE ★',
    character: 'The "High Ping" Capybara',
    description: 'Daydreamy, forgetful, but deeply thoughtful',
    image: '/figma-quiz-assets/02-inattentive-adhd-capybara.png.jpg'
  },
  {
    id: 3,
    title: '★ OVER-FOCUSED ★',
    character: 'The Deep-Dive Beaver',
    description: 'Hyperfocus mode activated, time ceases to exist',
    image: '/figma-quiz-assets/03-overfocused-adhd-beaver.png.jpg'
  },
  {
    id: 4,
    title: '★ TEMPORAL LOBE ★',
    character: 'The "Grump-Lord" Porcupine',
    description: 'Emotional intensity and reactive responses',
    image: '/figma-quiz-assets/04-impulsive-adhd-porcupine.jpg'
  },
  {
    id: 5,
    title: '★ LIMBIC ★',
    character: 'The "Side-Eye" Cat',
    description: 'Mood-driven, emotionally expressive',
    image: '/figma-quiz-assets/05-anxious-adhd-cat.jpg'
  },
  {
    id: 6,
    title: '★ RING OF FIRE ★',
    character: 'The "2.0x" Hummingbird',
    description: 'Hyperactive, restless, always in motion',
    image: '/figma-quiz-assets/06-restless-adhd-hummingbird.jpg'
  },
  {
    id: 7,
    title: '★ ANXIOUS ★',
    character: 'The "What If?" Meerkat',
    description: 'Anxious, vigilant, always scanning for danger',
    image: '/figma-quiz-assets/07-combination-adhd-meerkat.jpg'
  }
];

function CharacterCard({
  title,
  character,
  description,
  image
}: {
  title: string;
  character: string;
  description: string;
  image: string;
}) {
  return (
    <div className="bg-[#f4eba7] border-4 border-black flex flex-col items-center text-center hover:shadow-lg transition-shadow">
      {/* Image Container - 75% of card height */}
      <div className="w-full bg-gray-200 flex items-center justify-center" style={{ aspectRatio: '1/1' }}>
        <img
          src={image}
          alt={character}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src =
              'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22%3E%3Crect fill=%22%23ddd%22 width=%22200%22 height=%22200%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-family=%22Arial%22 font-size=%2214%22 fill=%22%23999%22 text-anchor=%22middle%22 dy=%22.3em%22%3EImage%3C/text%3E%3C/svg%3E';
          }}
        />
      </div>
      {/* Text Container - 25% of card height */}
      <div className="w-full p-4 sm:p-6 space-y-2">
        <p className="font-['Press_Start_2P'] text-[#585be9] text-xs sm:text-sm leading-tight">
          {title}
        </p>
        <p className="font-['Press_Start_2P'] text-[#21201e] text-xs sm:text-sm leading-tight font-bold">
          {character}
        </p>
      </div>
    </div>
  );
}

export default function ADHDTypesDisplay() {
  return (
    <section className="bg-[#eeeeee] py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
      <h2 className="font-['Press_Start_2P'] text-[#585be9] text-2xl sm:text-3xl md:text-4xl text-center mb-8 sm:mb-12 leading-relaxed uppercase">
        The 7 Types
      </h2>

      <p className="font-['Press_Start_2P'] text-[#585be9] text-sm sm:text-base md:text-lg lg:text-xl text-center mb-12 sm:mb-16 lg:mb-20 max-w-4xl mx-auto leading-relaxed px-4">
        According to research, there are seven unique ADHD types, each with its own perks and challenges.
      </p>

      {/* Grid: 4 cards on top row, 3 cards on bottom row centered */}
      <div className="max-w-7xl mx-auto">
        {/* Top row - 4 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {ADHD_TYPES.slice(0, 4).map((type) => (
            <CharacterCard
              key={type.id}
              title={type.title}
              character={type.character}
              description={type.description}
              image={type.image}
            />
          ))}
        </div>
        {/* Bottom row - 3 cards centered */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {ADHD_TYPES.slice(4).map((type) => (
            <CharacterCard
              key={type.id}
              title={type.title}
              character={type.character}
              description={type.description}
              image={type.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
