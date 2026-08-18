interface ADHDTypePreview { id: number; title: string; description: string; }
const ADHD_TYPES: ADHDTypePreview[] = [
  { id: 1, title: 'Classic', description: 'Hyperactive, impulsive, and always on a mission.' },
  { id: 2, title: 'Inattentive', description: 'Daydreamy, forgetful, but deeply thoughtful.' },
  { id: 3, title: 'Over-focused', description: 'Hyperfocus mode activated; time can disappear.' },
  { id: 4, title: 'Temporal Lobe', description: 'Emotional intensity and reactive responses.' },
  { id: 5, title: 'Limbic', description: 'Mood-driven and emotionally expressive.' },
  { id: 6, title: 'Ring of Fire', description: 'Restless, high energy, and always in motion.' },
  { id: 7, title: 'Anxious', description: 'Vigilant, careful, and always scanning ahead.' },
];

export default function ADHDTypesDisplay() {
  return <section className="quiz-pattern-section"><div className="quiz-shell quiz-panel quiz-panel-inner"><div className="quiz-section-head"><p className="quiz-eyebrow">MEET THE TYPES</p><h2>The 7 ADHD Types</h2><p>According to this quiz, there are seven distinct ADHD types, each with its own perks and challenges.</p></div><div className="quiz-pattern-grid">{ADHD_TYPES.map((type) => <article className="quiz-pattern-card" key={type.id}><b>{String(type.id).padStart(2, '0')}</b><h3>{type.title}</h3><p>{type.description}</p></article>)}</div></div></section>;
}
