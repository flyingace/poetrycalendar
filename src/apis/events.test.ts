import { getEvents, getEventsByDateRange } from './events';

describe('Events API', () => {
  describe('getEvents', () => {
    it('should be a function', () => {
      expect(typeof getEvents).toBe('function');
    });

    it('should return a promise', () => {
      const result = getEvents();
      expect(result).toBeInstanceOf(Promise);
      // Clean up the promise to avoid hanging tests
      result.catch(() => {
        // Ignore errors in test - we're just checking the function structure
      });
    });
  });

  describe('getEventsByDateRange', () => {
    it('should be a function', () => {
      expect(typeof getEventsByDateRange).toBe('function');
    });

    it('should return a promise when called with date strings', () => {
      const result = getEventsByDateRange('2024-01-01', '2024-12-31');
      expect(result).toBeInstanceOf(Promise);
      // Clean up the promise to avoid hanging tests
      result.catch(() => {
        // Ignore errors in test - we're just checking the function structure
      });
    });
  });
});
