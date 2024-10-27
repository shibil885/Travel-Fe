import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'daysLeft',
  standalone: true,
})
export class DaysLeftPipe implements PipeTransform {
  transform(createdAt: Date, expiryAt: Date) {

    const created = new Date(createdAt);
    const expiry = new Date(expiryAt);

    const diffInMs = expiry.getTime() - created.getTime();
    const daysLeft = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
    
    return daysLeft > 0 ? `${daysLeft} days left` : 'Expired';
  }
}
