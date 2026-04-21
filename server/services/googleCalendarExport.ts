/**
 * Google Calendar Export Service
 * Handles exporting tasks to Google Calendar with intelligent scheduling
 */

export type ExportTask = {
  title: string;
  description?: string;
  estimatedTime: number; // in minutes
  priority?: "high" | "medium" | "low";
};

export type CalendarEvent = {
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  priority?: string;
};

/**
 * Generates calendar events from tasks with intelligent scheduling
 * Finds available time slots and creates events
 */
export function generateCalendarEvents(
  tasks: ExportTask[],
  startDate: Date = new Date()
): CalendarEvent[] {
  const events: CalendarEvent[] = [];
  let currentTime = new Date(startDate);
  
  // Set to 9 AM if before business hours
  if (currentTime.getHours() < 9) {
    currentTime.setHours(9, 0, 0, 0);
  }

  tasks.forEach((task) => {
    const startTime = new Date(currentTime);
    const endTime = new Date(currentTime.getTime() + task.estimatedTime * 60000);

    // Skip to next day if event would go past 6 PM
    if (endTime.getHours() >= 18) {
      currentTime.setDate(currentTime.getDate() + 1);
      currentTime.setHours(9, 0, 0, 0);
    }

    events.push({
      title: task.title,
      description: task.description || `Task: ${task.title}`,
      startTime,
      endTime,
      priority: task.priority,
    });

    currentTime = new Date(endTime);
    // Add 15-minute buffer between tasks
    currentTime.setTime(currentTime.getTime() + 15 * 60000);
  });

  return events;
}

/**
 * Formats calendar events for Google Calendar API
 */
export function formatForGoogleCalendar(events: CalendarEvent[]) {
  return events.map((event) => ({
    summary: event.title,
    description: event.description,
    start: {
      dateTime: event.startTime.toISOString(),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    end: {
      dateTime: event.endTime.toISOString(),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    colorId: event.priority === "high" ? "1" : event.priority === "medium" ? "2" : "3",
  }));
}

/**
 * Generates a shareable calendar link (placeholder for actual Google Calendar integration)
 */
export function generateCalendarLink(events: CalendarEvent[]): string {
  // This would be replaced with actual Google Calendar API integration
  const eventDetails = events
    .map((e) => `${e.title} (${e.startTime.toLocaleString()})`)
    .join("\n");
  
  return `https://calendar.google.com/calendar/u/0/r?cid=${encodeURIComponent(eventDetails)}`;
}

/**
 * Calculates optimal start time considering user preferences
 */
export function calculateOptimalStartTime(
  tasks: ExportTask[],
  preferredStartHour: number = 9
): Date {
  const now = new Date();
  const startTime = new Date(now);
  
  // If current time is before preferred start hour, use today
  if (now.getHours() < preferredStartHour) {
    startTime.setHours(preferredStartHour, 0, 0, 0);
  } else {
    // Otherwise, start tomorrow at preferred hour
    startTime.setDate(startTime.getDate() + 1);
    startTime.setHours(preferredStartHour, 0, 0, 0);
  }
  
  return startTime;
}

/**
 * Estimates total calendar time needed including breaks
 */
export function estimateTotalCalendarTime(tasks: ExportTask[]): {
  totalMinutes: number;
  totalHours: number;
  withBreaks: number;
} {
  const totalMinutes = tasks.reduce((sum, task) => sum + task.estimatedTime, 0);
  const totalHours = totalMinutes / 60;
  
  // Add 15-minute breaks between tasks (n-1 breaks for n tasks)
  const breakTime = Math.max(0, (tasks.length - 1) * 15);
  const withBreaks = totalMinutes + breakTime;

  return {
    totalMinutes,
    totalHours: Math.round(totalHours * 100) / 100,
    withBreaks,
  };
}
