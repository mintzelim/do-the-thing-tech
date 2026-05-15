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
    <div className="min-h-screen bg-[#edeeee] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <p className="font-['Press_Start_2P'] text-[#585be9] text-sm">
              Question {currentQuestion + 1} of {QUIZ_QUESTIONS.length}
            </p>
            <p className="font-['Press_Start_2P'] text-[#585be9] text-sm">
              {Math.round(progress)}%
            </p>
          </div>
          <div className="w-full bg-[#21201e] border-2 border-black h-6">
            <div
              className="bg-[#585be9] h-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="bg-white border-4 border-black p-8 sm:p-12 mb-8">
          <h2 className="font-['Press_Start_2P'] text-[#21201e] text-lg sm:text-2xl mb-8 leading-relaxed">
            {question.text}
          </h2>

          {/* Answers */}
          <div className="space-y-4">
            {question.answers.map((answer, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(answer.type, answer.weight)}
                className="w-full bg-[#f4eba7] border-3 border-black p-6 text-left hover:bg-[#585be9] hover:text-white transition-all active:scale-95"
              >
                <p className="font-['Press_Start_2P'] text-sm sm:text-base leading-relaxed">
                  {answer.text}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
