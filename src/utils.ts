import { AnyObject } from './types';
import { MAX_FLOAT_NUMBER, DEFINED, REFERENCE_REG_EXP } from './constants';

const LIST_OF_DEFINED = Object.keys(DEFINED).map<symbol>((key) => DEFINED[key]);

export const getRandomNumber = (max = Number.MAX_SAFE_INTEGER) => Math.round(Math.random() * max);

export const getRandomFloatNumber = (fraction = 2) => {
  return Number((Math.random() * MAX_FLOAT_NUMBER).toFixed(fraction));
};

export const getObjectProperty = (obj: AnyObject, path = ''): any => {
  const pathArr = path.split('.');

  let result = obj;

  while (pathArr.length) {
    const propName = pathArr.shift();

    result = result?.[propName];
  }

  return result;
};

interface IGetRandomArrayValue {
  <T extends any[]>(array: T): T[0];
}

export const getRandomArrayValue: IGetRandomArrayValue = (array) => {
  const index = getRandomNumber(array.length - 1);
  return array[index];
};

export const isObject = (item: any) => Object.prototype.toString.call(item) === '[object Object]';

export const isFunction = (item: any) => typeof item === 'function';

export const isDefinedType = (value: any) => LIST_OF_DEFINED.includes(value);

export const isItHasAReference = (value: any) =>
  typeof value === 'string' && REFERENCE_REG_EXP.test(value);

export const resolveReference = (root: AnyObject, value: string) => {
  return value.replaceAll(REFERENCE_REG_EXP, (_, path) => getObjectProperty(root, path));
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
