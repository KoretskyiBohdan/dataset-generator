import { isObject, isFunction, isString, isDefinedType } from './guards';
import { DEFINED } from './constants';

describe('guards.ts', () => {
  describe('isObject', () => {
    it('should detects an object', () => {
      expect(isObject({})).toBeTrue();
    });

    it('should returns "false" for not an object', () => {
      expect(isObject(null)).toBeFalse();
      expect(isObject(undefined)).toBeFalse();
      expect(isObject([])).toBeFalse();
      expect(isObject(() => null)).toBeFalse();
      expect(isObject(1)).toBeFalse();
      expect(isObject('string')).toBeFalse();
      expect(isObject(NaN)).toBeFalse();
      expect(isObject(true)).toBeFalse();
    });
  });

  describe('isFunction', () => {
    it('should returns "true" for any kind of functions', () => {
      const caseA = () => null;
      const caseB = function () {};
      function caseC() {}

      expect(isFunction(caseA)).toBeTrue();
      expect(isFunction(caseB)).toBeTrue();
      expect(isFunction(caseC)).toBeTrue();
    });

    it('should returns "false" for not a function', () => {
      expect(isFunction({})).toBeFalse();
      expect(isFunction([])).toBeFalse();
      expect(isFunction(1)).toBeFalse();
      expect(isFunction('string')).toBeFalse();
    });
  });

  describe('isString', () => {
    it('should detects a string', () => {
      expect(isString('string')).toBeTrue();
    });

    it('should returns "false" for not a string', () => {
      expect(isString(1)).toBeFalse();
      expect(isString([])).toBeFalse();
      expect(isString({})).toBeFalse();
      expect(isString(() => null)).toBeFalse();
    });
  });

  describe('isDefinedType', () => {
    it('should detects defined type', () => {
      expect(isDefinedType(DEFINED.ID)).toBeTrue();
    });
    it('should returns "false" for not defined type', () => {
      const notDefined = Symbol('not');

      expect(isDefinedType(notDefined)).toBeFalse();
    });
  });
});
