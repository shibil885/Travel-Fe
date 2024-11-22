import { IAgency } from '../models/agency.model';
import { ICategory } from './category.interface';
import { IOffer } from './offer.interface';

interface TourPlan {
  day: number;
  title: string;
  description: string;
}

export interface IPackage {
  _id?: string;
  agencyId: IAgency;
  name: string;
  category: ICategory;
  country: string;
  description: string;
  departure: string;
  finalDestination: string;
  price: string;
  people: string;
  included: string[];
  notIncluded: string[];
  days: string;
  tourPlans: TourPlan[];
  images: string[];
  offerId: IOffer;
  isActive: boolean;
}
