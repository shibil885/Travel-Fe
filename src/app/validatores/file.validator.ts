import { AbstractControl, ValidationErrors } from '@angular/forms';

export const invalidPdfFile = (control: AbstractControl): ValidationErrors | null => {
    const file: File = control.value; // Get the file object

    // Check if a file is provided
    if (file && file instanceof File) {
        const allowedMimeType = 'application/pdf';

        // Check if the file type is a valid PDF
        if (file.type !== allowedMimeType) {
            return { invalidPdfFile: true }; // Return error if not a PDF
        }
    }

    return null;
};
