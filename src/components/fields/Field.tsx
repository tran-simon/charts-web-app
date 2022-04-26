import { Path, SetState, stringOrEmpty } from '../../utils/utils';
import {
  IconButton,
  InputAdornment,
  TextField as MTextField,
  StandardTextFieldProps as MTextFieldProps,
} from '@mui/material';
import { WithContext } from '../../providers/ChartProviders';
import React, {
  ComponentType,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import debounce from 'lodash/debounce';
import noop from 'lodash/noop';
import ClearIcon from '@mui/icons-material/Clear';

export type FieldProps<T, C extends object> = WithContext<C> & {
  onSave?: SetState<T>;

  /**
   * If provided, it will be used to obtain and set the value from ChartContext
   */
  path?: Path;
};

export type GenericFieldProps<T, C extends object> = MTextFieldProps &
  FieldProps<T, C> & {
    /**
     * Component used to render the field
     * @default mui TextField
     */
    Comp?: ComponentType<MTextFieldProps>;

    /**
     * Converts from the internal string state to T.
     * Used to call onSave
     *
     * @param stringValue The internal state value
     * @default By default, no conversion is done.
     */
    convert?: (stringValue: string | undefined) => T;

    /**
     * Converts the value fetched from the context to a string
     * @param value The primitive value from the context (if path is defined)
     * @default stringOrEmpty
     */
    convertToString?: (value: unknown) => string;

    /**
     * amount of time to wait in ms before calling onSave and updating the context
     * @default 500
     */
    debounceTimeout?: number;

    disableClearable?: boolean;
  };

const defaultConvert = (v: string | undefined) => v as any;

const GenericField = <T, C extends object>({
  path,
  onSave = noop,
  Comp = MTextField,
  convert = defaultConvert,
  convertToString = stringOrEmpty,
  debounceTimeout = 500,
  Context,
  disableClearable,
  ...props
}: GenericFieldProps<T, C>) => {
  const { setOption, getOption } = useContext(Context);
  const [state, setState] = useState<string>(() => {
    return (path && convertToString(getOption(path))) || '';
  });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (path) {
      setState(convertToString(getOption(path)) || '');
    }
  }, [getOption, path, setState, convertToString]);

  const confirm = useMemo(() => {
    return debounce((state: string | undefined) => {
      const value = convert(state);
      if (path != null) {
        setOption(path, value);
      }
      onSave(value);
    }, debounceTimeout);
  }, [convert, debounceTimeout, path, setOption, onSave]);

  return (
    <Comp
      onChange={(e) => {
        const v = e.target.value as string;
        setState(v);
        confirm(v);
      }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onBlur={confirm.flush}
      value={state}
      {...props}
      InputProps={{
        ...props.InputProps,
        endAdornment:
          !disableClearable && hovering && state ? (
            <InputAdornment position={'end'}>
              <IconButton
                size="small"
                onClick={() => {
                  confirm(undefined);
                  confirm.flush();
                }}
              >
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ) : null,
      }}
    />
  );
};

export default GenericField;
