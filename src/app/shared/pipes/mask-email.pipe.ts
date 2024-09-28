import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maskEmail',
  standalone: true
})
export class MaskEmailPipe implements PipeTransform {

  transform(value: string | null | undefined): string {
    if (!value) {
      return '';
    }

    const [name, domain] = value.split('@');
    const maskedEmail = name.length > 5 ? name.slice(0, 5) + '*****' : name + '*****';
    return `${maskedEmail}@${domain}`;
  }

}
