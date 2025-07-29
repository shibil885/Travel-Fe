export enum DiscountType {
  PERCENTAGE = 'percentage',
  FIXED = 'fixed',
}

export interface ICoupon {
  _id?: string;
  code: string;
  description: string;
  percentage: number;
  minAmt: number;
  maxAmt?: number;
  expiry_date: Date;
  discount_type: DiscountType;
  discount_value: number;
  isActive?: boolean;
  used: string[];
  createdAt: Date;
  updatedAt: Date;
}
