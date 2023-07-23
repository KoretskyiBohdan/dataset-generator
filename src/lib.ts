import createObjectFromShape from './createObjectFromShape';
import { ShapeType, MapType } from './types';

export interface ICreate {
  <T extends ShapeType>(shape: T): (count?: number) => MapType<T>[];
}

export const create: ICreate = (shape) => {
  return (count = 1) => {
    const results: MapType<typeof shape>[] = [];

    for (let i = 0; i !== count; i++) {
      results.push(createObjectFromShape(shape, i));
    }

    return results;
  };
};
