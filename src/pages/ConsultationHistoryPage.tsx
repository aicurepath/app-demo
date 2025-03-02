import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface ConsultationHistory {
  id: string;
  practitioner?: string;
  user?: string;
  date: string;
  preview: string;
  unread: boolean;
}

const SAMPLE_PRACTITIONER_HISTORY: ConsultationHistory[] = [
  {
    id: '1',
    user: 'John Doe',
    date: '2024-02-20',
    preview: 'User reported improvement in symptoms...',
    unread: true
  },
  {
    id: '2',
    user: 'Jane Smith',
    date: '2024-02-15',
    preview: 'Follow-up on herbal medicine prescription...',
    unread: false
  }
];

const SAMPLE_USER_HISTORY: ConsultationHistory[] = [
  {
    id: '1',
    practitioner: 'Dr. Li Wei',
    date: '2024-02-20',
    preview: 'Follow up on your acupuncture treatment...',
    unread: true
  },
  {
    id: '2',
    practitioner: 'Dr. Chen Yu',
    date: '2024-02-15',
    preview: 'Regarding your herbal medicine prescription...',
    unread: false
  }
];

export default function ConsultationHistoryPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isPractitioner = user?.role === 'practitioner';
  const [history] = useState<ConsultationHistory[]>(
    isPractitioner ? SAMPLE_PRACTITIONER_HISTORY : SAMPLE_USER_HISTORY
  );

  return (
    <div className="max-w-lg mx-auto">
      <div className="p-4 bg-white border-b sticky top-0 z-10">
        <div className="relative">
          <h1 className="text-lg font-medium text-center">
            {isPractitioner ? 'User Consultations' : 'Consultation History'}
          </h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {history.map(chat => (
          <button
            key={chat.id}
            onClick={() => navigate(`/consultation-history/${chat.id}`)}
            className="w-full bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow text-left"
          >
            <div className="flex justify-between items-start mb-2">
              <h2 className="font-semibold">
                {isPractitioner ? chat.user : chat.practitioner}
              </h2>
              {chat.unread && (
                <span className="bg-primary-500 text-white text-xs px-2 py-1 rounded-full">
                  New
                </span>
              )}
            </div>
            <p className="text-gray-600 text-sm mb-2">{chat.preview}</p>
            <span className="text-sm text-gray-500">
              {new Date(chat.date).toLocaleDateString()}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}