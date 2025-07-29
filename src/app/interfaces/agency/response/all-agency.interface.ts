import { IAgency } from '../../../models/agency.model';

export interface AllAgencyRespose {
  agencies: IAgency[];
  totalAgencies: number;
  currentPage: number;
}
