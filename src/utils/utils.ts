import { Dispatch, SetStateAction } from 'react';

export type SetState<T> = Dispatch<SetStateAction<T>>;

/**
 * Get the value as a String if it is valid.
 * Else returns null
 * @param v the value
 */
export const stringOrNull = (v: any) => {
  if (v == null) {
    return null;
  }
  return String(v);
};

export const stringOrEmpty = (v: any) => stringOrNull(v) || '';

/**
 * Returns the number or null if the value is invalid (null, undefined, NaN, infinite)
 */
export const numberOrNull = (value: any): number | null => {
  if (typeof value === 'string' || typeof value === 'boolean') {
    if (value === '') {
      return null;
    }
    value = +value;
  }

  return !(value == null || !isFinite(value)) ? value : null;
};

export type Primitive = string | boolean | number | null;
