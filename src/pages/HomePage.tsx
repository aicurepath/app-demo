import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { usePayment } from '../hooks/usePayment';
import HealthScore from '../components/HealthScore';
import UpcomingAppointmentsCard from '../components/appointments/UpcomingAppointmentsCard';
import PractitionerCalendar from '../components/appointments/PractitionerCalendar';

export default function HomePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { balance } = usePayment();
  const isPractitioner = user?.role === 'practitioner';

  return (
    <div className="max-w-lg mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          {/* Header content */}
        </div>
      </div>

      {/* Practitioner Wallet Card */}
      {isPractitioner && (
        <div className="bg-white rounded-2xl shadow-card p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl text-gray-800">Wallet</h2>
            <button
              onClick={() => navigate('/profile')}
              className="text-primary-500 hover:text-primary-600 font-medium text-sm"
            >
              View Details
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Available Balance</p>
              <p className="text-3xl font-bold text-primary-500">${balance}</p>
            </div>
            <button
              onClick={() => navigate('/transactions')}
              className="text-sm text-primary-500 hover:text-primary-600"
            >
              View History →
            </button>
          </div>
        </div>
      )}

      {/* Health Score (only for patients) */}
      {!isPractitioner && <HealthScore />}
      
      {/* Upcoming Appointments */}
      <UpcomingAppointmentsCard />
      
      {/* Practitioner Calendar */}
      {isPractitioner && <PractitionerCalendar />}
      
      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => navigate('/chat')}
          className="bg-white rounded-2xl shadow-soft p-6 hover:shadow-card transition-shadow text-center"
        >
          <div className="flex justify-center mb-3">
            <img src="/robot.svg" alt="AI Assistant" className="w-12 h-12" />
          </div>
          <h3 className="font-semibold text-gray-800">AI Assistant</h3>
          <p className="text-sm text-gray-500 mt-1">Get instant health advice</p>
        </button>
        
        {isPractitioner ? (
          <button
            onClick={() => navigate('/profession-profile')}
            className="bg-white rounded-2xl shadow-soft p-6 hover:shadow-card transition-shadow text-center"
          >
            <span className="text-3xl mb-3 block">👨‍⚕️</span>
            <h3 className="font-semibold text-gray-800">My Profile</h3>
            <p className="text-sm text-gray-500 mt-1">Manage your practice</p>
          </button>
        ) : (
          <button
            onClick={() => navigate('/practitioners')}
            className="bg-white rounded-2xl shadow-soft p-6 hover:shadow-card transition-shadow text-center"
          >
            <span className="text-3xl mb-3 block">👤</span>
            <h3 className="font-semibold text-gray-800">Consult Practitioner</h3>
            <p className="text-sm text-gray-500 mt-1">Talk to TCM experts</p>
          </button>
        )}
      </div>

      {/* Get Covered Card (for patients only) */}
      {!isPractitioner && (
        <div className="bg-white rounded-2xl shadow-card p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Get Covered</h2>
              <p className="text-gray-600 mt-1">Protect your health with insurance</p>
            </div>
            <span className="text-3xl">🛡️</span>
          </div>
          <button
            onClick={() => navigate('/insurance/market')}
            className="w-full bg-primary-500 text-white py-3 px-4 rounded-xl hover:bg-primary-600 font-medium"
          >
            View Insurance Plans
          </button>
        </div>
      )}

      {/* Health Insights */}
      <div className="bg-white rounded-2xl shadow-card p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl text-gray-800">Health Insights</h2>
          <button
            onClick={() => navigate('/insights')}
            className="text-primary-500 hover:text-primary-600 font-medium text-sm"
          >
            View All
          </button>
        </div>
        <div className="space-y-4">
          <div className="p-4 bg-primary-50 rounded-xl">
            <h3 className="font-semibold text-gray-800">Daily Tip</h3>
            <p className="text-sm text-gray-600 mt-1">
              Stay hydrated! Drink 8 glasses of water daily for optimal health.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}