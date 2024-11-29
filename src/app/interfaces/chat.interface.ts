import { IAgency } from '../models/agency.model';
import { IUser } from '../models/user.model';

export interface IChat {
  userId: IUser;
  agencyId: IAgency;
  lastMessageId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
