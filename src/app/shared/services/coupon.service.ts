import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICoupon } from '../../interfaces/coupon.interface';
import { takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CouponService {
  private api = 'http://localhost:3000/coupon';

  constructor(private http: HttpClient) {}

  createCoupon(couponData: ICoupon) {
    return this.http.post<{ success: boolean; message: string }>(
      `${this.api}/createCoupon`,
      couponData,
      {
        withCredentials: true,
      }
    );
  }

  editCoupon(id: string, editCouponData: ICoupon) {
    return this.http.put(`${this.api}/editCoupon/${id}`, editCouponData, {
      withCredentials: true,
    });
  }

  changeStatus(id: string | undefined, status: boolean | undefined) {
    return this.http.patch<{ success: boolean; message: string }>(
      `${this.api}/changeStatus/${id}`,
      { status },
      { withCredentials: true }
    );
  }

  getAllCoupons() {
    return this.http.get<{
      success: boolean;
      message: string;
      coupons: ICoupon[];
    }>(`${this.api}/getAllCoupons`, {
      withCredentials: true,
    });
  }
}
