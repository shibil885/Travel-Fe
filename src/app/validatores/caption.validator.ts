import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function validateCaption(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return { required: true };
    }

    const validPattern = /^[\w\s.,!?❤️👍🔥🎉😊😂😎]*$/;
    if (!validPattern.test(value)) {
      return { invalidCaption: 'Caption contains invalid characters.' };
    }

    if (value.length < 5) {
      return { minLength: 'Caption must be at least 5 characters long.' };
    }

    if (value.length > 150) {
      return { maxLength: 'Caption cannot exceed 150 characters.' };
    }

    return null;
  };
}
