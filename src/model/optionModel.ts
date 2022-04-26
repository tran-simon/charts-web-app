import { TextFieldProps } from '../components/fields/TextField';
import { NumberFieldProps } from '../components/fields/NumberField';
import { SelectFieldProps } from '../components/fields/SelectField';
import { BoolFieldProps } from '../components/fields/BoolField';

export type Option<T = any, key extends keyof T = keyof T> =
  | Options<T[key]>
  | OptionField<any>;

/**
 * TODO: dont allow undefined
 *
 * If a child is null, the field won't be rendered.
 */
export type Options<T> = { [key in keyof T]: Option<T, key> | null };

/* Option Fields */

export enum FieldType {
  Bool,
  Text,
  Select,
  Number,
}

export abstract class OptionField<P = undefined> {
  private readonly _type: FieldType;
  private readonly _fieldProps: Partial<P> | undefined;

  protected constructor(type: FieldType, fieldProps?: Partial<P>) {
    this._type = type;
    this._fieldProps = fieldProps;
  }

  get type(): FieldType {
    return this._type;
  }

  get fieldProps(): Partial<P> | undefined {
    return this._fieldProps;
  }
}

export class TextOptionField<C extends object> extends OptionField<
  TextFieldProps<C>
> {
  constructor(fieldProps?: Partial<TextFieldProps<C>>) {
    super(FieldType.Text, fieldProps);
  }
}

export type SelectOptionType = {
  labelId: string;
  value: string;
};
export type SelectOptions<T extends string> = { [key in T]: SelectOptionType };

export class NumberOptionField<C extends object> extends OptionField<
  NumberFieldProps<C>
> {
  constructor(fieldProps?: Partial<NumberFieldProps<C>>) {
    super(FieldType.Number, fieldProps);
  }
}

export class SelectOptionField<
  T extends string,
  C extends object,
  DisableClearable extends boolean | undefined = undefined,
> extends OptionField<SelectFieldProps<T, C, DisableClearable>> {
  private readonly _options: SelectOptions<T>;

  constructor(
    options: SelectOptions<T>,
    fieldProps?: Partial<SelectFieldProps<T, C, DisableClearable>>,
  ) {
    super(FieldType.Select, fieldProps);
    this._options = options;
  }

  get options(): SelectOptions<T> {
    return this._options;
  }
}

export class BoolOptionField<C extends object> extends OptionField<
  BoolFieldProps<C>
> {
  constructor(fieldProps?: Partial<BoolFieldProps<C>>) {
    super(FieldType.Bool, fieldProps);
  }
}

export class ListOptionField<P> extends OptionField<P> {
  private readonly _field: OptionField<P>;
  /**
   * If true, when rendering the field, an option will be offered to input a singular value
   */
  private readonly _canBeSingular: boolean;

  constructor(field: OptionField<P>, canBeSingular = false) {
    super(field.type);
    this._field = field;
    this._canBeSingular = canBeSingular;
  }

  get field(): OptionField<P> {
    return this._field;
  }

  get canBeSingular(): boolean {
    return this._canBeSingular;
  }
}
