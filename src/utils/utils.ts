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
