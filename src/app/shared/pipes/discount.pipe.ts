import { Pipe, PipeTransform } from '@angular/core';
import { DiscountType } from '../../interfaces/coupon/coupon.interface';
import { IOffer } from '../../interfaces';

@Pipe({
  name: 'discount',
  standalone: true,
})
export class DiscountPipe implements PipeTransform {
  transform(price: string, offer: IOffer): number {
    const parsedPrice = Number(price);
    if (offer.discount_type === DiscountType.FIXED) {
      return offer.discount_value
        ? parsedPrice - offer.discount_value
        : parsedPrice;
    }

    if (offer.discount_type === DiscountType.PERCENTAGE) {
      return offer.percentage
        ? parsedPrice - parsedPrice * (offer.percentage / 100)
        : parsedPrice;
    }

    return parsedPrice;
  }
}
