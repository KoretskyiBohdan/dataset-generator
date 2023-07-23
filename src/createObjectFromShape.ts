import {
  isObject,
  isFunction,
  isDefinedType,
  definedTypeResolver,
  getRandomArrayValue,
} from './utils';
import { ShapeType, MapType, AnyFn } from './types';

interface ICreateObjectFromShape {
  <T extends ShapeType>(shape: T, index?: number): MapType<T>;
}
/**
 *
 * @param shape - data source and shae reference
 * @param index - current object index
 * @returns
 */
const createObjectFromShape: ICreateObjectFromShape = (shape, index = 0) => {
  const obj = {};

  Object.keys(shape).forEach((key) => {
    const value = shape[key];
    let resolvedValue = null;

    if (Array.isArray(value)) {
      resolvedValue = getRandomArrayValue(value);
    } else if (isFunction(value)) {
      resolvedValue = (value as AnyFn)();
    } else if (isObject(value)) {
      resolvedValue = createObjectFromShape((shape as object)[key], index);
    } else if (isDefinedType(value)) {
      resolvedValue = definedTypeResolver(value as symbol, index);
    }

    obj[key] = resolvedValue;
  });

  return obj as MapType<typeof shape>;
};

export default createObjectFromShape;
