export interface IUser {
  id: string;                
  email: string;            
  password: string;          
  isActive: boolean;        
  isVerified: boolean;       
  phone: string;             
  profileImg: string;        
  address: string;           
  preferences: string[];     
  createdAt: Date;           
  updatedAt: Date;           }
