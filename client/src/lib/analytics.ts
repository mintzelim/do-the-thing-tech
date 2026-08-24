export type ProductEventName =
  | "task_breakdown_completed"
  | "task_completed"
  | "timer_started"
  | "quiz_completed"
  | "guide_opened";

type ProductEventParameters = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (command: "event", eventName: string, parameters?: ProductEventParameters) => void;
  }
}

/**
 * Sends only deliberately non-sensitive product signals. Never pass free-text
 * brain dumps, task titles, quiz answers, or health-related inferences here.
 */
export function trackProductEvent(eventName: ProductEventName, parameters: ProductEventParameters = {}) {
  if (typeof window === "undefined") return;
  const safeParameters = Object.fromEntries(Object.entries(parameters).filter(([, value]) => value !== undefined));
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, safeParameters);
    return;
  }
  window.dataLayer?.push({ event: eventName, ...safeParameters });
}

export function bucketCount(count: number) {
  if (count <= 1) return "1";
  if (count <= 3) return "2_3";
  if (count <= 6) return "4_6";
  return "7_plus";
}
