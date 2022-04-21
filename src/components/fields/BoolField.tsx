import React, { ReactNode, useContext, useMemo } from 'react';
import {
  FormControlLabel,
  FormControlLabelProps,
  Switch,
  SwitchProps,
} from '@mui/material';
import { FieldProps } from './Field';
import { ChartContext } from '../../providers/ChartProvider';

export type BoolFieldProps = SwitchProps &
  FieldProps<boolean> & {
    label?: ReactNode;
    labelProps?: Partial<FormControlLabelProps>;
    /**
     * The initial state of the switch
     * @default false
     */
    initialValue?: boolean;
  };

export default ({
  onSave = () => {},
  path,
  label,
  initialValue = false,
  labelProps,
  ...switchProps
}: BoolFieldProps) => {
  const { setOption, getOption } = useContext(ChartContext);

  const value = useMemo(() => {
    if (path != null) {
      return !!getOption(path) || initialValue;
    }
    return initialValue;
  }, [getOption, path, initialValue]);

  return (
    <FormControlLabel
      control={
        <Switch
          checked={value}
          onChange={(e) => {
            const checked = !!e.target.checked;
            console.log('ONCHANGE', checked);
            if (path != null) {
              setOption(path, checked);
            }
            onSave(checked);
          }}
          {...switchProps}
        />
      }
      label={label}
      labelPlacement="start"
      {...labelProps}
    />
  );
};
