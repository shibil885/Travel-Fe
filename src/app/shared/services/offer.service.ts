import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IPackage } from '../../interfaces/package/package.interface';
import { environment } from '../../../Environment/environment';
import { IOffer } from '../../interfaces';
@Injectable({
  providedIn: 'root',
})
export class OfferService {
  private readonly _BASE_URL = environment.apiUrl;
  private readonly _api = `${this._BASE_URL}/offers`;
  constructor(private readonly _http: HttpClient) {}

  getOffers(page: number, limit: number) {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this._http.get<{
      success: boolean;
      offers: IOffer[];
      totalItems: number;
      message: string;
      info: boolean;
    }>(this._api, { params, withCredentials: true });
  }

  addOffer(offerData: FormBuilder) {
    return this._http.post<{ success: boolean; message: string }>(
      `${this._api}/addOffer`,
      offerData,
      {
        withCredentials: true,
      }
    );
  }

  getOneOffer(offerId: string | null) {
    return this._http.get<{
      success: true;
      info: boolean;
      offer: IOffer;
      message: string;
    }>(`${this._api}/${offerId}`, { withCredentials: true });
  }

  editOffer(offerId: string, offerData: IOffer) {
    return this._http.put<{ success: boolean; message: string }>(
      `${this._api}/edit/${offerId}`,
      offerData,
      {
        withCredentials: true,
      }
    );
  }

  applicableOffer(offerId: string) {
    return this._http.get<{ success: boolean; packages: IPackage[] }>(
      `${this._api}/applicable/${offerId}`,
      {
        withCredentials: true,
      }
    );
  }

  getPackagesForApplyOffer(offerId: string | null) {
    return this._http.get<{
      success: boolean;
      info: boolean;
      message: string;
      packages: IPackage[];
    }>(`${this._api}/packages/${offerId}`, {
      withCredentials: true,
    });
  }

  applyOffer(offerId: string, packageId: string) {
    return this._http.patch<{ success: boolean; message: string }>(
      `${this._api}/apply/${offerId}`,
      { packageId },
      { withCredentials: true }
    );
  }

  removeOffer(offerId: string, packageId: string) {
    return this._http.patch<{ success: boolean; message: string }>(
      `${this._api}/remove/${offerId}`,
      { packageId },
      { withCredentials: true }
    );
  }
}
