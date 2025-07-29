import { IAgency } from "../../models/agency.model";
import { IBooking } from "../booking";
import { ICategory } from "../common";
import { IOffer } from "../offer";
import { IReviewForPackage } from "../review";

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
  ratingAndReview: IReviewForPackage[];
  categoryId: ICategory[];
  agency: IAgency[];
  bookings: IBooking[];
}
