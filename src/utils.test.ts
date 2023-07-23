import { getRandomNumber, getRandomFloatNumber } from './utils';

describe('Utils test', () => {
  describe('getRandomNumber', () => {
    it('should return a number', () => {
      expect(getRandomNumber()).toBeInteger();
    });

    it('should return a number less than "max" param', () => {
      const max = 100;
      const number = getRandomNumber(max);
      expect(number).toBeInteger();
      expect(number).toBeLessThan(max);
    });
  });

  describe('getRandomFloatNumber', () => {
    it('should return a float number', () => {
      const number = getRandomFloatNumber();

      expect(number).toBeNumber();
      expect(number).not.toBeInteger();
    });
  });
});
