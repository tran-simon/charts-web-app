import {
  Autocomplete,
  AutocompleteProps,
  TextField as MTextField,
} from '@mui/material';
import { FieldProps } from './Field';
import { ReactNode, useContext, useMemo } from 'react';
import React from 'react';
import { PartialBy, stringOrNull, useIntlFormatter } from '../../utils/utils';
import { SelectOptions, SelectOptionType } from '../../model/optionModel';

export type SelectFieldProps<T extends string, C extends object> = Omit<
  PartialBy<
    AutocompleteProps<SelectOptionType, false, false, false>,
    'renderInput'
  >,
  'options'
> &
  FieldProps<T | undefined, C> & {
    label: ReactNode;
    options: SelectOptions<T>;
  };

export default <T extends string, C extends object>({
  onSave = () => {},
  path,
  Context,
  options,
  label,
  ...props
}: SelectFieldProps<T, C>) => {
  const t = useIntlFormatter();
  const { setOption, getOption } = useContext(Context);

  const value = useMemo<T | undefined>(() => {
    return (path && (stringOrNull(getOption(path)) as T | null)) || undefined;
  }, [path, getOption]);

  return (
    <Autocomplete<SelectOptionType, false, false, false>
      renderInput={(params) => <MTextField label={label} {...params} />}
      getOptionLabel={(option) => t(option.labelId)}
      value={(value && options[value]) ?? null}
      onChange={(e, newValue) => {
        const value = (newValue?.value as T | undefined) ?? undefined;
        if (path != null) {
          setOption(path, value);
        }
        onSave(value);
      }}
      options={Object.values(options)}
      {...props}
    />
  );
};
