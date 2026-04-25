import { describe, it, expect } from 'vitest';

describe('Total Time Calculation', () => {
  it('should calculate total time from multiple tasks', () => {
    const tasks = [
      { id: '1', title: 'Task 1', estimatedTime: 300, completed: false },
      { id: '2', title: 'Task 2', estimatedTime: 75, completed: false },
      { id: '3', title: 'Task 3', estimatedTime: 94, completed: false },
    ];
    
    const totalTime = tasks.reduce((sum, task) => sum + task.estimatedTime, 0);
    expect(totalTime).toBe(469); // 300 + 75 + 94
  });

  it('should recalculate total when task is deleted', () => {
    const tasks = [
      { id: '1', title: 'Task 1', estimatedTime: 300, completed: false },
      { id: '3', title: 'Task 3', estimatedTime: 94, completed: false },
    ];
    
    const totalTime = tasks.reduce((sum, task) => sum + task.estimatedTime, 0);
    expect(totalTime).toBe(394); // 300 + 94
  });

  it('should recalculate total when task duration is edited', () => {
    const tasks = [
      { id: '1', title: 'Task 1', estimatedTime: 600, completed: false }, // Changed from 300 to 600
      { id: '2', title: 'Task 2', estimatedTime: 75, completed: false },
      { id: '3', title: 'Task 3', estimatedTime: 94, completed: false },
    ];
    
    const totalTime = tasks.reduce((sum, task) => sum + task.estimatedTime, 0);
    expect(totalTime).toBe(769); // 600 + 75 + 94
  });

  it('should format time correctly', () => {
    const formatTime = (seconds: number) => {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
      if (hours > 0) {
        return `${hours}h ${minutes}m`;
      }
      return `${minutes}m ${secs}s`;
    };

    expect(formatTime(394)).toBe('6m 34s');
    expect(formatTime(469)).toBe('7m 49s');
    expect(formatTime(3661)).toBe('1h 1m');
    expect(formatTime(0)).toBe('0m 0s');
  });

  it('should handle empty task list', () => {
    const tasks: any[] = [];
    const totalTime = tasks.reduce((sum, task) => sum + task.estimatedTime, 0);
    expect(totalTime).toBe(0);
  });

  it('should handle single task', () => {
    const tasks = [
      { id: '1', title: 'Task 1', estimatedTime: 300, completed: false },
    ];
    
    const totalTime = tasks.reduce((sum, task) => sum + task.estimatedTime, 0);
    expect(totalTime).toBe(300);
  });

  it('should not count completed status in calculation', () => {
    const tasks = [
      { id: '1', title: 'Task 1', estimatedTime: 300, completed: true },
      { id: '2', title: 'Task 2', estimatedTime: 75, completed: false },
      { id: '3', title: 'Task 3', estimatedTime: 94, completed: true },
    ];
    
    const totalTime = tasks.reduce((sum, task) => sum + task.estimatedTime, 0);
    expect(totalTime).toBe(469); // Should include all tasks regardless of completion
  });
});
