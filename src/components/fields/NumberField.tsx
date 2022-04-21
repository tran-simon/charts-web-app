import GenericField, { GenericFieldProps } from './Field';
import React from 'react';
import { numberOrNull } from '../../utils/utils';

export type NumberFieldProps = GenericFieldProps<number | null>;

export default (props: NumberFieldProps) => {
  return <GenericField convert={numberOrNull} type="number" {...props} />;
};
