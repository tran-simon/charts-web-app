import {
  MenuItem,
  TextField as MTextField,
  TextFieldProps as MTextFieldProps,
} from '@mui/material';
import { FieldProps } from './field';
import { FormattedMessage } from 'react-intl';
import { useContext, useMemo } from 'react';
import { ChartContext } from '../../providers/ChartProvider';
import React from 'react';

export type SelectFieldProps<O extends string> = MTextFieldProps &
  FieldProps<O> & {
    options: O[];
    getOptionLabel?: (o: O) => string;
    initialValue: O;
  };

export default <O extends string>({
  options,
  initialValue,
  getOptionLabel = (v) => v,
  onSave = () => {},
  path,
  ...props
}: SelectFieldProps<O>) => {
  const { setOption, getOption } = useContext(ChartContext);

  const value = useMemo(() => {
    if (path != null) {
      return getOption(path) || initialValue;
    }
    return initialValue;
  }, [getOption, path, initialValue]);

  return (
    <MTextField
      select
      onChange={(e) => {
        const value = e.target.value;
        if (path != null) {
          setOption(path, value);
        }
        onSave(value as any);
      }}
      value={value}
      {...props}
    >
      {options.map((v, i) => (
        <MenuItem key={i} value={v}>
          <FormattedMessage id={getOptionLabel(v)} />
        </MenuItem>
      ))}
    </MTextField>
  );
};
