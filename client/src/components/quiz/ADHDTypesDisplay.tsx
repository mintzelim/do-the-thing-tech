import { assetUrl } from '@/lib/assetUrl';
import { QUIZ_RESULT_MASCOTS } from './quizResultMascots';

interface ADHDTypePreview {
  id: number;
  resultKey: string;
  title: string;
  description: string;
}

const ADHD_TYPES: ADHDTypePreview[] = [
  { id: 1, resultKey: 'classic', title: 'The Spark Starter', description: 'Quick to act and quick to spot a lively next move.' },
  { id: 2, resultKey: 'inattentive', title: 'The Thought Wanderer', description: 'A busy inner world where attention can quietly wander.' },
  { id: 3, resultKey: 'overfocused', title: 'The Deep-Dive Mind', description: 'Locks on hard; switching tracks may take a moment.' },
  { id: 4, resultKey: 'temporal', title: 'The Signal Catcher', description: 'Picks up time, memory, and emotion cues intensely.' },
  { id: 5, resultKey: 'limbic', title: 'The Mood-Powered Mind', description: 'Energy and motivation can shift with the day’s emotional weather.' },
  { id: 6, resultKey: 'ringOfFire', title: 'The Many-Tabs Mind', description: 'Ideas, energy, and inputs all arrive at once.' },
  { id: 7, resultKey: 'anxious', title: 'The Careful Scout', description: 'Always scanning ahead when the stakes feel high.' },
];

export default function ADHDTypesDisplay() {
  return (
    <section className="quiz-pattern-section">
      <div className="quiz-shell quiz-panel quiz-panel-inner">
        <div className="quiz-section-head">
          <p className="quiz-eyebrow">MEET THE PATTERNS</p>
          <h2>The 7 Quiz Patterns</h2>
          <p>We use friendly pattern names below. They are inspired by <a className="quiz-source-link" href="https://www.amenclinics.com/conditions/adhd-add/" target="_blank" rel="noreferrer">Dr. Amen/Amen Clinics&apos; seven-type framework</a>, in which each pattern has its own perks and challenges.</p>
        </div>
        <div className="quiz-pattern-grid">
          {ADHD_TYPES.map((type) => {
            const mascot = QUIZ_RESULT_MASCOTS[type.resultKey];
            return (
              <article className="quiz-pattern-card" key={type.id}>
                <img className="quiz-pattern-mascot" src={assetUrl(mascot.path)} alt={mascot.alt} />
                <b>{String(type.id).padStart(2, '0')}</b>
                <h3>{type.title}</h3>
                <p>{type.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
