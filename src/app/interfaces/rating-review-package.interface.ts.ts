import { IUser } from '../models/user.model';

export interface IReviewForPackage {
  agencyId: string;
  reviews: Array<{
    userId: IUser;
    rating: string;
    review: string;
    created_at: Date;
  }>;
  averageRating: string;
}
