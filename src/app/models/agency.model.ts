export interface ContactInfo {
    email: string;
    place: string;
    phone: number;
    document: string;
  }
  
  export interface IAgency {
    name: string;           
    password: string;       
    contact: ContactInfo;   
    isActive: boolean;      
    isVerified: boolean;   
    isConfirmed: boolean;  
    createdAt?: Date;      
    updatedAt?: Date;      
  }
  