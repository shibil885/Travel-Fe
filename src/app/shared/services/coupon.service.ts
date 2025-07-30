import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICoupon } from '../../interfaces/coupon/coupon.interface';
import { environment } from '../../../Environment/environment';
import { ApiResponse } from '../../interfaces';
import { CouponResponse } from '../../interfaces/coupon/response/coupo.response';

@Injectable({
  providedIn: 'root',
})
export class CouponService {
  private readonly _BASE_URL = environment.apiUrl;
  private _api = `${this._BASE_URL}/coupon`;

  constructor(private _http: HttpClient) {}

  createCoupon(couponData: ICoupon) {
    return this._http.post<ApiResponse<{}>>(`${this._api}`, couponData, {
      withCredentials: true,
    });
  }

  editCoupon(id: string | undefined, editCouponData: ICoupon) {
    return this._http.put<ApiResponse<{}>>(
      `${this._api}/${id}`,
      editCouponData,
      {
        withCredentials: true,
      }
    );
  }

  changeStatus(id: string | undefined, status: boolean | undefined) {
    return this._http.patch<ApiResponse<{}>>(
      `${this._api}/${id}`,
      { status },
      { withCredentials: true }
    );
  }

  getAllCoupons(limit: number, currentPage: number) {
    const params = new HttpParams()
      .set('limit', limit)
      .set('page', currentPage);
    return this._http.get<ApiResponse<CouponResponse>>(`${this._api}`, {
      params,
      withCredentials: true,
    });
  }
  getCouponsToUser(packageId: string | undefined) {
    return this._http.get<ApiResponse<{ coupons: ICoupon[] }>>(
      `${this._api}/package/${packageId}`,
      {
        withCredentials: true,
      }
    );
  }
}
