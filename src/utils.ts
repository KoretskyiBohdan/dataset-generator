import { AnyObject } from './types';
import { MAX_FLOAT_NUMBER, DEFINED, REFERENCE_REG_EXP } from './constants';
import { isString } from './guards';

export const getRandomNumber = (max = Number.MAX_SAFE_INTEGER) => Math.round(Math.random() * max);

export const getRandomFloatNumber = (fraction = 2) => {
  const v = Number((Math.random() * MAX_FLOAT_NUMBER).toFixed(fraction));
  // Sometimes it could generate numbers like 10.00 which is integer
  return Number.isInteger(v) ? getRandomFloatNumber(fraction) : v;
};

export const getRandomArrayValue = <T extends any[]>(array: T): T[0] => {
  const index = getRandomNumber(array.length - 1);
  return array[index];
};

export const isItHasAReference = (v: string) => REFERENCE_REG_EXP.test(v);

/**
 *
 * @param obj {object}
 * @param path - path to the ptoperty. Should looks like 'property.property.property'
 * @returns {any}
 */
export const getObjectProperty = (obj: AnyObject, path = ''): any => {
  if (!isString(path)) return;

  const pathArr = path.split('.');
  let result = obj;

  while (pathArr.length) {
    const propName = pathArr.shift();

    result = result?.[propName];
  }

  return result;
};

export const resolveReference = (root: AnyObject, value: string) => {
  return value.replaceAll(REFERENCE_REG_EXP, (_, path) => {
    const resolved = getObjectProperty(root, path);
    return resolved !== undefined ? resolved : _;
  });
};

export const definedTypeResolver = (value: symbol, index: number) => {
  switch (value) {
    case DEFINED.ID:
      return index + 1;
    case DEFINED.DATE_NOW:
      return Date.now();
    case DEFINED.RANDOM_INTEGER:
      return getRandomNumber();
    case DEFINED.RANDOM_FLOAT:
      return getRandomFloatNumber();
    default:
      return undefined;
  }
};
