import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IOffer } from '../../interfaces/offer.interface';
import { FormBuilder } from '@angular/forms';
import { IPackage } from '../../interfaces/package.interface';

@Injectable({
  providedIn: 'root',
})
export class OfferService {
  private readonly api = 'http://localhost:3000/offers';
  constructor(private readonly _http: HttpClient) {}

  getOffers(page: number, limit: number) {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this._http.get<{
      success: boolean;
      offers: IOffer[];
      totalItems: number;
      message: string;
      info: boolean;
    }>(this.api, { params, withCredentials: true });
  }

  addOffer(offerData: FormBuilder) {
    return this._http.post<{ success: boolean; message: string }>(
      `${this.api}/addOffer`,
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
    }>(`${this.api}/${offerId}`, { withCredentials: true });
  }

  editOffer(offerId: string, offerData: IOffer) {
    return this._http.put<{ success: boolean; message: string }>(
      `${this.api}/edit/${offerId}`,
      offerData,
      {
        withCredentials: true,
      }
    );
  }

  applicableOffer(offerId: string) {
    return this._http.get<{ success: boolean; packages: IPackage[] }>(
      `${this.api}/applicable/${offerId}`,
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
    }>(`${this.api}/packages/${offerId}`, {
      withCredentials: true,
    });
  }

  applyOffer(offerId: string, packageId: string) {
    return this._http.patch<{ success: boolean; message: string }>(
      `${this.api}/apply/${offerId}`,
      { packageId },
      { withCredentials: true }
    );
  }

  removeOffer(offerId: string, packageId: string) {
    return this._http.patch<{ success: boolean; message: string }>(
      `${this.api}/remove/${offerId}`,
      { packageId },
      { withCredentials: true }
    );
  }
}
