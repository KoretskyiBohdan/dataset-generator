import { getRandomNumber, getRandomFloatNumber } from './utils';
import { ShapeType, MapType } from './types';
import { DEFINED } from './constants';

interface ICreateObjectFromShape {
  <T extends ShapeType>(shape: T, index?: number): MapType<T>;
}

const createObjectFromShape: ICreateObjectFromShape = (shape, index = 0) => {
  const obj = {};

  Object.keys(shape).map((key) => {
    const values = shape[key];

    let resolvedValue = null;

    if (Array.isArray(values)) {
      const index = getRandomNumber(values.length - 1);
      resolvedValue = values[index];
    }

    if (values === DEFINED.ID) {
      // index starts from zero
      resolvedValue = index + 1;
    }
    if (values === DEFINED.DATE_NOW) {
      resolvedValue = Date.now();
    }

    if (values === DEFINED.RANDOM_INTEGER) {
      resolvedValue = getRandomNumber();
    }

    if (values === DEFINED.RANDOM_FLOAT) {
      resolvedValue = getRandomFloatNumber();
    }

    obj[key] = resolvedValue;
  });

  return obj as MapType<typeof shape>;
};

export default createObjectFromShape;
