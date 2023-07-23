export type ValueType = string | number | boolean;

export type AnyFn = (...args: any[]) => any;

export type ShapeType = {
  [key: string]: ValueType[] | Symbol | ShapeType | AnyFn;
};

export type MapType<Type> = {
  [Property in keyof Type]: Type[Property] extends Array<any>
    ? Type[Property][0]
    : Type[Property] extends Symbol
    ? number
    : Type[Property] extends AnyFn
    ? ReturnType<Type[Property]>
    : Type[Property] extends object
    ? MapType<Type[Property]>
    : any;
};
