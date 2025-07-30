import { IPackage } from '../package.interface';

export interface AllPackagesResponse {
  packages: IPackage[];
  packagesCount: number;
  currentPage: number;
}
