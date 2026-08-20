export interface QuizMascotScene {
  path: string;
  alt: string;
}

export const QUIZ_RESULT_MASCOTS: Record<string, QuizMascotScene> = {
  classic: { path: '/manus-storage/quiz-spark-starter-alpha_c537785a.png', alt: 'Purple mascot moving from a starting flag toward a checklist finish line' },
  inattentive: { path: '/manus-storage/quiz-thought-wanderer-alpha_ed8084e4.png', alt: 'Purple mascot following a floating idea dot beside a reminder card' },
  overfocused: { path: '/manus-storage/quiz-deep-dive-mind-alpha_f1140570.png', alt: 'Purple mascot peering into a glowing pixel portal beside a small timer' },
  temporal: { path: '/manus-storage/quiz-signal-catcher-alpha_5be86008.png', alt: 'Purple mascot beside gentle signal waves while holding a grounding pebble' },
  limbic: { path: '/manus-storage/quiz-mood-powered-mind-alpha_ad11b96f.png', alt: 'Purple mascot climbing a tiny hill beside a low-battery symbol' },
  ringOfFire: { path: '/manus-storage/quiz-many-tabs-mind-alpha_ae85bd31.png', alt: 'Purple mascot calmly closing floating browser tabs until one remains' },
  anxious: { path: '/manus-storage/quiz-careful-scout-alpha_0d92965f.png', alt: 'Purple mascot holding a map and lantern at a small safe campsite' },
};
