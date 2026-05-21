/**
 * Google Tag Manager Event Tracking Utility
 * Provides functions to push events to GTM dataLayer
 */

export const trackEvent = (eventName: string, eventData?: Record<string, any>) => {
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...eventData,
    });
  }
};

/**
 * Track page view events
 */
export const trackPageView = (pagePath: string, pageTitle?: string) => {
  trackEvent("page_view", {
    page_path: pagePath,
    page_title: pageTitle || document.title,
  });
};

/**
 * Track button clicks and CTAs
 */
export const trackButtonClick = (buttonName: string, buttonLocation?: string) => {
  trackEvent("button_click", {
    button_name: buttonName,
    button_location: buttonLocation,
  });
};

/**
 * Track quiz interactions
 */
export const trackQuizStart = () => {
  trackEvent("quiz_start", {
    quiz_name: "ADHD Type Quiz",
  });
};

export const trackQuizComplete = (quizResult?: string) => {
  trackEvent("quiz_complete", {
    quiz_name: "ADHD Type Quiz",
    quiz_result: quizResult,
  });
};

/**
 * Track blog interactions
 */
export const trackBlogPostView = (postTitle: string, postId?: string) => {
  trackEvent("blog_post_view", {
    post_title: postTitle,
    post_id: postId,
  });
};

/**
 * Track form submissions
 */
export const trackFormSubmit = (formName: string) => {
  trackEvent("form_submit", {
    form_name: formName,
  });
};

/**
 * Track task creation (main feature)
 */
export const trackTaskCreated = (taskDescription?: string) => {
  trackEvent("task_created", {
    task_description: taskDescription ? taskDescription.substring(0, 100) : "Task created",
  });
};

/**
 * Track engagement metrics
 */
export const trackEngagement = (engagementType: string, engagementValue?: any) => {
  trackEvent("engagement", {
    engagement_type: engagementType,
    engagement_value: engagementValue,
  });
};

// Declare global window type for dataLayer
declare global {
  interface Window {
    dataLayer?: any[];
  }
}
