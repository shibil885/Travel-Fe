export interface IUser {
  _id: string;
  email: string;
  username: string;
  name: string;
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
