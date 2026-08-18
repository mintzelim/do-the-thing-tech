const signals = [
  { title: 'Understand your brain', description: 'Learn which of the 7 ADHD types matches your brain pattern and discover your unique strengths.' },
  { title: 'Get your ADHD type', description: 'See the result pattern your answers point toward and the everyday strengths it can highlight.' },
  { title: 'Keep a useful next step', description: 'Use the result as a starting point for one practical adjustment or a smaller task.' },
];

export default function WhyTakeQuiz() {
  return <section className="quiz-signals"><div className="quiz-shell quiz-panel quiz-panel-inner quiz-signal-stack"><div className="quiz-signal-copy"><p className="quiz-eyebrow">WHY TAKE THIS QUIZ?</p><h2>Find the type that feels most like you.</h2><p>This is a 10-question ADHD type quiz designed to help you notice the patterns, strengths, and friction points that show up most often for you.</p><aside className="quiz-postit"><small>ONE THING TO KEEP</small><p>You do not need a perfect answer to find a useful pattern.</p></aside></div><div className="quiz-signal-list">{signals.map((signal, index) => <div className="quiz-signal-row" key={signal.title}><b>{String(index + 1).padStart(2, '0')}</b><span><strong>{signal.title}.</strong> {signal.description}</span></div>)}</div></div></section>;
}
