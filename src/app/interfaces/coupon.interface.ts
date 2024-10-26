export interface ICoupon {
  _id?: string;
  code: string;
  description: string;
  minAmt: number;
  maxAmt?: number;
  expiry_date: Date;
  is_active?: boolean;
  used: string[];
  created_at: Date;
  updated_at: Date;
}
