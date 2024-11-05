import { TravelConfirmationStatus } from '../enum/travelConfirmation.enum';
import { TravelStatus } from '../enum/travelStatus.enum';
import { IUser } from '../models/user.model';
import { ICoupon } from './coupon.interface';
import { IPackage } from './package.interface';

export interface IBooking {
  _id: string;
  user_id: IUser;
  package_id: IPackage;
  payment: string;
  start_date: Date;
  end_date: Date;
  travel_status: TravelStatus;
  confirmation: TravelConfirmationStatus;
  coupon_id?: ICoupon;
  discounted_price: string;
  total_price: string;
  peoples: {
    name: string;
    age: string;
  }[];
  billing_details: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}