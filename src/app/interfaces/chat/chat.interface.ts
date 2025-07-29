import { IAgency } from '../../models/agency.model';
import { IUser } from '../../models/user.model';
import { IMessage } from '../common';

export interface IChat {
  _id: string;
  userId: IUser;
  agencyId: IAgency;
  lastMessageId?: IMessage;
  createdAt?: Date;
  updatedAt?: Date;
  messages?: IMessage[];
}
