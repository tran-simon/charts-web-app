import GenericField, { GenericFieldProps } from './Field';
import React from 'react';

export type TextFieldProps = GenericFieldProps<string>;

export default (props: TextFieldProps) => <GenericField {...props} />;
