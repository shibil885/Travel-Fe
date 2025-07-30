import { ICoupon } from '../coupon.interface';

export interface CouponResponse {
  coupons: ICoupon[];
  totalCount: number;
  currentPage: number;
}
