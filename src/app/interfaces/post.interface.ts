import { IUser } from '../models/user.model';

export interface IPost {
  _id: string;
  userId: string;
  imageUrl: string;
  caption: string;
  likes: Array<{
    userId: string;
    user: IUser;
    createdAt: Date;
  }>;
  comments: Array<{
    userId: string;
    comment: string;
    user: IUser;
    createdAt: Date;
  }>;
  visibility: 'public' | 'private';
  deleted: boolean;
  user: IUser;
  createdAt?: Date;
  updatedAt?: Date;
}
