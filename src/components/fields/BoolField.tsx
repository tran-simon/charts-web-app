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

    fullWidth?: boolean;
  };

export default ({
  onSave = () => {},
  path,
  label,
  initialValue = false,
  labelProps,
  fullWidth,
  style = {},
  ...switchProps
}: BoolFieldProps) => {
  const { setOption, getOption } = useContext(ChartContext);

  const value = useMemo(() => {
    if (path != null) {
      return !!getOption(path) || initialValue;
    }
    return initialValue;
  }, [getOption, path, initialValue]);

  if (fullWidth) {
    style.width = '100%';
    style.justifyContent = 'space-between';
    style.marginRight = '0px';
  }

  return (
    <FormControlLabel
      control={
        <Switch
          checked={value}
          onChange={(e) => {
            const checked = !!e.target.checked;
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
      style={style}
      {...labelProps}
    />
  );
};
