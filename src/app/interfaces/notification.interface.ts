export interface Notification {
  _id: string;
  from_id: string;
  from_model: 'User' | 'Agency';
  to_id: string;
  to_model: 'User' | 'Agency';
  title: string;
  description: string;
  is_read: boolean;
  read_at: Date | null;
  type: 'info' | 'alert' | 'error' | 'success';
  priority: 1 | 2 | 3;
  is_deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
