interface TourPlan {
    day: number;
    title: string
    description: string;
  }
  
  export interface IPackage {
    _id?: string;
    name: string;
    category: any;
    country: string;
    description: string;
    departure: string;
    finalDestination: string;
    price: string;
    people: string;
    included: string[];
    notIncluded: string[];
    days: string;
    tourPlans: TourPlan[];
    images: string[];
    isActive: boolean;
  }