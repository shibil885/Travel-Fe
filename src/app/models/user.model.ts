export interface IUser {
  id: string;
  email: string;
  username: string;
  password: string;
  isActive: boolean;
  isVerified: boolean;
  phone: string;
  profilePicture?: string;
  address: string;
  preferences: string[];
  createdAt: Date;
  updatedAt: Date;
}
