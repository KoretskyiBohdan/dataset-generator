export type ValueType = string | number | boolean;

export type ShapeType = {
  [key: string]: ValueType[] | Symbol | ShapeType;
};

export type MapType<Type> = {
  [Property in keyof Type]: Type[Property] extends Array<any>
    ? Type[Property][0]
    : Type[Property] extends Symbol
    ? number
    : Type[Property] extends object
    ? MapType<Type[Property]>
    : any;
};
