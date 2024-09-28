import { AbstractControl, ValidationErrors } from '@angular/forms';

export function countryValidator(control: AbstractControl): ValidationErrors | null {
  const countryRegex = /^[a-zA-ZÀ-ÿ\s'-]{2,50}$/;
  const value = control.value?.trim();  

  if (!value || !countryRegex.test(value)) {
    return { invalidCountry: true }; 
  }
  return null; 
}
