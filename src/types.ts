export type ValueType = string | number | boolean;

export type AnyFn = (...args: any[]) => any;

export type AnyObject = Record<string, any>;

export type ShapeType = {
  [key: string]: ValueType[] | Symbol | ShapeType | AnyFn;
};

export type ReferencesListType = [path: string, value: string][];

export type ResultType<Type> = {
  [Property in keyof Type]: Type[Property] extends Array<any>
    ? Type[Property][0]
    : Type[Property] extends Symbol
    ? number
    : Type[Property] extends AnyFn
    ? ReturnType<Type[Property]>
    : Type[Property] extends object
    ? ResultType<Type[Property]>
    : any;
};
