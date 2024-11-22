import { Pipe, PipeTransform } from '@angular/core';
import { IOffer } from '../../interfaces/offer.interface';
import { DiscountType } from '../../interfaces/coupon.interface';

@Pipe({
  name: 'discount',
  standalone: true,
})
export class DiscountPipe implements PipeTransform {
  transform(price: string, offer: IOffer): number {
    const parsedPrice = Number(price)
    if (offer.discount_type === DiscountType.FIXED) {
      return offer.discount_value ? parsedPrice - offer.discount_value + 50 : parsedPrice + 50;
    }

    if (offer.discount_type === DiscountType.PERCENTAGE) {
      return offer.percentage
        ? parsedPrice - parsedPrice * (offer.percentage / 100) + 50
        : parsedPrice + 50;
    }

    return parsedPrice; 
  }
}
