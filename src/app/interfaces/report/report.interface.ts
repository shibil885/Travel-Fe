import { IAgency } from "../../models/agency.model";
import { IUser } from "../../models/user.model";
import { IPackage } from "../package";
import { IPost } from "../post";

export interface IReport {
  _id: string;
  reportedBy: IUser;
  targetType: 'Agency' | 'Package' | 'Post' | 'Comment';
  targetId: string;
  targetDetails: IPost | IAgency | IPackage;
  reason: string;
  description?: string;
  status: 'pending' | 'reviewed' | 'resolved';
  reviewComment?: string;
  resolvedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
