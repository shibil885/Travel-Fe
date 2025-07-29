export interface INotification {
  _id: string
  from_id: string;
  from_model: 'User' | 'Agency' | 'Admin';
  to_id: string;
  to_model: 'User' | 'Agency' | 'Admin';
  title: string;
  description: string;
  is_read: boolean;
  read_at: Date | null;
  type: 'info' | 'alert' | 'error' | 'success';
  priority: 1 | 2 | 3;
  is_deleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
