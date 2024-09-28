import { AbstractControl, ValidationErrors } from '@angular/forms';

export const invalidPdfFile = (control: AbstractControl): ValidationErrors | null => {
    const file: File = control.value; // Get the file object

    // Check if a file is provided
    if (file && file instanceof File) {
        console.log('File details:', {
            name: file.name,
            type: file.type,
            size: file.size,
            lastModified: file.lastModified
        });

        const allowedMimeType = 'application/pdf';

        // Check if the file type is a valid PDF
        if (file.type !== allowedMimeType) {
            return { invalidPdfFile: true }; // Return error if not a PDF
        }
    }

    return null;
};
