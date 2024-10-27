import { AbstractControl, ValidationErrors } from '@angular/forms';

export function descriptionValidator(control: AbstractControl): ValidationErrors | null {
  const descriptionRegex = /^[a-zA-Z0-9\s.,'!?%₹-]{20,500}$/;
  const value = control.value?.trim();  

  if (!value || !descriptionRegex.test(value)) {
    return { invalidDescription: true }; 
  }
  return null;  
}
