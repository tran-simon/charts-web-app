import { Dispatch, SetStateAction, useCallback } from 'react';
import { IntlShape, useIntl } from 'react-intl';

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

export type Primitive = string | boolean | number | null | undefined;

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
