import { convertToUSD, getEventCost } from './financial';

describe('convertToUSD', () => {
  describe('number inputs', () => {
    it('should format positive numbers correctly', () => {
      expect(convertToUSD(123.456)).toBe('$123.46');
      expect(convertToUSD(100)).toBe('$100.00');
      expect(convertToUSD(0.1)).toBe('$0.10');
      expect(convertToUSD(0.01)).toBe('$0.01');
    });

    it('should handle very large numbers', () => {
      expect(convertToUSD(1234567.89)).toBe('$1234567.89');
      expect(convertToUSD(999999999.99)).toBe('$999999999.99');
    });
  });
});

describe('getEventCost', () => {
  describe('number inputs', () => {
    it('should return formatted dollar amount for positive numbers', () => {
      expect(getEventCost('25.50')).toBe('$25.50');
      expect(getEventCost('100')).toBe('$100.00');
      expect(getEventCost('0.01')).toBe('$0.01');
    });

    it('should return "Free" for zero cost', () => {
      expect(getEventCost('0')).toBe('Free');
    });

    it('should handle very large numbers', () => {
      expect(getEventCost('1234567.89')).toBe('$1234567.89');
    });
  });
});
