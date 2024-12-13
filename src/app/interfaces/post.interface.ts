import { IUser } from '../models/user.model';

export interface IPost {
  _id: string;
  userId: IUser;
  imageUrls: string[];
  caption: string;
  likes: Array<{
    userId: string;
    createdAt: Date;
  }>;
  comments: Array<{
    userId: IUser;
    comment: string;
    createdAt: Date;
  }>;
  visibility: 'public' | 'private';
  deleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
