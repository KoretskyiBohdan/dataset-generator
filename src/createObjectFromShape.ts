import {
  definedTypeResolver,
  getRandomArrayValue,
  isItHasAReference,
  resolveReference,
} from './utils';
import { isFunction, isString, isObject, isDefinedType } from './guards';
import { ShapeType, ResultType, AnyObject } from './types';

interface ICreateObjectFromShape {
  <T extends ShapeType>(shape: T, index?: number, ref?: AnyObject): ResultType<T>;
}
/**
 *
 * @param shape - data source and shape reference
 * @param index - current object index
 * @param ref - reference to the the root object (using when object has a nestled objects)
 * @returns {object}
 */
const createObjectFromShape: ICreateObjectFromShape = (shape, index = 0, ref) => {
  const obj: AnyObject = {};
  // if we are on the top level than root is this level object
  const root = ref || obj;

  for (const key in shape) {
    if (!Object.hasOwn(shape, key)) continue;

    const value = shape[key];
    let resolvedValue = null;

    if (Array.isArray(value)) {
      resolvedValue = getRandomArrayValue(value);

      if (isString(resolvedValue) && isItHasAReference(resolvedValue)) {
        resolvedValue = resolveReference(root, resolvedValue);
      }
    } else if (isFunction(value)) {
      resolvedValue = value(index);
    } else if (isObject(value)) {
      resolvedValue = createObjectFromShape(value, index, root);
    } else if (isDefinedType(value)) {
      resolvedValue = definedTypeResolver(value, index);
    }

    obj[key] = resolvedValue;
  }

  return obj as ResultType<typeof shape>;
};

export default createObjectFromShape;
