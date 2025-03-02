import { useState } from 'react';
import BackButton from '../components/shared/BackButton';
import { Notification } from '../types/notification';

const SAMPLE_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    title: 'Health Assessment Reminder',
    message: 'It\'s time for your monthly health assessment. Take it now to track your progress!',
    date: new Date('2024-03-10'),
    isRead: false,
    type: 'info'
  },
  {
    id: '2',
    title: 'New Practitioner Available',
    message: 'Dr. Zhang Wei has joined our platform. Book a consultation now!',
    date: new Date('2024-03-09'),
    isRead: true,
    type: 'success'
  },
  {
    id: '3',
    title: 'Balance Low',
    message: 'Your balance is below $10. Top up to continue using our services.',
    date: new Date('2024-03-08'),
    isRead: true,
    type: 'warning'
  }
];

export default function NotificationsPage() {
  const [notifications] = useState<Notification[]>(SAMPLE_NOTIFICATIONS);

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'info': return '📢';
      case 'success': return '✅';
      case 'warning': return '⚠️';
      case 'error': return '❌';
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="p-4 bg-white border-b sticky top-0 z-10">
        <div className="relative">
          <BackButton />
          <h1 className="text-lg font-medium text-center">Notifications</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {notifications.map(notification => (
          <div
            key={notification.id}
            className={`bg-white p-4 rounded-xl shadow-md ${
              !notification.isRead ? 'border-l-4 border-primary-500' : ''
            }`}
          >
            <div className="flex items-start space-x-3">
              <span className="text-2xl">{getNotificationIcon(notification.type)}</span>
              <div className="flex-1">
                <h3 className="font-semibold">{notification.title}</h3>
                <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
                <span className="text-sm text-gray-500 mt-2 block">
                  {notification.date.toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}