import { MAX_FLOAT_NUMBER, DEFINED } from './constants';

const LIST_OF_DEFINED = Object.keys(DEFINED).map<symbol>((key) => DEFINED[key]);

export const getRandomNumber = (max = Number.MAX_SAFE_INTEGER) => Math.round(Math.random() * max);

export const getRandomFloatNumber = (fraction = 2) => {
  return Number((Math.random() * MAX_FLOAT_NUMBER).toFixed(fraction));
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
