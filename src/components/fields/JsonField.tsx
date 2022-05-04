import GenericField, { GenericFieldProps } from './Field';
import { WithContext } from '../../providers/ChartProviders';
import React from 'react';

export type JsonFieldProps<T, C extends object> = WithContext<C> &
  GenericFieldProps<T, C> & {};

export default <T, C extends object>({ ...props }: JsonFieldProps<T, C>) => {
  return (
    <GenericField
      path={[]}
      convert={(v) => {
        if (v == null) {
          return {} as T;
        }
        // TODO(https://github.com/tran-simon/charts-web-app/issues/4): implement validation

        return JSON.parse(v);
      }}
      convertToString={(v) => {
        return JSON.stringify(v, undefined, 2);
      }}
      multiline
      disableClearable
      {...props}
    />
  );
};
