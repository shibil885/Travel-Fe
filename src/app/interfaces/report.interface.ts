export interface IReport {
    _id: string;
    title: string;
    description: string;
    reportedBy: string;
    status: 'Pending' | 'Resolved' | 'Dismissed';
    createdAt: Date;
    updatedAt?: Date; 
  }
  