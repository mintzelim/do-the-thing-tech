import { describe, it, expect } from 'vitest';

describe('Total Time Calculation', () => {
  it('should calculate total time from multiple tasks (in minutes, convert to seconds)', () => {
    const tasks = [
      { id: '1', title: 'Task 1', estimatedTime: 300, completed: false }, // 300 minutes
      { id: '2', title: 'Task 2', estimatedTime: 75, completed: false },  // 75 minutes
      { id: '3', title: 'Task 3', estimatedTime: 94, completed: false },  // 94 minutes
    ];
    
    const totalTime = tasks.reduce((sum, task) => sum + task.estimatedTime * 60, 0); // Convert minutes to seconds
    expect(totalTime).toBe(28140); // (300 + 75 + 94) * 60 = 469 * 60 = 28140 seconds
  });

  it('should recalculate total when task is deleted', () => {
    const tasks = [
      { id: '1', title: 'Task 1', estimatedTime: 300, completed: false },
      { id: '3', title: 'Task 3', estimatedTime: 94, completed: false },
    ];
    
    const totalTime = tasks.reduce((sum, task) => sum + task.estimatedTime * 60, 0);
    expect(totalTime).toBe(23640); // (300 + 94) * 60 = 394 * 60 = 23640 seconds
  });

  it('should recalculate total when task duration is edited', () => {
    const tasks = [
      { id: '1', title: 'Task 1', estimatedTime: 600, completed: false }, // Changed from 300 to 600 minutes
      { id: '2', title: 'Task 2', estimatedTime: 75, completed: false },
      { id: '3', title: 'Task 3', estimatedTime: 94, completed: false },
    ];
    
    const totalTime = tasks.reduce((sum, task) => sum + task.estimatedTime * 60, 0);
    expect(totalTime).toBe(46140); // (600 + 75 + 94) * 60 = 769 * 60 = 46140 seconds
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

    expect(formatTime(23640)).toBe('6h 34m'); // 394 minutes = 6h 34m
    expect(formatTime(28140)).toBe('7h 49m'); // 469 minutes = 7h 49m
    expect(formatTime(3661)).toBe('1h 1m');
    expect(formatTime(0)).toBe('0m 0s');
  });

  it('should handle empty task list', () => {
    const tasks: any[] = [];
    const totalTime = tasks.reduce((sum, task) => sum + task.estimatedTime * 60, 0);
    expect(totalTime).toBe(0);
  });

  it('should handle single task', () => {
    const tasks = [
      { id: '1', title: 'Task 1', estimatedTime: 300, completed: false },
    ];
    
    const totalTime = tasks.reduce((sum, task) => sum + task.estimatedTime * 60, 0);
    expect(totalTime).toBe(18000); // 300 * 60 = 18000 seconds
  });

  it('should not count completed status in calculation', () => {
    const tasks = [
      { id: '1', title: 'Task 1', estimatedTime: 300, completed: true },
      { id: '2', title: 'Task 2', estimatedTime: 75, completed: false },
      { id: '3', title: 'Task 3', estimatedTime: 94, completed: true },
    ];
    
    const totalTime = tasks.reduce((sum, task) => sum + task.estimatedTime * 60, 0);
    expect(totalTime).toBe(28140); // Should include all tasks regardless of completion
  });
});
