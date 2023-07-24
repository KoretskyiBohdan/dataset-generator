import { AnyObject, ReferencesListType } from './types';
import { DEFINED, DefinedTypeValue } from './defined';
import { isObject, isString } from './guards';

export const MAX_FLOAT_NUMBER = 10000;
export const REFERENCE_REG_EXP = /{(\S+)}/g;

export const getRandomNumber = (max = Number.MAX_SAFE_INTEGER) => Math.round(Math.random() * max);

export const getRandomFloatNumber = (fraction = 2) => {
  const v = Number((Math.random() * MAX_FLOAT_NUMBER).toFixed(fraction));
  // Sometimes it could generate numbers like 10.00 which is not an integer
  // So need to re run func in this case
  return Number.isInteger(v) ? getRandomFloatNumber(fraction) : v;
};

export const getRandomArrayValue = <T extends any[]>(array: T): T[0] => {
  const index = getRandomNumber(array.length - 1);
  return array[index];
};

export const isItHasAReference = (v: string) => REFERENCE_REG_EXP.test(v);

export const createPropertyPath = (root: string, key: string) => (root ? `${root}.${key}` : key);

/**
 *
 * @param {object} target
 * @param {string} path - path to the value. Should looks like 'property.property.property'
 * @returns {any}
 */
export const getObjectProperty = (target: AnyObject, path = ''): any => {
  if (!isString(path) || !isObject(target)) return;

  const pathArr = path.split('.');
  let prop = target;

  while (pathArr.length) {
    const propName = pathArr.shift();

    prop = prop?.[propName];
  }

  return prop;
};

/**
 * Set value to the property by path
 * @param {object} target
 * @param {string} path - path to the value. Should looks like 'property.property.property'
 * @param {any} value
 * @returns
 */
export const setObjectProperty = (target: AnyObject, path = '', value: any) => {
  if (!isString(path) || !isObject(target)) return target;

  const pathArr = path.split('.');
  let key = pathArr.shift();
  let reference = target;

  while (pathArr.length) {
    reference = reference?.[key];
    key = pathArr.shift();
  }

  if (key && reference) reference[key] = value;

  return target;
};

export const resolveReference = (root: AnyObject, value: string) => {
  return value.replaceAll(REFERENCE_REG_EXP, (_, path) => {
    const resolved = getObjectProperty(root, path);
    return resolved !== undefined ? resolved : _;
  });
};

export const createPropsByReferences = <T>(obj: T, references: ReferencesListType = []): T => {
  for (let i = 0; i < references.length; i++) {
    const [path, value] = references[i];
    const resolved = resolveReference(obj, value);
    setObjectProperty(obj, path, resolved);
  }

  return obj;
};

export const definedTypeResolver = (value: DefinedTypeValue, index: number) => {
  switch (value) {
    case DEFINED.ID:
      return index + 1;
    case DEFINED.DATE_NOW:
      return Date.now();
    case DEFINED.INTEGER:
      return getRandomNumber();
    case DEFINED.FLOAT:
      return getRandomFloatNumber();
    case DEFINED.BOOLEAN:
      return Boolean(getRandomNumber(1));
    default:
      return undefined;
  }
};
