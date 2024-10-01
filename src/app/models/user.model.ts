export interface IUser {
    id: string
    email: string;
    password: string;
    isBlocked: boolean;
    isVerified: boolean;
    phone: string;
    profileImg: string 
    address: string;
    preferences: [ string ];
    createdAt: Date;
    updatedAt: Date;
  }
  