import { Primitive, SetState, stringOrEmpty } from '../../utils/utils';
import {
  TextField as MTextField,
  TextFieldProps as MTextFieldProps,
} from '@mui/material';
import { ChartContext } from '../../providers/ChartProvider';
import React, {
  ComponentType,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import debounce from 'lodash/debounce';

export type FieldProps<T> = {
  onSave?: SetState<T>;

  /**
   * If provided, it will be used to obtain and set the value from ChartContext
   */
  path?: string[];
};

export type GenericFieldProps<T extends Primitive> = MTextFieldProps &
  FieldProps<T> & {
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
    convert?: (stringValue: string) => T;

    /**
     * Converts the value fetched from the context to a string
     * @param value The primitive value from the context (if path is defined)
     * @default stringOrEmpty
     */
    convertToString?: (value: Primitive | undefined) => string;

    /**
     * amount of time to wait in ms before calling onSave and updating the context
     * @default 500
     */
    debounceTimeout?: number;
  };

const GenericField = <T extends Primitive>({
  path,
  onSave = () => {},
  Comp = MTextField,
  convert = (v) => v as any,
  convertToString = stringOrEmpty,
  debounceTimeout = 500,
  ...props
}: GenericFieldProps<T>) => {
  const { setOption, getOption } = useContext(ChartContext);
  const [, setState] = useState<string>(() => {
    return (path && convertToString(getOption(path))) || '';
  });

  useEffect(() => {
    if (path) {
      setState(stringOrEmpty(getOption(path)));
    }
  }, [getOption, path]);

  const confirm = useRef(
    debounce((state: string) => {
      const value = convert(state);
      if (path != null) {
        setOption(path, value);
      }
      onSave(value);
    }, debounceTimeout),
  ).current;

  return (
    <Comp
      onChange={(e) => {
        const v = e.target.value as string;
        setState(v);
        confirm(v);
      }}
      onBlur={confirm.flush}
      {...props}
    />
  );
};

export default GenericField;
