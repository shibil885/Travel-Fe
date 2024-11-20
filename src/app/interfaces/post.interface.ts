import { IUser } from '../models/user.model';

export interface IPost {
  _id: string;
  userId: string;
  imageUrl: string;
  caption: string;
  likes: Array<{
    userId: IUser;
    createdAt: Date;
  }>;
  comments: Array<{
    userId: IUser;
    comment: string;
    createdAt: Date;
  }>;
  visibility: 'public' | 'private';
  deleted: boolean;
  user: IUser;
  createdAt?: Date;
  updatedAt?: Date;
}
