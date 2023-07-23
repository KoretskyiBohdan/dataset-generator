import {
  isObject,
  isFunction,
  isDefinedType,
  definedTypeResolver,
  getRandomArrayValue,
  isItHasAReference,
  resolveReference,
} from './utils';
import { ShapeType, MapType, AnyFn } from './types';

interface ICreateObjectFromShape {
  <T extends ShapeType>(shape: T, index?: number, ref?: Record<string, any>): MapType<T>;
}
/**
 *
 * @param shape - data source and shape reference
 * @param index - current object index
 * @param ref - reference to the the root object (using when object has a nestled objects)
 * @returns {object}
 */
const createObjectFromShape: ICreateObjectFromShape = (shape, index = 0, ref) => {
  const obj = {};
  // if we are on the top level than root is this level object
  const root = ref || obj;

  Object.keys(shape).forEach((key) => {
    const value = shape[key];
    let resolvedValue = null;

    if (Array.isArray(value)) {
      resolvedValue = getRandomArrayValue(value);

      if (isItHasAReference(resolvedValue)) {
        resolvedValue = resolveReference(root, resolvedValue);
      }
    } else if (isFunction(value)) {
      resolvedValue = (value as AnyFn)();
    } else if (isObject(value)) {
      resolvedValue = createObjectFromShape((shape as object)[key], index, root);
    } else if (isDefinedType(value)) {
      resolvedValue = definedTypeResolver(value as symbol, index);
    }

    obj[key] = resolvedValue;
  });

  return obj as MapType<typeof shape>;
};

export default createObjectFromShape;
