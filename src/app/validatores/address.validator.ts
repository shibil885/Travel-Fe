import { AbstractControl, ValidationErrors } from '@angular/forms';

export const notValidAddress = (
  control: AbstractControl
): ValidationErrors | null => {
  if (
    control.value !== null &&
    !/^([\dA-Za-z]+(?:\s[\w#/-]+)*),\s*([A-Za-z\s]+),\s*([A-Za-z\s]+),\s*(\d{6})$/.test(
      control.value
    )
  ) {
    return { notValidAddress: true };
  }
  return null;
};
