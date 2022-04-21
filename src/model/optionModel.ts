export type Option<T = any, key extends keyof T = keyof T> =
  | Options<T[key]>
  | OptionField<T[key]>;

/**
 * TODO: dont allow undefined
 *
 * If a child is null, the field won't be rendered.
 */
export type Options<T> = { [key in keyof T]: Option<T, key> | null };

/* Option Fields */

export abstract class OptionField<T> {
  private readonly _initialValue?: T;

  protected constructor(initialValue?: T) {
    this._initialValue = initialValue;
  }

  get initialValue(): T | undefined {
    return this._initialValue;
  }
}

export class TextOptionField extends OptionField<string> {
  constructor(initialValue = '') {
    super(initialValue);
  }
}

type OptionType<O extends string> = {
  [key in O]: string;
};

export class NumberOptionField extends OptionField<number> {
  constructor(initialValue?: number) {
    super(initialValue);
  }
}

export class SelectOptionField<T extends string> extends OptionField<T> {
  private readonly _options: OptionType<T>;

  constructor(options: OptionType<T>, initialValue: T) {
    super(initialValue);
    this._options = options;
  }

  get options(): OptionType<T> {
    return this._options;
  }
}

export class BoolOptionField extends OptionField<boolean> {
  constructor(initialValue?: boolean) {
    super(initialValue);
  }
}

export class ArrayOptionField<
  T,
  B = Options<T> | OptionField<T>,
> extends OptionField<T[]> {
  private readonly _options: B;

  constructor(options: B, initialValue?: T[]) {
    super(initialValue);
    this._options = options;
  }

  get options(): B {
    return this._options;
  }
}
