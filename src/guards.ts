import { AnyFn, AnyObject } from './types';
import { DEFINED, DefinedTypeValue } from './defined';

const LIST_OF_DEFINED = Object.keys(DEFINED).map<DefinedTypeValue>((key) => DEFINED[key]);

export const isObject = (v: any): v is AnyObject => {
  return Object.prototype.toString.call(v) === '[object Object]';
};

export const isFunction = (v: any): v is AnyFn => typeof v === 'function';

export const isString = (v: any): v is string => typeof v === 'string';

export const isDefinedType = (v: any): v is DefinedTypeValue => LIST_OF_DEFINED.includes(v);
