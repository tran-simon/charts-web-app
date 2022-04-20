import { ModelOptionEl } from './modelOptionSection';

export abstract class ModelOptionField extends ModelOptionEl {
  protected constructor(nameId: string) {
    super(nameId);
  }
}

export class OptionFieldText extends ModelOptionField {
  constructor(nameId: string) {
    super(nameId);
  }
}

type OptionType<O extends string> = {
  [key in O]: string;
};

export class OptionFieldSelect<O extends string> extends ModelOptionField {
  private readonly _options: OptionType<O>;
  private readonly _initialValue: O;

  constructor(nameId: string, options: OptionType<O>, initialValue: O) {
    super(nameId);
    this._options = options;
    this._initialValue = initialValue;
  }

  get options(): OptionType<O> {
    return this._options;
  }

  get initialValue(): O {
    return this._initialValue;
  }
}

export class OptionFieldBool extends ModelOptionField {
  constructor(nameId: string) {
    super(nameId);
  }
}
