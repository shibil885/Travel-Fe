import { IAgency } from '../../../models/agency.model';
import { IUser } from '../../../models/user.model';

export interface FilteredUserResponse {
  filteredData: IUser[] | IAgency[];
}
