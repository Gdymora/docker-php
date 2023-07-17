import { ValidatorFn } from '@angular/forms';

export interface FieldConfig {
  disabled?: boolean,
  label?: string,
  name: string,
  options?: string[],
  class_field?: string[],
  placeholder?: string,
  type: string,
  validation?: ValidatorFn[],
  value?: any,
  color?: string
}
