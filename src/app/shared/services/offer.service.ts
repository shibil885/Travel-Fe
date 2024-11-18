import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IOffer } from '../../interfaces/offer.interface';

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
      totalItems: number
      message: string;
      info: boolean
    }>(this.api, { params, withCredentials: true });
  }
}
