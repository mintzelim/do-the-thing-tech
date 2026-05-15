interface ADHDType {
  id: number;
  title: string;
  character: string;
  description: string;
}

const ADHD_TYPES: ADHDType[] = [
  {
    id: 1,
    title: '★ CLASSIC ★',
    character: 'The "Quest-Chaser" Raccoon',
    description: 'Hyperactive, impulsive, and always on a mission'
  },
  {
    id: 2,
    title: '★ INATTENTIVE ★',
    character: 'The "High Ping" Capybara',
    description: 'Daydreamy, forgetful, but deeply thoughtful'
  },
  {
    id: 3,
    title: '★ HYPERACTIVE ★',
    character: 'The "Bouncy" Squirrel',
    description: 'Always moving, always thinking, always going'
  },
  {
    id: 4,
    title: '★ IMPULSIVE ★',
    character: 'The "Spontaneous" Fox',
    description: 'Act first, think later (sometimes)'
  },
  {
    id: 5,
    title: '★ ANXIOUS ★',
    character: 'The "Worried" Deer',
    description: 'Perfectionist with a side of anxiety'
  },
  {
    id: 6,
    title: '★ TEMPORAL ★',
    character: 'The "Time-Blind" Owl',
    description: 'Time? What time? Where\'s the time?'
  },
  {
    id: 7,
    title: '★ COMBINATION ★',
    character: 'The "Multi-Tasking" Octopus',
    description: 'A little bit of everything, all at once'
  }
];

function CharacterCard({
  title,
  character,
  description
}: {
  title: string;
  character: string;
  description: string;
}) {
  return (
    <div className="bg-[#f4eba7] border-4 border-black p-6 sm:p-8 flex flex-col items-center text-center space-y-4 hover:shadow-lg transition-shadow">
      <p className="font-['Press_Start_2P'] text-[#585be9] text-base sm:text-lg md:text-xl leading-relaxed">
        {title}
      </p>
      <p className="font-['Press_Start_2P'] text-[#21201e] text-sm sm:text-base md:text-lg leading-relaxed">
        {character}
      </p>
      <p className="font-['Press_Start_2P'] text-[#21201e] text-xs sm:text-sm leading-relaxed">
        {description}
      </p>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 max-w-7xl mx-auto">
        {ADHD_TYPES.map((type) => (
          <CharacterCard
            key={type.id}
            title={type.title}
            character={type.character}
            description={type.description}
          />
        ))}
      </div>
    </section>
  );
}
