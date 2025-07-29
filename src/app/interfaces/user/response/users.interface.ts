import { IUser } from '../../../models/user.model';

export interface AllUsersReposnse {
  users: IUser[];
  totalUsers: number;
  currentPage: number;
}
