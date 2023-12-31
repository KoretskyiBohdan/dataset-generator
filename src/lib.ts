import createObjectFromShape from './createObjectFromShape';
import { ShapeType, ResultType } from './types';

export interface ICreate {
  <T extends ShapeType>(shape: T): (count?: number) => ResultType<T>[];
}

export const create: ICreate = (shape) => {
  return (count = 1) => {
    const results: ResultType<typeof shape>[] = [];

    for (let i = 0; i !== count; i++) {
      results.push(createObjectFromShape(shape, i));
    }

    return results;
  };
};
