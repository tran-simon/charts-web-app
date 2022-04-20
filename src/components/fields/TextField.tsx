import { FieldProps } from './field';
import { TextField, TextFieldProps as MTextFieldProps } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { ChartContext } from '../../providers/ChartProvider';
import { stringOrNull } from '../../utils/utils';

export type TextFieldProps = MTextFieldProps & FieldProps<string> & {};

export default ({ path, onSave = () => {}, ...props }: TextFieldProps) => {
  const { setOption, getOption } = useContext(ChartContext);
  const [state, setState] = useState(
    () => (path && stringOrNull(getOption(path))) || '',
  );

  useEffect(() => {
    if (path) {
      setState(stringOrNull(getOption(path)) || '');
    }
  }, [getOption, path]);

  return (
    <TextField
      onChange={(e) => setState(e.target.value as string)}
      onBlur={() => {
        if (path != null) {
          setOption(path, state);
        }
        onSave(state);
      }}
      {...props}
    />
  );
};
