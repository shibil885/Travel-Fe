import { DiscountType } from './coupon.interface';
import { IPackage } from './package.interface';

export interface IOffer {
  _id: string
  title: string;
  description: string;
  discount_type: DiscountType;
  percentage?: number;
  discount_value?: number;
  expiry_date: Date | string;
  isActive?: boolean;
  applicable_packages?: IPackage[];
  agencyId: string;
  createdAt?: Date;
  updatedAt?: Date;
  packages?: IPackage;
}
