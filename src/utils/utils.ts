import { Dispatch, SetStateAction, useCallback } from 'react';
import { IntlShape, useIntl } from 'react-intl';

export type SetState<T> = Dispatch<SetStateAction<T>>;
export type UseState<S> = [S, Dispatch<SetStateAction<S>>];
export type Primitive = string | boolean | number | null | undefined;
export type Path = ReadonlyArray<string | number | symbol>;
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

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

export const useIntlFormatter = (): {
  (id: string, values?: Record<string, Primitive>): string;
} & IntlShape => {
  const intl = useIntl();

  const fn = useCallback(
    (id: string, values?: Record<string, Primitive>) =>
      intl.formatMessage({ id }, values),
    [intl],
  );

  Object.assign(fn, intl);
  return fn as any;
};

/**
 * Extract a labelId to use with react-intl by taking the path, filtering out
 * non-string values and joining with dots.
 *
 * @param path The path ex: ['path', 1, 'to', 'location']
 * @param prefix Prefix for the resulting id
 * @return a string in the format 'path.to.location'
 */
export const getLabelIdFromPath = (path: Path, prefix?: string) => {
  const newPath = [...path];
  if (prefix != null) {
    newPath.unshift(prefix);
  }

  return newPath.filter((v) => typeof v === 'string').join('.');
};
