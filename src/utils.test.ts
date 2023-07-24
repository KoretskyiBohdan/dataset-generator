import {
  getRandomNumber,
  getRandomFloatNumber,
  getRandomArrayValue,
  isItHasAReference,
  createPropertyPath,
  getObjectProperty,
  setObjectProperty,
  resolveReference,
  createPropsByReferences,
  definedTypeResolver,
} from './utils';
import { DEFINED } from './constants';
import { ReferencesListType } from './types';

describe('utils.ts', () => {
  describe('getRandomNumber', () => {
    it('should return a number', () => {
      expect(getRandomNumber()).toBeInteger();
    });

    it('should return a number less than "max" param', () => {
      const max = 100;
      const number = getRandomNumber(max);
      expect(number).toBeInteger();
      expect(number).toBeLessThanOrEqual(max);
    });
  });

  describe('getRandomFloatNumber', () => {
    it('should return a float number', () => {
      const number = getRandomFloatNumber();

      expect(number).toBeNumber();
      expect(number).not.toBeInteger();
    });
  });

  describe('getRandomArrayValue', () => {
    it('should return an existing value from array', () => {
      const data = [1, 2, 3];

      expect(getRandomArrayValue(data)).toBeOneOf(data);
    });

    it('should work with one-item-array', () => {
      const data = [1];

      expect(getRandomArrayValue(data)).toBeOneOf(data);
    });

    it('should return "undefined" for empty array', () => {
      const data = [];

      expect(getRandomArrayValue(data)).toBe(undefined);
    });
  });

  describe('isItHasAReference', () => {
    it('should return "true" for a value with reference', () => {
      const value = 'Hello {name}!';

      expect(isItHasAReference(value)).toBeTrue();
    });

    it('should return "false" for a value with no reference', () => {
      const value = 'Hello John!';

      expect(isItHasAReference(value)).toBeFalse();
    });
  });

  describe('createPropertyPath', () => {
    it('should return correct path string', () => {
      const root = 'a.v';
      expect(createPropertyPath(root, 'x')).toBe('a.v.x');
    });
    it('should return key if root is not provided', () => {
      const key = 'x';

      expect(createPropertyPath(undefined, key)).toBe(key);
      expect(createPropertyPath(null, key)).toBe(key);
      expect(createPropertyPath('', key)).toBe(key);
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

  describe('setObjectProperty', () => {
    it('should set property value by path', () => {
      const value = 12;
      expect(setObjectProperty({}, 'data', value)).toHaveProperty('data', value);
      expect(setObjectProperty({ data: {} }, 'data.x', value)).toHaveProperty('data.x', value);
      expect(setObjectProperty({ data: {} }, 'data.y', value)).toHaveProperty('data.y', value);
    });

    it('should do nothing if path doesnt exists', () => {
      const obj = {};
      const fakePath = 'prop.name';

      expect(setObjectProperty(obj, fakePath, 12)).toBe(obj);
    });

    it('should return an original value if first argument is not an object', () => {
      const fn = () => null;
      expect(setObjectProperty(null, 'data', 12)).toBe(null);
      expect(setObjectProperty([], 'data', 12)).toStrictEqual([]);
      expect(setObjectProperty([12, 33], 'data', 12)).toStrictEqual([12, 33]);
      expect(setObjectProperty(fn, 'data', 12)).toStrictEqual(fn);
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

    it('should work with couple references in one string', () => {
      const root = {
        name: {
          first: 'Mary',
          last: 'Jane',
        },
      };

      const value = '{name.first} {name.last}';
      const expected = 'Mary Jane';

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

    it('should work with positive boolean types', () => {
      const root = {
        data: {
          isValid: true,
        },
      };

      const value = 'isValid: {data.isValid}';
      const expected = 'isValid: true';

      expect(resolveReference(root, value)).toBe(expected);
    });

    it('should work with negative boolean types', () => {
      const root = {
        data: {
          isValid: false,
        },
      };

      const value = 'isValid: {data.isValid}';
      const expected = 'isValid: false';

      expect(resolveReference(root, value)).toBe(expected);
    });

    it('should work with "null"', () => {
      const root = {
        data: null,
      };

      const value = 'value: {data}';
      const expected = 'value: null';

      expect(resolveReference(root, value)).toBe(expected);
    });
  });

  describe('createPropsByReferences', () => {
    it('should resolve array of references', () => {
      const obj = {
        x: 12,
      };

      const references: ReferencesListType = [
        ['y', 'there is {x}'],
        ['z', 'and here is {x}'],
      ];

      const resolved = createPropsByReferences(obj, references);

      expect(resolved).toHaveProperty('y', 'there is 12');
      expect(resolved).toHaveProperty('z', 'and here is 12');
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

    it('should return nothing for a non existing type', () => {
      const index = 0;
      const nonExistingType = Symbol('type');
      expect(definedTypeResolver(nonExistingType, index)).toBe(undefined);
    });
  });
});
