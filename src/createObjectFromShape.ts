import {
  definedTypeResolver,
  getRandomArrayValue,
  isItHasAReference,
  createPropertyPath,
  createPropsByReferences,
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
  // Motivation: JS doesn't guarantee iteration order for objects.
  // Only way to make sure that all properties we have reference to already created
  // is postpone reference resolve after other props will be created
  const references: string[][] = [];

  /**
   * Original shape object could has nested levels, so need to work with it in a recursive way.
   *
   * @param {ShapeType} currentLevelShape - shape on current level
   * @param {object} ref - reference to the root
   * @param {string} pathFromRoot - path from root to the current level
   * @returns {object}
   */
  const recursiveResolver = (currentLevelShape: ShapeType, ref?: AnyObject, pathFromRoot = '') => {
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
          const propPath = createPropertyPath(pathFromRoot, key);
          references.push([propPath, resolvedValue]);
          continue;
        }
      } else if (isFunction(value)) {
        resolvedValue = value(index);
      } else if (isObject(value)) {
        const propPath = createPropertyPath(pathFromRoot, key);
        resolvedValue = recursiveResolver(value as ShapeType, root, propPath);
      } else if (isDefinedType(value)) {
        resolvedValue = definedTypeResolver(value, index);
      }

      currentLevelObj[key] = resolvedValue;
    }

    return currentLevelObj as ResultType<typeof shape>;
  };

  const root = recursiveResolver(shape);

  return createPropsByReferences(root, references);
};

export default createObjectFromShape;
