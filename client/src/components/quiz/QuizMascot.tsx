import { assetUrl } from '@/lib/assetUrl';

interface QuizMascotProps {
  speech?: string;
  className?: string;
  imagePath?: string;
  imageAlt?: string;
}

export default function QuizMascot({ speech, className = "", imagePath, imageAlt = "" }: QuizMascotProps) {
  const mascotPath = imagePath ?? '/manus-storage/audience-howitworks-remote-workers_7ce7f448.png';
  return (
    <div className={`quiz-mascot-stage ${className}`.trim()} aria-hidden={imageAlt ? undefined : true}>
      {speech && <span className="quiz-mascot-bubble">{speech}</span>}
      <img className="quiz-mascot-image" src={assetUrl(mascotPath)} alt={imageAlt} />
    </div>
  );
}
