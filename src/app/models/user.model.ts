export interface IUser {
    id: string
    email: string;
    password: string;
    isBlocked: boolean;
    isVerified: boolean;
    first_name: string;
    second_name: string;
    phone: string;
    profileImg: string 
    address: string;
    preferences: [ string ];
    refreshToken: string;
    createdAt: Date;
    updatedAt: Date;
  }
  