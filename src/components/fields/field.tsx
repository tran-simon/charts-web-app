import { SetState } from '../../utils/utils';

export type FieldProps<T> = {
  onSave?: SetState<T>;

  /**
   * If provided, it will be used to obtain and set the value from ChartContext
   */
  path?: string[];
};

//select field: save on change
//text field: debounce, save 2 secs after last change
//num text field: debounce, save 2 secs after last change

//validate on save
