export const DEFINED = {
  ID: '__ID__',
  DATE_NOW: '__DATE_NOW__',
  INTEGER: '__INTEGER__',
  FLOAT: '__FLOAT__',
  BOOLEAN: '__BOOLEAN__',
} as const;

// Use values as a type
export type DefinedTypeValue = (typeof DEFINED)[keyof typeof DEFINED];

// Helper to resolve differen return type based on provided value
// everythign that not a "DEFINED.BOOLEAN" returns number (for now)
export type ResultDefinedType<T> = T extends typeof DEFINED.BOOLEAN ? boolean : number;
