import { IBooking } from '../interfaces/booking.interface';

export interface IAgency {
  _id: string;
  name: string;
  email: string;
  place: string;
  phone: number;
  document: string;
  password: string;
  isActive: boolean;
  isVerified: boolean;
  isConfirmed: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  bookings: IBooking[];
}
