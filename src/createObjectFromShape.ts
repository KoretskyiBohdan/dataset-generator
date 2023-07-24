import {
  definedTypeResolver,
  getRandomArrayValue,
  isItHasAReference,
  resolveReference,
} from './utils';
import { isFunction, isString, isObject, isDefinedType } from './guards';
import { ShapeType, ResultType, AnyObject } from './types';

interface ICreateObjectFromShape {
  <T extends ShapeType>(shape: T, index?: number): ResultType<T>;
}
/**
 *
 * @param shape - data source and shape reference
 * @param index - current object index
 * @returns {object}
 */
const createObjectFromShape: ICreateObjectFromShape = (shape, index = 0) => {
  // "shape" object can have nested levels, so need to use recursive resolver
  const recursiveResolver = (currentLevelShape: ShapeType, ref?: AnyObject) => {
    const currentLevelObj = {};
    // if we are on the top level than root is this level object
    const root = ref || currentLevelObj;

    for (const key in currentLevelShape) {
      if (!Object.hasOwn(currentLevelShape, key)) continue;

      const value = currentLevelShape[key];
      let resolvedValue = null;

      if (Array.isArray(value)) {
        resolvedValue = getRandomArrayValue(value);

        if (isString(resolvedValue) && isItHasAReference(resolvedValue)) {
          resolvedValue = resolveReference(root, resolvedValue);
        }
      } else if (isFunction(value)) {
        resolvedValue = value(index);
      } else if (isObject(value)) {
        resolvedValue = recursiveResolver(value, root);
      } else if (isDefinedType(value)) {
        resolvedValue = definedTypeResolver(value, index);
      }

      currentLevelObj[key] = resolvedValue;
    }

    return currentLevelObj as ResultType<typeof shape>;
  };

  return recursiveResolver(shape);
};

export default createObjectFromShape;
