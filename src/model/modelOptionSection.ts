import { ModelOptionField } from './modelOptionField';

export type Option<T = any, key extends keyof T = keyof T> =
  | ModelOptionSection<T[key]>
  | ModelOptionField;
export type Options<T> = { [key in keyof T]-?: Option<T, key> };

export abstract class ModelOptionEl {
  private readonly _nameId: string;

  protected constructor(nameId: string) {
    this._nameId = nameId;
  }

  get nameId(): string {
    return this._nameId;
  }
}

export class ModelOptionSection<T> extends ModelOptionEl {
  private readonly _options: Options<T>;

  constructor(nameId: string, options: Options<T>) {
    super(nameId);
    this._options = options;
  }

  get options(): Options<T> {
    return this._options;
  }
}
