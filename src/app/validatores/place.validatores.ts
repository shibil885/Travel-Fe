import { AbstractControl, AbstractControlDirective, ValidationErrors } from "@angular/forms";

export const invalidPlace = (control: AbstractControl): ValidationErrors | null => {
    if(typeof control.value === 'string' && !(/^[a-zA-ZÀ-ÿ.'-]{2,100}(?: [a-zA-ZÀ-ÿ.'-]{2,100})*$/).test(control.value)) {
        return { invalidPlace: true }
    }
    return null
}