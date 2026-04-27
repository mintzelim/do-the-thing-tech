import { describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('Navigation Smart Visibility Logic', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should detect no running tasks when localStorage is empty', () => {
    const savedState = localStorage.getItem('doTheThing_state');
    const hasRunningTasks = savedState ? JSON.parse(savedState).steps?.length > 0 : false;
    expect(hasRunningTasks).toBe(false);
  });

  it('should detect running tasks when steps exist', () => {
    const mockState = {
      flowState: 'breakdown',
      steps: [
        { id: '1', title: 'Task 1', estimatedTime: 10 },
        { id: '2', title: 'Task 2', estimatedTime: 15 },
      ],
    };
    localStorage.setItem('doTheThing_state', JSON.stringify(mockState));

    const savedState = localStorage.getItem('doTheThing_state');
    const hasRunningTasks = savedState ? JSON.parse(savedState).steps?.length > 0 : false;
    expect(hasRunningTasks).toBe(true);
  });

  it('should detect no running tasks when steps array is empty', () => {
    const mockState = {
      flowState: 'input',
      steps: [],
    };
    localStorage.setItem('doTheThing_state', JSON.stringify(mockState));

    const savedState = localStorage.getItem('doTheThing_state');
    const hasRunningTasks = savedState ? JSON.parse(savedState).steps?.length > 0 : false;
    expect(hasRunningTasks).toBe(false);
  });

  it('should handle malformed JSON gracefully', () => {
    localStorage.setItem('doTheThing_state', 'invalid json');

    let hasRunningTasks = false;
    const savedState = localStorage.getItem('doTheThing_state');
    try {
      if (savedState) {
        hasRunningTasks = JSON.parse(savedState).steps?.length > 0;
      }
    } catch (error) {
      hasRunningTasks = false;
    }
    expect(hasRunningTasks).toBe(false);
  });

  it('should detect tasks after clearing and re-adding', () => {
    // First, add tasks
    const mockState = {
      flowState: 'breakdown',
      steps: [{ id: '1', title: 'Task 1', estimatedTime: 10 }],
    };
    localStorage.setItem('doTheThing_state', JSON.stringify(mockState));

    let savedState = localStorage.getItem('doTheThing_state');
    let hasRunningTasks = savedState ? JSON.parse(savedState).steps?.length > 0 : false;
    expect(hasRunningTasks).toBe(true);

    // Clear tasks
    localStorage.removeItem('doTheThing_state');
    savedState = localStorage.getItem('doTheThing_state');
    hasRunningTasks = savedState ? JSON.parse(savedState).steps?.length > 0 : false;
    expect(hasRunningTasks).toBe(false);

    // Re-add tasks
    localStorage.setItem('doTheThing_state', JSON.stringify(mockState));
    savedState = localStorage.getItem('doTheThing_state');
    hasRunningTasks = savedState ? JSON.parse(savedState).steps?.length > 0 : false;
    expect(hasRunningTasks).toBe(true);
  });
});
