import { IUser } from "../models/user.model";

export interface IReport {
  _id: string;
  reportedBy: IUser;
  targetType: 'Agency' | 'Package' | 'Post' | 'Comment';
  targetId: string;
  reason: string;
  description?: string;
  status: 'pending' | 'reviewed' | 'resolved';
  reviewComment?: string;
  resolvedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
