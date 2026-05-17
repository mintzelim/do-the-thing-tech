import { useState } from 'react';
import { QuizResult } from '@/pages/Quiz';

interface Question {
  id: number;
  text: string;
  answers: {
    text: string;
    type: string;
    weight: number;
  }[];
}

const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    text: 'When faced with a task, what usually happens?',
    answers: [
      { text: 'I jump in immediately without planning', type: 'impulsive', weight: 2 },
      { text: 'I get overwhelmed and avoid it', type: 'inattentive', weight: 2 },
      { text: 'I start but get distracted halfway', type: 'classic', weight: 2 },
      { text: 'I worry about doing it perfectly', type: 'anxious', weight: 2 },
    ]
  },
  {
    id: 2,
    text: 'How do you experience time?',
    answers: [
      { text: 'Time? What time? I\'m always late', type: 'temporal', weight: 3 },
      { text: 'I\'m constantly rushing', type: 'hyperactive', weight: 2 },
      { text: 'I lose track of it completely', type: 'inattentive', weight: 2 },
      { text: 'I\'m anxious about being late', type: 'anxious', weight: 1 },
    ]
  },
  {
    id: 3,
    text: 'Your energy levels are usually:',
    answers: [
      { text: 'Bouncing off the walls', type: 'hyperactive', weight: 3 },
      { text: 'Inconsistent - high then crashed', type: 'classic', weight: 2 },
      { text: 'Calm but easily overwhelmed', type: 'inattentive', weight: 2 },
      { text: 'Anxious and tense', type: 'anxious', weight: 2 },
    ]
  },
  {
    id: 4,
    text: 'In social situations, you tend to:',
    answers: [
      { text: 'Talk a lot and interrupt people', type: 'hyperactive', weight: 2 },
      { text: 'Act without thinking about consequences', type: 'impulsive', weight: 2 },
      { text: 'Struggle to follow conversations', type: 'inattentive', weight: 2 },
      { text: 'Worry about saying the wrong thing', type: 'anxious', weight: 2 },
    ]
  },
  {
    id: 5,
    text: 'Your workspace is usually:',
    answers: [
      { text: 'Chaotic - I work in organized chaos', type: 'classic', weight: 2 },
      { text: 'Perfectly organized or completely messy', type: 'anxious', weight: 2 },
      { text: 'I have no idea where anything is', type: 'inattentive', weight: 2 },
      { text: 'Whatever - I\'m too busy to care', type: 'impulsive', weight: 2 },
    ]
  },
  {
    id: 6,
    text: 'When you make a mistake, you:',
    answers: [
      { text: 'Shrug it off and move on', type: 'impulsive', weight: 2 },
      { text: 'Spiral and obsess over it', type: 'anxious', weight: 3 },
      { text: 'Didn\'t even notice I made one', type: 'inattentive', weight: 2 },
      { text: 'Get frustrated and try again', type: 'classic', weight: 1 },
    ]
  },
  {
    id: 7,
    text: 'Your to-do list is:',
    answers: [
      { text: 'Non-existent - I just do things', type: 'impulsive', weight: 2 },
      { text: 'Overwhelming and never-ending', type: 'anxious', weight: 2 },
      { text: 'Started but never finished', type: 'classic', weight: 2 },
      { text: 'What to-do list?', type: 'inattentive', weight: 2 },
    ]
  },
  {
    id: 8,
    text: 'You focus best when:',
    answers: [
      { text: 'There\'s a deadline and pressure', type: 'classic', weight: 2 },
      { text: 'I\'m genuinely interested in the topic', type: 'inattentive', weight: 2 },
      { text: 'I can move around and fidget', type: 'hyperactive', weight: 2 },
      { text: 'Everything is perfect and organized', type: 'anxious', weight: 2 },
    ]
  },
  {
    id: 9,
    text: 'Your biggest struggle is:',
    answers: [
      { text: 'Staying still and focused', type: 'hyperactive', weight: 3 },
      { text: 'Controlling my impulses', type: 'impulsive', weight: 3 },
      { text: 'Remembering things and paying attention', type: 'inattentive', weight: 3 },
      { text: 'Perfectionism and anxiety', type: 'anxious', weight: 3 },
    ]
  },
  {
    id: 10,
    text: 'If you had to describe yourself in one word:',
    answers: [
      { text: 'Chaotic', type: 'classic', weight: 2 },
      { text: 'Scattered', type: 'inattentive', weight: 2 },
      { text: 'Energetic', type: 'hyperactive', weight: 2 },
      { text: 'Combination of everything', type: 'combination', weight: 3 },
    ]
  }
];

const ADHD_TYPE_RESULTS = {
  classic: {
    type: 'Classic ADHD',
    character: 'The "Quest-Chaser" Raccoon',
    description: 'You\'re the classic ADHD type - hyperactive, impulsive, and always on a mission. Your superpower is hyperfocus when you\'re interested. Your challenge is staying on track with boring tasks.'
  },
  inattentive: {
    type: 'Inattentive ADHD',
    character: 'The "High Ping" Capybara',
    description: 'You\'re the inattentive type - daydreamy, forgetful, but deeply thoughtful. Your superpower is creative thinking and deep focus when interested. Your challenge is remembering daily tasks.'
  },
  hyperactive: {
    type: 'Hyperactive ADHD',
    character: 'The "Bouncy" Squirrel',
    description: 'You\'re the hyperactive type - always moving, always thinking, always going. Your superpower is boundless energy and enthusiasm. Your challenge is sitting still and slowing down.'
  },
  impulsive: {
    type: 'Impulsive ADHD',
    character: 'The "Spontaneous" Fox',
    description: 'You\'re the impulsive type - act first, think later (sometimes). Your superpower is quick decision-making and spontaneity. Your challenge is thinking before you act.'
  },
  anxious: {
    type: 'Anxious ADHD',
    character: 'The "Worried" Deer',
    description: 'You\'re the anxious type - perfectionist with a side of anxiety. Your superpower is attention to detail and conscientiousness. Your challenge is managing perfectionism and worry.'
  },
  temporal: {
    type: 'Temporal ADHD',
    character: 'The "Time-Blind" Owl',
    description: 'You\'re the temporal type - time? What time? Where\'s the time? Your superpower is hyperfocus and deep work. Your challenge is time management and punctuality.'
  },
  combination: {
    type: 'Combination ADHD',
    character: 'The "Multi-Tasking" Octopus',
    description: 'You\'re the combination type - a little bit of everything, all at once. Your superpower is adaptability and versatility. Your challenge is managing multiple ADHD traits at once.'
  }
};

interface QuizFlowProps {
  onComplete: (result: QuizResult) => void;
}

export default function QuizFlow({ onComplete }: QuizFlowProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({
    classic: 0,
    inattentive: 0,
    hyperactive: 0,
    impulsive: 0,
    anxious: 0,
    temporal: 0,
    combination: 0
  });

  const handleAnswer = (type: string, weight: number) => {
    // Update scores with the current answer
    const newScores = {
      ...scores,
      [type]: scores[type] + weight
    };

    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      // Move to next question
      setScores(newScores);
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Quiz complete - calculate result with the final answer included
      const highestType = Object.entries(newScores).reduce((a, b) =>
        a[1] > b[1] ? a : b
      )[0];

      const result = ADHD_TYPE_RESULTS[highestType as keyof typeof ADHD_TYPE_RESULTS];
      onComplete({
        type: result.type,
        character: result.character,
        score: newScores[highestType],
        description: result.description
      });
    }
  };

  const question = QUIZ_QUESTIONS[currentQuestion];
  const progress = ((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100;

  return (
    <div
      className="relative w-full min-h-screen flex flex-col overflow-hidden"
      style={{
        backgroundImage: 'url(/figma-quiz-assets/205-9867.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Blackout overlay */}
      <div className="absolute inset-0 opacity-25" style={{ backgroundColor: 'rgba(0,0,0,0.25)' }}></div>

      {/* Main Content - Scrollable */}
      <div className="relative z-10 flex-1 w-full flex flex-col items-center justify-center px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-12 overflow-y-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10 w-full">
          <h1 className="font-['Press_Start_2P'] text-white text-lg sm:text-2xl md:text-3xl lg:text-4xl mb-1 sm:mb-2 drop-shadow-lg leading-tight">
            ADHD TYPE QUIZ
          </h1>
          <p className="font-['Press_Start_2P'] text-white text-xs sm:text-xs md:text-sm drop-shadow leading-tight">
            FIND YOUR BRAIN TYPE IN 10 QUESTIONS
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md mb-6 sm:mb-8 md:mb-10 px-3 sm:px-4">
          <div className="w-full h-3 sm:h-4 bg-white border-2 border-black overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-2xl bg-[#eeeeee]/75 border-4 border-black p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 md:mb-10">
          {/* Question Number */}
          <p className="font-['Press_Start_2P'] text-black text-xs sm:text-xs md:text-sm text-center mb-3 sm:mb-4">
            QUESTION {currentQuestion + 1} / 10
          </p>

          {/* Question Text */}
          <p className="font-['Press_Start_2P'] text-black text-xs sm:text-sm md:text-base text-center leading-relaxed">
            {question.text}
          </p>
        </div>

        {/* Answer Options Grid */}
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-4xl grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8 md:mb-10 px-3 sm:px-4">
          {question.answers.map((answer, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(answer.type, answer.weight)}
              className="bg-[#fbf5f5] border-4 border-[#585be9] p-3 sm:p-4 md:p-6 text-center hover:bg-[#f0e8e8] active:bg-[#e8dfe8] transition-colors shadow-[4px_4px_4px_0px_rgba(0,0,0,1)] min-h-[80px] sm:min-h-[100px] md:min-h-[120px] flex items-center justify-center"
            >
              <p className="font-['Press_Start_2P'] text-black text-xs sm:text-xs md:text-sm leading-relaxed">
                {answer.text}
              </p>
            </button>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-2 sm:gap-3 md:gap-6 w-full max-w-xs sm:max-w-sm md:max-w-2xl justify-center px-3 sm:px-4 pb-4 sm:pb-6">
          <button
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
            className="flex-1 bg-[#585be9] hover:bg-[#4a4dd4] active:bg-[#3d3fc4] disabled:opacity-50 disabled:cursor-not-allowed text-white font-['Press_Start_2P'] text-xs sm:text-sm md:text-base px-3 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 border-2 border-black transition-colors min-h-[44px] sm:min-h-[48px]"
          >
            Previous
          </button>
          <button
            onClick={() => handleAnswer(question.answers[0].type, question.answers[0].weight)}
            className="flex-1 bg-[#585be9] hover:bg-[#4a4dd4] active:bg-[#3d3fc4] text-white font-['Press_Start_2P'] text-xs sm:text-sm md:text-base px-3 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 border-2 border-black transition-colors min-h-[44px] sm:min-h-[48px]"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
