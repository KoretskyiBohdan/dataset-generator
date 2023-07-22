export type ValueType = string | number | boolean;

export type ShapeType = {
  [key: string]: ValueType[];
};

export type MapType<Type> = {
  [Property in keyof Type]: Type[Property] extends Array<any> ? Type[Property][0] : any;
};
