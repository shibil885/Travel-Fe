import { AbstractControl, ValidationErrors } from "@angular/forms";

export const invalidPhone = (control: AbstractControl): ValidationErrors | null =>{
    if (control.value !== null && !(/^\+?[0-9]{1,4}[-\s]?[0-9]{6,10}$/).test(control.value)) {
        return { invalidPhone: true}
    }
    return null
}

export function numberOfPeopleValidator(control: AbstractControl): ValidationErrors | null {
  const peopleRegex = /^[1-9][0-9]*$/;
  const value = control.value?.toString().trim();  

  if (!value || !peopleRegex.test(value)) {
    return { invalidNumberOfPeople: true }; 
  }
  return null; 
}
