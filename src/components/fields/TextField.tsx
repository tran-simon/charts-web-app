import GenericField, { GenericFieldProps } from './Field';
import React from 'react';
import { ApexOptions } from 'apexcharts';

export type TextFieldProps<C extends object> = GenericFieldProps<string, C>;

export default <C extends object = ApexOptions>(props: TextFieldProps<C>) => (
  <GenericField {...props} />
);
