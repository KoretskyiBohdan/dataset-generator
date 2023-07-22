import { getRandomNumber } from './utils';
import { ShapeType, MapType } from './types';

interface ICreateObjectFromShape {
  <T = ShapeType>(shape: T): MapType<T>;
}

const createObjectFromShape: ICreateObjectFromShape = (shape) => {
  const obj = {};

  Object.keys(shape).map((key) => {
    const values = shape[key];
    const index = getRandomNumber(values.length - 1);
    const value = values[index];

    obj[key] = value;
  });

  return obj as MapType<typeof shape>;
};

export default createObjectFromShape;
