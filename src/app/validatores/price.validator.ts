import { AbstractControl, ValidationErrors } from '@angular/forms';

export function priceValidator(control: AbstractControl): ValidationErrors | null {
  const price = control.value;

  if (price === null || price === undefined || isNaN(price) || price <= 0 ) {
    return { invalidPrice: true };
  }
  return null;
}
