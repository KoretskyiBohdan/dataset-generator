import {
  getRandomNumber,
  getRandomFloatNumber,
  getRandomArrayValue,
  isItHasAReference,
  getObjectProperty,
  resolveReference,
  definedTypeResolver,
} from './utils';
import { DEFINED } from './constants';

describe('utils.ts', () => {
  describe('getRandomNumber', () => {
    it('should returns a number', () => {
      expect(getRandomNumber()).toBeInteger();
    });

    it('should returns a number less than "max" param', () => {
      const max = 100;
      const number = getRandomNumber(max);
      expect(number).toBeInteger();
      expect(number).toBeLessThan(max);
    });
  });

  describe('getRandomFloatNumber', () => {
    it('should returns a float number', () => {
      const number = getRandomFloatNumber();

      expect(number).toBeNumber();
      expect(number).not.toBeInteger();
    });
  });

  describe('getRandomArrayValue', () => {
    it('should returns an existing value from array', () => {
      const data = [1, 2, 3];

      expect(getRandomArrayValue(data)).toBeOneOf(data);
    });

    it('should works with one-item-array', () => {
      const data = [1];

      expect(getRandomArrayValue(data)).toBeOneOf(data);
    });

    it('should return "undefined" for empty array', () => {
      const data = [];

      expect(getRandomArrayValue(data)).toBe(undefined);
    });
  });

  describe('isItHasAReference', () => {
    it('should returns "true" for a value with reference', () => {
      const value = 'Hello {name}!';

      expect(isItHasAReference(value)).toBeTrue();
    });

    it('should returns "false" for a value with no reference', () => {
      const value = 'Hello John!';

      expect(isItHasAReference(value)).toBeFalse();
    });
  });

  describe('getObjectProperty', () => {
    it('should return property value by path', () => {
      const obj = {
        data: {
          x: true,
          y: false,
        },
      };
      expect(getObjectProperty(obj, 'data')).toBe(obj.data);
      expect(getObjectProperty(obj, 'data.x')).toBe(obj.data.x);
      expect(getObjectProperty(obj, 'data.y')).toBe(obj.data.y);
    });

    it('should return "undefined" for a non-existing property', () => {
      const obj = {
        data: {
          x: true,
          y: false,
        },
      };
      expect(getObjectProperty(obj, 'data.z')).toBe(undefined);
      expect(getObjectProperty(obj, '')).toBe(undefined);
      expect(getObjectProperty(obj, null)).toBe(undefined);
    });
  });

  describe('resolveReference', () => {
    it('should return a resolved string', () => {
      const root = {
        data: {
          id: 1,
        },
      };

      const value = 'My id is {data.id}';
      const expected = 'My id is 1';

      expect(resolveReference(root, value)).toBe(expected);
    });

    it('should ignore non existing reference', () => {
      const root = {
        data: {
          id: 1,
        },
      };

      const value = 'My id is {data.name}';
      const expected = 'My id is {data.name}';

      expect(resolveReference(root, value)).toBe(expected);
    });

    it('should return placeholder if reference point to an object', () => {
      const root = {
        data: {
          name: {
            first: 'John',
            last: 'Smith',
          },
        },
      };

      const value = 'My id is {data.name}';
      const expected = 'My id is [object Object]';

      expect(resolveReference(root, value)).toBe(expected);
    });

    it('should works with positive boolean types', () => {
      const root = {
        data: {
          isValid: true,
        },
      };

      const value = 'isValid: {data.isValid}';
      const expected = 'isValid: true';

      expect(resolveReference(root, value)).toBe(expected);
    });

    it('should works with negative boolean types', () => {
      const root = {
        data: {
          isValid: false,
        },
      };

      const value = 'isValid: {data.isValid}';
      const expected = 'isValid: false';

      expect(resolveReference(root, value)).toBe(expected);
    });

    it('should works with "null"', () => {
      const root = {
        data: null,
      };

      const value = 'value: {data}';
      const expected = 'value: null';

      expect(resolveReference(root, value)).toBe(expected);
    });
  });

  describe('definedTypeResolver', () => {
    it('should resolve existing type', () => {
      const index = 0;

      expect(definedTypeResolver(DEFINED.ID, index)).toBe(1);
      expect(definedTypeResolver(DEFINED.DATE_NOW, index)).toBeInteger();
      expect(definedTypeResolver(DEFINED.RANDOM_INTEGER, index)).toBeInteger();
      expect(definedTypeResolver(DEFINED.RANDOM_FLOAT, index)).not.toBeInteger();
    });

    it('should returns nothing for a non existing type', () => {
      const index = 0;
      const nonExistingType = Symbol('type');
      expect(definedTypeResolver(nonExistingType, index)).toBe(undefined);
    });
  });
});
