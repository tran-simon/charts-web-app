import React, { CSSProperties, ReactNode, useContext, useMemo } from 'react';
import {
  FormControlLabel,
  FormControlLabelProps,
  Switch,
  SwitchProps,
} from '@mui/material';
import { FieldProps } from './Field';
import { ApexOptions } from 'apexcharts';

export type BoolFieldProps<C extends object> = SwitchProps &
  FieldProps<boolean, C> & {
    label?: ReactNode;
    labelProps?: Partial<FormControlLabelProps>;
    /**
     * The initial state of the switch
     * @default false
     */
    initialValue?: boolean;

    fullWidth?: boolean;
  };

export const fullWidthSwitchStyle: CSSProperties = {
  width: '100%',
  justifyContent: 'space-between',
  marginRight: '0px',
};

export default <C extends object = ApexOptions>({
  onSave = () => {},
  path,
  label,
  initialValue = false,
  labelProps,
  fullWidth,
  style = {},
  Context,
  ...switchProps
}: BoolFieldProps<C>) => {
  const { setOption, getOption } = useContext(Context);

  const value = useMemo(() => {
    if (path != null) {
      return !!getOption(path) || initialValue;
    }
    return initialValue;
  }, [getOption, path, initialValue]);

  if (fullWidth) {
    style = {
      ...style,
      ...fullWidthSwitchStyle,
    };
  }

  return (
    <FormControlLabel
      control={
        <Switch
          checked={value}
          onChange={(e) => {
            const checked = e.target.checked;
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
