import { IOffer } from '../offer.interface';

export interface OfferResponse {
  offers: IOffer[];
  totalCount: number;
  currentPage: number;
}
