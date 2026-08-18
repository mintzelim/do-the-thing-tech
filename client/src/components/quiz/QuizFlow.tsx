import { useState } from 'react';
import type { QuizResult } from '@/pages/Quiz';

export type QuizTypeKey = 'classic' | 'inattentive' | 'overfocused' | 'temporal' | 'limbic' | 'ringOfFire' | 'anxious';
export interface QuizAnswer { text: string; type: QuizTypeKey; weight: number; }
export interface QuizQuestion { id: number; text: string; answers: QuizAnswer[]; }

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  { id: 1, text: 'When faced with a task, what usually happens?', answers: [{ text: 'I jump in immediately without planning', type: 'classic', weight: 2 }, { text: 'I get overwhelmed and avoid it', type: 'inattentive', weight: 2 }, { text: 'I start but get distracted halfway', type: 'ringOfFire', weight: 2 }, { text: 'I worry about doing it perfectly', type: 'anxious', weight: 2 }] },
  { id: 2, text: 'How do you experience time?', answers: [{ text: "Time? What time? I'm always late", type: 'temporal', weight: 3 }, { text: "I'm constantly rushing", type: 'ringOfFire', weight: 2 }, { text: 'I lose track of it completely', type: 'inattentive', weight: 2 }, { text: "I'm anxious about being late", type: 'anxious', weight: 1 }] },
  { id: 3, text: 'Your energy levels are usually:', answers: [{ text: 'Bouncing off the walls', type: 'ringOfFire', weight: 3 }, { text: 'Inconsistent — high then crashed', type: 'limbic', weight: 2 }, { text: 'Calm but easily overwhelmed', type: 'inattentive', weight: 2 }, { text: 'Anxious and tense', type: 'anxious', weight: 2 }] },
  { id: 4, text: 'In social situations, you tend to:', answers: [{ text: 'Talk a lot and interrupt people', type: 'ringOfFire', weight: 2 }, { text: 'Act without thinking about consequences', type: 'classic', weight: 2 }, { text: 'Struggle to follow conversations', type: 'inattentive', weight: 2 }, { text: 'Worry about saying the wrong thing', type: 'anxious', weight: 2 }] },
  { id: 5, text: 'Your workspace is usually:', answers: [{ text: 'Chaotic — I work in organized chaos', type: 'classic', weight: 2 }, { text: 'Perfectly organized or completely messy', type: 'overfocused', weight: 2 }, { text: 'I have no idea where anything is', type: 'temporal', weight: 2 }, { text: "Whatever — I'm too busy to care", type: 'limbic', weight: 2 }] },
  { id: 6, text: 'When you make a mistake, you:', answers: [{ text: 'Shrug it off and move on', type: 'classic', weight: 2 }, { text: 'Spiral and obsess over it', type: 'overfocused', weight: 3 }, { text: "Didn't even notice I made one", type: 'temporal', weight: 2 }, { text: 'Get frustrated and try again', type: 'limbic', weight: 1 }] },
  { id: 7, text: 'Your to-do list is:', answers: [{ text: 'Non-existent — I just do things', type: 'temporal', weight: 2 }, { text: 'Overwhelming and never-ending', type: 'anxious', weight: 2 }, { text: 'Started but never finished', type: 'limbic', weight: 2 }, { text: 'What to-do list?', type: 'inattentive', weight: 2 }] },
  { id: 8, text: 'You focus best when:', answers: [{ text: "There's a deadline and pressure", type: 'classic', weight: 2 }, { text: "I'm genuinely interested in the topic", type: 'inattentive', weight: 2 }, { text: 'I can move around and fidget', type: 'ringOfFire', weight: 2 }, { text: 'Everything is perfect and organized', type: 'overfocused', weight: 2 }] },
  { id: 9, text: 'Your biggest struggle is:', answers: [{ text: 'Staying still and focused', type: 'ringOfFire', weight: 3 }, { text: 'Controlling my impulses', type: 'classic', weight: 3 }, { text: 'Remembering things and paying attention', type: 'temporal', weight: 3 }, { text: 'Perfectionism and anxiety', type: 'anxious', weight: 3 }] },
  { id: 10, text: 'If you had to describe yourself in one word:', answers: [{ text: 'Chaotic', type: 'classic', weight: 2 }, { text: 'Scattered', type: 'inattentive', weight: 2 }, { text: 'Energetic', type: 'ringOfFire', weight: 2 }, { text: 'Combination of everything', type: 'limbic', weight: 3 }] },
];

export const ADHD_TYPE_RESULTS: Record<QuizTypeKey, Omit<QuizResult, 'resultKey' | 'score'>> = {
  classic: { type: 'Classic ADHD', character: 'The "Quest-Chaser" pattern', description: 'This result points to an action-first pattern: your brain may spot a spark and go, “Let’s do it now!” Planning, pausing, or finishing can be the less exciting sequel.' },
  inattentive: { type: 'Inattentive ADHD', character: 'The "High Ping" pattern', description: 'This result points to an internally busy pattern: your attention may drift before you mean it to, especially when a next step is boring, invisible, or far away.' },
  overfocused: { type: 'Overfocused ADHD', character: 'The "Strong Grip" pattern', description: 'This result points to a strong-stickiness pattern: once your mind locks onto an idea, task, or worry, changing channels can feel surprisingly hard.' },
  temporal: { type: 'Temporal Lobe ADHD', character: 'The "Time-Blind" pattern', description: 'This result points to a pattern where time, memory cues, and emotional reactions can feel extra loud. A small disruption may land bigger than you expected.' },
  limbic: { type: 'Limbic ADHD', character: 'The "Low-gear" pattern', description: 'This result points to a low-gear pattern: task energy can rise and fall with mood, so an ordinary job may look like a mountain on a heavier day.' },
  ringOfFire: { type: 'Ring of Fire ADHD', character: 'The "Many Tabs" pattern', description: 'This result points to a high-input pattern: your brain may feel like it is juggling sixteen tabs at once—ideas, noise, energy, and all.' },
  anxious: { type: 'Anxious ADHD', character: 'The "Careful Thought" pattern', description: 'This result points to a care-first pattern: your brain can be an excellent risk scanner, but it may keep scanning long after the moment needs it to.' },
};

const INITIAL_SCORES: Record<QuizTypeKey, number> = { classic: 0, inattentive: 0, overfocused: 0, temporal: 0, limbic: 0, ringOfFire: 0, anxious: 0 };

export function calculateQuizResult(answers: QuizAnswer[]): QuizResult {
  const scores = { ...INITIAL_SCORES };
  answers.forEach((answer) => { scores[answer.type] += answer.weight; });
  const highestType = (Object.entries(scores) as [QuizTypeKey, number][]).reduce((current, next) => current[1] >= next[1] ? current : next)[0];
  const profile = ADHD_TYPE_RESULTS[highestType];
  return { resultKey: highestType, type: profile.type, character: profile.character, score: scores[highestType], description: profile.description };
}

interface QuizFlowProps { onComplete: (quizResult: QuizResult) => void; }

export default function QuizFlow({ onComplete }: QuizFlowProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(QuizAnswer | null)[]>(Array(QUIZ_QUESTIONS.length).fill(null));
  const question = QUIZ_QUESTIONS[currentQuestion];
  const selectedAnswer = answers[currentQuestion];
  const selectAnswer = (answer: QuizAnswer) => setAnswers((previous) => previous.map((item, index) => index === currentQuestion ? answer : item));
  const continueQuiz = () => {
    if (!selectedAnswer) return;
    if (currentQuestion === QUIZ_QUESTIONS.length - 1) onComplete(calculateQuizResult(answers.filter((answer): answer is QuizAnswer => Boolean(answer))));
    else setCurrentQuestion((previous) => previous + 1);
  };

  return <section className="quiz-flow-page"><div className="quiz-shell quiz-flow-shell"><div className="quiz-flow-head"><div><p className="quiz-eyebrow">ADHD TYPE QUIZ</p><h1 className="quiz-flow-title">Find your type in 10 questions.</h1></div><span className="quiz-flow-count">QUESTION {currentQuestion + 1} OF {QUIZ_QUESTIONS.length}</span></div><div className="quiz-checkpoint-rail" aria-label={`Question ${currentQuestion + 1} of ${QUIZ_QUESTIONS.length}`}>{QUIZ_QUESTIONS.map((item, index) => <span key={item.id} className={`quiz-checkpoint ${index < currentQuestion ? 'is-done' : ''} ${index === currentQuestion ? 'is-current' : ''}`} />)}</div><div className="quiz-panel quiz-question-panel"><span className="quiz-checkpoint-flag">CHECKPOINT {String(currentQuestion + 1).padStart(2, '0')}</span><p className="quiz-eyebrow">YOUR NEXT ANSWER</p><h2>{question.text}</h2><p className="quiz-question-note">Choose the answer that feels closest. There is no perfect response.</p><div className="quiz-answer-list">{question.answers.map((answer, index) => <button type="button" key={answer.text} onClick={() => selectAnswer(answer)} className={`quiz-answer ${selectedAnswer?.text === answer.text ? 'is-selected' : ''}`} aria-pressed={selectedAnswer?.text === answer.text}><span className="quiz-answer-marker">{String.fromCharCode(65 + index)}</span><span>{answer.text}</span></button>)}</div></div><div className="quiz-flow-actions"><button type="button" onClick={() => setCurrentQuestion((previous) => Math.max(0, previous - 1))} className="quiz-secondary-action" disabled={currentQuestion === 0}>← PREVIOUS</button><button type="button" onClick={continueQuiz} className="quiz-primary-action" disabled={!selectedAnswer}>{currentQuestion === QUIZ_QUESTIONS.length - 1 ? 'SEE MY ADHD TYPE →' : 'CONTINUE →'}</button></div></div></section>;
}
