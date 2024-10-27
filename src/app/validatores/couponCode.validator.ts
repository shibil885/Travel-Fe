import { AbstractControl, ValidationErrors } from "@angular/forms"

export const invalidCoupon = (control: AbstractControl): ValidationErrors | null => {
        
    if ( typeof control.value === 'string' && !( /^[A-Za-z0-9]+$/).test(control.value)) {
        return { invalidCoupon: true }
    }
    return null
}