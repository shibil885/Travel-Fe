interface TourPlan {
    day: number;
    description: string;
  }
  
  export interface Package {
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
    TourPlans: TourPlan[];
    images: string[];
    isActive: boolean;
  }