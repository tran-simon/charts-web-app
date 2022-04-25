export type Option<T = any, key extends keyof T = keyof T> =
  | Options<T[key]>
  | OptionField;

/**
 * TODO: dont allow undefined
 *
 * If a child is null, the field won't be rendered.
 */
export type Options<T> = { [key in keyof T]: Option<T, key> | null };

export enum FieldType {
  Bool,
  Text,
  Select,
  Number,
}

/* Option Fields */

export abstract class OptionField {
  private readonly _type: FieldType;

  protected constructor(type: FieldType) {
    this._type = type;
  }

  get type(): FieldType {
    return this._type;
  }
}

export class TextOptionField extends OptionField {
  constructor() {
    super(FieldType.Text);
  }
}

export type SelectOptionType = {
  labelId: string;
  value: string;
};
export type SelectOptions<T extends string> = { [key in T]: SelectOptionType };

export class NumberOptionField extends OptionField {
  constructor() {
    super(FieldType.Number);
  }
}

export class SelectOptionField<T extends string> extends OptionField {
  private readonly _options: SelectOptions<T>;

  constructor(options: SelectOptions<T>) {
    super(FieldType.Select);
    this._options = options;
  }

  get options(): SelectOptions<T> {
    return this._options;
  }
}

export class BoolOptionField extends OptionField {
  constructor() {
    super(FieldType.Bool);
  }
}

export class ArrayOptionField extends OptionField {
  private readonly _options: OptionField;
  /**
   * If true, when rendering the field, an option will be offered to input a singular value
   */
  private readonly _canBeSingular: boolean;

  constructor(options: OptionField, canBeSingular = false) {
    super(options.type);
    this._options = options;
    this._canBeSingular = canBeSingular;
  }

  get options(): OptionField {
    return this._options;
  }

  get canBeSingular(): boolean {
    return this._canBeSingular;
  }
}
