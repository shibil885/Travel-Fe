import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICoupon } from '../../interfaces/coupon.interface';
import { takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CouponService {
  private _api = 'http://localhost:3000/coupon';

  constructor(private _http: HttpClient) {}

  createCoupon(couponData: ICoupon) {
    return this._http.post<{ success: boolean; message: string }>(
      `${this._api}/createCoupon`,
      couponData,
      {
        withCredentials: true,
      }
    );
  }

  editCoupon(id: string | undefined, editCouponData: ICoupon) {
    return this._http.put<{ success: boolean; message: string }>(
      `${this._api}/editCoupon/${id}`,
      editCouponData,
      {
        withCredentials: true,
      }
    );
  }

  changeStatus(id: string | undefined, status: boolean | undefined) {
    return this._http.patch<{ success: boolean; message: string }>(
      `${this._api}/changeStatus/${id}`,
      { status },
      { withCredentials: true }
    );
  }

  getAllCoupons(limit: number, currentPage: number) {
    const params = new HttpParams()
      .set('limit', limit)
      .set('currentPage', currentPage);
    return this._http.get<{
      success: boolean;
      message: string;
      currentPage: number;
      totalItems: number;
      coupons: ICoupon[];
    }>(`${this._api}/getAllCoupons`, {
      params,
      withCredentials: true,
    });
  }
  getCouponsToUser(packageId: string | undefined) {
    return this._http.get<{ success: boolean; coupons: ICoupon[] }>(
      `${this._api}/getCouponsForUser/${packageId}`,
      {
        withCredentials: true,
      }
    );
  }
}
