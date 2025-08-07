import { getListings, getListingsByDateRange } from './listings';

describe('Listings API', () => {
  describe('getListings', () => {
    it('should be a function', () => {
      expect(typeof getListings).toBe('function');
    });

    it('should return a promise', () => {
      const result = getListings();
      expect(result).toBeInstanceOf(Promise);
      // Clean up the promise to avoid hanging tests
      result.catch(() => {
        // Ignore errors in test - we're just checking the function structure
      });
    });
  });

  describe('getListingsByDateRange', () => {
    it('should be a function', () => {
      expect(typeof getListingsByDateRange).toBe('function');
    });

    it('should return a promise when called with date strings', () => {
      const result = getListingsByDateRange('2024-01-01', '2024-12-31');
      expect(result).toBeInstanceOf(Promise);
      // Clean up the promise to avoid hanging tests
      result.catch(() => {
        // Ignore errors in test - we're just checking the function structure
      });
    });
  });
});
