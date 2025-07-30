import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IPackage } from '../../interfaces/package/package.interface';
import { environment } from '../../../Environment/environment';
import { ApiResponse, IOffer } from '../../interfaces';
import { OfferResponse } from '../../interfaces/offer/response/offer.interface';
@Injectable({
  providedIn: 'root',
})
export class OfferService {
  private readonly _BASE_URL = environment.apiUrl;
  private readonly _api = `${this._BASE_URL}/offer`;
  constructor(private readonly _http: HttpClient) {}

  getOffers(page: number, limit: number) {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this._http.get<ApiResponse<OfferResponse>>(this._api, {
      params,
      withCredentials: true,
    });
  }

  addOffer(offerData: FormBuilder) {
    return this._http.post<ApiResponse<{}>>(`${this._api}`, offerData, {
      withCredentials: true,
    });
  }

  getOneOffer(offerId: string | null) {
    return this._http.get<ApiResponse<{ offer: IOffer }>>(
      `${this._api}/${offerId}`,
      {
        withCredentials: true,
      }
    );
  }

  editOffer(offerId: string, offerData: IOffer) {
    return this._http.put<ApiResponse<{}>>(
      `${this._api}/${offerId}`,
      offerData,
      {
        withCredentials: true,
      }
    );
  }

  applicableOffer(offerId: string) {
    return this._http.get<ApiResponse<{ packages: IPackage[] }>>(
      `${this._api}/packages/apply/${offerId}`,
      {
        withCredentials: true,
      }
    );
  }

  getPackagesForApplyOffer(offerId: string | null) {
    return this._http.get<ApiResponse<{ packages: IPackage[] }>>(
      `${this._api}/packages/${offerId}`,
      {
        withCredentials: true,
      }
    );
  }

  applyOffer(offerId: string, packageId: string) {
    return this._http.patch<ApiResponse<{}>>(
      `${this._api}/apply/${offerId}`,
      { packageId },
      { withCredentials: true }
    );
  }

  removeOffer(offerId: string, packageId: string) {
    return this._http.delete<ApiResponse<{}>>(
      `${this._api}/${offerId}/${packageId}`,
      { withCredentials: true }
    );
  }
}
