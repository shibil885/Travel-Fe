import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const upperCase = (control: AbstractControl): ValidationErrors | null => {
    if ( typeof control.value === 'string' && !(/[A-Z]/).test(control.value)) {
        return { upperCase: true }
    }
    return null
}
export const lowerCase = (control: AbstractControl): ValidationErrors | null => {
    if ( typeof control.value === 'string' && !(/[a-z]/).test(control.value)) {
        return { lowerCase: true }
    }
    return null
}
export const noDigit = (control: AbstractControl): ValidationErrors | null => {
    if ( typeof control.value === 'string' && !(/\d/).test(control.value)) {
        return { noDigit: true }
    }
    return null
}
export const specialChar = (control: AbstractControl): ValidationErrors | null => {
    if ( typeof control.value === 'string' && !(/[@$!%*?&]/).test(control.value)) {
        return { specialChar: true }
    }
    return null
}

export function confirmPasswordValidator(password: string, confirmPassword: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const passwordControl = formGroup.get(password);
    const confirmPasswordControl = formGroup.get(confirmPassword);

    if (!passwordControl || !confirmPasswordControl) {
      return null;
    }

    if (confirmPasswordControl.errors && !confirmPasswordControl.errors['passwordMismatch']) {
      return null;
    }

    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ passwordMismatch: true });
    } else {
      confirmPasswordControl.setErrors(null);
    }

    return null;
  };
}
