import { DiscountType } from './coupon.interface';

export interface IOffer {
  title: string;
  description: string;
  discount_type: DiscountType;
  percentage?: number;
  discount_value?: number;
  expiry_date: Date;
  isActive?: boolean;
  applicable_packages?: string;
  agencyId: string;
  createdAt?: Date;
  updatedAt?: Date;
}
