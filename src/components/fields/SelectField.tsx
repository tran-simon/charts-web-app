import {
  Autocomplete,
  AutocompleteProps,
  AutocompleteValue,
  TextField as MTextField,
} from '@mui/material';
import { FieldProps } from './Field';
import { ReactNode, useContext, useMemo } from 'react';
import React from 'react';
import { PartialBy, stringOrNull, useIntlFormatter } from '../../utils/utils';
import { SelectOptions, SelectOptionType } from '../../model/optionModel';

export type SelectFieldProps<
  T extends string,
  C extends object,
  DisableClearable extends boolean | undefined = undefined,
> = Omit<
  PartialBy<
    AutocompleteProps<SelectOptionType, false, DisableClearable, false>,
    'renderInput'
  >,
  'options'
> &
  FieldProps<T | undefined, C> & {
    label?: ReactNode;
    options: SelectOptions<T>;

    /**
     * Value to fall back to if it could not be obtained from the context and if disableClearable is set to true.
     *
     * If disableClearable is set to false, the fallbackValue is null
     */
    fallbackValue?: AutocompleteValue<
      SelectOptionType,
      false,
      DisableClearable,
      false
    >;
  };

export default <
  T extends string,
  C extends object,
  DisableClearable extends boolean | undefined = undefined,
>({
  onSave = () => {},
  path,
  Context,
  options,
  label,
  fallbackValue = null as AutocompleteValue<
    SelectOptionType,
    false,
    DisableClearable,
    false
  >,
  ...props
}: SelectFieldProps<T, C, DisableClearable>) => {
  const t = useIntlFormatter();
  const { setOption, getOption } = useContext(Context);

  const value = useMemo<T | undefined>(() => {
    return (path && (stringOrNull(getOption(path)) as T | null)) || undefined;
  }, [path, getOption]);

  return (
    <Autocomplete<SelectOptionType, false, DisableClearable, false>
      renderInput={(params) => <MTextField label={label} {...params} />}
      getOptionLabel={(option) => t(option.labelId)}
      value={(value && options[value]) ?? fallbackValue}
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
