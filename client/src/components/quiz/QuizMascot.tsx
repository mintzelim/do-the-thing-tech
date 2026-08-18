interface QuizMascotProps {
  speech?: string;
  className?: string;
}

export default function QuizMascot({ speech, className = "" }: QuizMascotProps) {
  return (
    <div className={`quiz-mascot-stage ${className}`.trim()} aria-hidden="true">
      {speech && <span className="quiz-mascot-bubble">{speech}</span>}
      <span className="quiz-mascot-body" />
    </div>
  );
}
