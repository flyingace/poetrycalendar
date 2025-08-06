import { convertToUSD, getEventCost } from './financial';

describe('convertToUSD', () => {
  describe('number inputs', () => {
    it('should format positive numbers correctly', () => {
      expect(convertToUSD(123.456)).toBe('$123.46');
      expect(convertToUSD(100)).toBe('$100.00');
      expect(convertToUSD(0)).toBe('$0.00');
      expect(convertToUSD(0.1)).toBe('$0.10');
      expect(convertToUSD(0.01)).toBe('$0.01');
    });

    it('should format negative numbers correctly', () => {
      expect(convertToUSD(-123.456)).toBe('$-123.46');
      expect(convertToUSD(-100)).toBe('$-100.00');
      expect(convertToUSD(-0.01)).toBe('$-0.01');
    });

    it('should handle very large numbers', () => {
      expect(convertToUSD(1234567.89)).toBe('$1234567.89');
      expect(convertToUSD(999999999.99)).toBe('$999999999.99');
    });

    it('should handle very small numbers', () => {
      expect(convertToUSD(0.001)).toBe('$0.00');
      expect(convertToUSD(0.005)).toBe('$0.01');
      expect(convertToUSD(0.004)).toBe('$0.00');
    });
  });

  describe('undefined input', () => {
    it('should handle undefined input', () => {
      expect(convertToUSD(undefined)).toBe('$0.00');
    });
  });

  describe('edge cases', () => {
    it('should handle special number values', () => {
      expect(convertToUSD(NaN)).toBe('$0.00');
      expect(convertToUSD(Infinity)).toBe('$Infinity.00');
      expect(convertToUSD(-Infinity)).toBe('$-Infinity.00');
    });

    it('should handle decimal precision correctly', () => {
      expect(convertToUSD(0.999)).toBe('$1.00');
      expect(convertToUSD(0.994)).toBe('$0.99');
      expect(convertToUSD(0.995)).toBe('$0.99'); // JavaScript floating-point precision
    });
  });
});

describe('getEventCost', () => {
  describe('number inputs', () => {
    it('should return formatted dollar amount for positive numbers', () => {
      expect(getEventCost(25.50)).toBe('$25.50');
      expect(getEventCost(100)).toBe('$100.00');
      expect(getEventCost(0.01)).toBe('$0.01');
    });

    it('should return formatted dollar amount for negative numbers', () => {
      expect(getEventCost(-25.50)).toBe('$-25.50');
      expect(getEventCost(-100)).toBe('$-100.00');
    });

    it('should return "Free" for zero cost', () => {
      expect(getEventCost(0)).toBe('Free');
    });

    it('should handle very large numbers', () => {
      expect(getEventCost(1234567.89)).toBe('$1234567.89');
    });

    it('should handle very small numbers that round to zero', () => {
      expect(getEventCost(0.001)).toBe('Free');
      expect(getEventCost(0.004)).toBe('Free');
    });

    it('should handle very small numbers that round to non-zero', () => {
      expect(getEventCost(0.005)).toBe('$0.01');
      expect(getEventCost(0.01)).toBe('$0.01');
    });
  });

  describe('undefined input', () => {
    it('should return "Free" for undefined cost', () => {
      expect(getEventCost(undefined)).toBe('Free');
    });
  });

  describe('edge cases', () => {
    it('should return "Free" for NaN', () => {
      expect(getEventCost(NaN)).toBe('Free');
    });

    it('should return formatted infinity values', () => {
      expect(getEventCost(Infinity)).toBe('$Infinity.00');
      expect(getEventCost(-Infinity)).toBe('$-Infinity.00');
    });

    it('should handle decimal precision correctly', () => {
      expect(getEventCost(0.999)).toBe('$1.00');
      expect(getEventCost(0.994)).toBe('$0.99');
    });
  });
});
