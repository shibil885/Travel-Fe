    import { AbstractControl, ValidationErrors } from "@angular/forms";

    export const invalidChar = (control: AbstractControl): ValidationErrors | null => {
        
        if ( typeof control.value === 'string' && !(/^[a-zA-Z0-9\s'-]+$/).test(control.value)) {
            return { invalidChar: true }
        }
        return null
    }


    export const letterOrNumber = (control: AbstractControl): ValidationErrors | null => {

        if (typeof control.value === 'string' && !(/^[a-zA-Z0-9]/).test(control.value)) {
            return { letterOrNumber: true }
        }
        return null
    }


    export const endWithSpace = (control: AbstractControl): ValidationErrors | null => {

        if (typeof control.value === 'string' && !(/.*\S$/).test(control.value)) {
            return { endWithSpace: true }
        }
        return null
    }

    