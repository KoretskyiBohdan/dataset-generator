import { MAX_FLOAT_NUMBER } from './constants';

export const getRandomNumber = (max = Number.MAX_SAFE_INTEGER) => Math.round(Math.random() * max);

export const getRandomFloatNumber = (fraction = 2) => {
  return Number((Math.random() * MAX_FLOAT_NUMBER).toFixed(fraction));
};

export const isObject = (item: any) => Object.prototype.toString.call(item) === '[object Object]';
