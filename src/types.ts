export type ValueType = string | number | boolean;

export type ShapeType = {
  [key: string]: ValueType[] | Symbol;
};

export type MapType<Type> = {
  [Property in keyof Type]: Type[Property] extends Array<any>
    ? Type[Property][0]
    : Type[Property] extends Symbol
    ? number
    : any;
};
