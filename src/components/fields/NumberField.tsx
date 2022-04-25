import GenericField, { GenericFieldProps } from './Field';
import React from 'react';
import { numberOrNull } from '../../utils/utils';
import { ApexOptions } from 'apexcharts';

export type NumberFieldProps<C extends object> = GenericFieldProps<
  number | null,
  C
>;

export default <C extends object = ApexOptions>(props: NumberFieldProps<C>) => {
  return <GenericField convert={numberOrNull} type="number" {...props} />;
};
