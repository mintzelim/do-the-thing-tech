import { assetUrl } from '@/lib/assetUrl';

interface QuizMascotProps {
  speech?: string;
  className?: string;
}

export default function QuizMascot({ speech, className = "" }: QuizMascotProps) {
  return (
    <div className={`quiz-mascot-stage ${className}`.trim()} aria-hidden="true">
      {speech && <span className="quiz-mascot-bubble">{speech}</span>}
      <img className="quiz-mascot-image" src={assetUrl('/manus-storage/audience-howitworks-remote-workers_7ce7f448.png')} alt="" />
    </div>
  );
}
