export interface Notification {
  id: string;
  title: string;
  message: string;
  date: Date;
  isRead: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
}