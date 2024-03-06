import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'

export const customYValueValidator: ValidatorFn = (control: AbstractControl<string>): ValidationErrors | null => {
  let data: number = parseFloat(control.value)

  if (!!data && data > -3 && data < 3)
    return null

  return { invalidYPropertyValue: true }
}
