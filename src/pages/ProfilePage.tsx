import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePayment } from '../hooks/usePayment';
import { useAuth } from '../hooks/useAuth';
import { useAppointments } from '../hooks/useAppointments';
import TopUpDialog from '../components/payment/TopUpDialog';
import CashoutDialog from '../components/payment/CashoutDialog';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { mockInsuranceCards } from '../data/mockInsurance';
import AppointmentCard from '../components/appointments/AppointmentCard';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { balance, topUp, makePayment } = usePayment();
  const { getUpcomingAppointments } = useAppointments();
  const [isTopUpDialogOpen, setIsTopUpDialogOpen] = useState(false);
  const [isCashoutDialogOpen, setIsCashoutDialogOpen] = useState(false);
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);
  const isPractitioner = user?.role === 'practitioner';
  
  const upcomingAppointments = user ? getUpcomingAppointments(user.id).slice(0, 2) : [];

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const handleCashout = async (amount: number) => {
    await makePayment(amount, 'Cash out to bank card');
  };

  return (
    <div className="max-w-lg mx-auto p-4 space-y-4">
      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-2xl">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
              ) : (
                isPractitioner ? '👨‍⚕️' : '👤'
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{user?.name}</h1>
              <p className="text-gray-600">Member since 2024</p>
            </div>
          </div>

          <button 
            onClick={() => setIsProfileExpanded(!isProfileExpanded)}
            className="w-full flex items-center justify-between py-2 text-gray-600 hover:text-gray-900"
          >
            <span className="font-medium">Personal Information</span>
            {isProfileExpanded ? (
              <ChevronUpIcon className="w-5 h-5" />
            ) : (
              <ChevronDownIcon className="w-5 h-5" />
            )}
          </button>

          {isProfileExpanded && (
            <div className="mt-4 space-y-4 border-t pt-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <p className="mt-1">{user?.email}</p>
              </div>

              {isPractitioner && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">License Number</h3>
                  <p className="mt-1">{user?.licenseNumber}</p>
                </div>
              )}

              <button 
                className="w-full bg-primary-500 text-white py-2 px-4 rounded-xl hover:bg-primary-600"
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Upcoming Appointments */}
      {upcomingAppointments.length > 0 && (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Upcoming Appointments</h2>
              <button
                onClick={() => navigate('/appointments')}
                className="text-primary-500 hover:text-primary-600 font-medium text-sm"
              >
                View All
              </button>
            </div>
            <div className="space-y-3">
              {upcomingAppointments.map(appointment => (
                <AppointmentCard 
                  key={appointment.id} 
                  appointment={appointment}
                  isPractitioner={isPractitioner}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Wallet Card */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Wallet</h2>
            <span className="text-2xl font-bold text-primary-500">${balance}</span>
          </div>
          
          <div className="space-y-3">
            {isPractitioner ? (
              <>
                <button
                  onClick={() => setIsCashoutDialogOpen(true)}
                  className="w-full bg-primary-500 text-white py-2 px-4 rounded-xl hover:bg-primary-600"
                >
                  Cash Out
                </button>
                {!user?.bankCards?.length && (
                  <button
                    onClick={() => navigate('/profile/bank-cards')}
                    className="w-full border border-gray-200 text-gray-600 py-2 px-4 rounded-xl hover:bg-gray-50"
                  >
                    Add Bank Card
                  </button>
                )}
              </>
            ) : (
              <button
                onClick={() => setIsTopUpDialogOpen(true)}
                className="w-full bg-primary-500 text-white py-2 px-4 rounded-xl hover:bg-primary-600"
              >
                Top Up Balance
              </button>
            )}

            <button
              onClick={() => navigate('/transactions')}
              className="w-full border border-gray-200 text-gray-600 py-2 px-4 rounded-xl hover:bg-gray-50"
            >
              View Transaction History
            </button>
          </div>
        </div>
      </div>

      {/* Insurance Card (for non-practitioners) */}
      {!isPractitioner && (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">My Insurance</h2>
              <span className="text-2xl">🛡️</span>
            </div>
            
            {mockInsuranceCards.length > 0 ? (
              <>
                <p className="text-gray-600 mb-4">
                  You have {mockInsuranceCards.length} active insurance {mockInsuranceCards.length === 1 ? 'plan' : 'plans'}
                </p>
                <button
                  onClick={() => navigate('/insurance/my')}
                  className="w-full bg-primary-500 text-white py-2 px-4 rounded-xl hover:bg-primary-600"
                >
                  View Insurance Cards
                </button>
              </>
            ) : (
              <>
                <p className="text-gray-600 mb-4">
                  You don't have any active insurance plans
                </p>
                <button
                  onClick={() => navigate('/insurance/market')}
                  className="w-full bg-primary-500 text-white py-2 px-4 rounded-xl hover:bg-primary-600"
                >
                  Browse Insurance Plans
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Notifications Card */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl text-gray-800">Notifications</h2>
            <button
              onClick={() => navigate('/notifications')}
              className="text-primary-500 hover:text-primary-600 font-medium text-sm"
            >
              View All
            </button>
          </div>
          <div className="space-y-3">
            {isPractitioner ? (
              <>
                <div className="p-3 bg-primary-50 rounded-lg">
                  <h3 className="font-medium">New Consultation Request</h3>
                  <p className="text-sm text-gray-600 mt-1">John Doe has requested a consultation.</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h3 className="font-medium">Payment Received</h3>
                  <p className="text-sm text-gray-600 mt-1">You received a payment of $50 from Sarah Smith.</p>
                </div>
              </>
            ) : (
              <>
                <div className="p-3 bg-primary-50 rounded-lg">
                  <h3 className="font-medium">Consultation Reminder</h3>
                  <p className="text-sm text-gray-600 mt-1">Your consultation with Dr. Li Wei is scheduled for tomorrow.</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h3 className="font-medium">Health Assessment Due</h3>
                  <p className="text-sm text-gray-600 mt-1">It's time for your monthly health assessment.</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="w-full bg-red-500 text-white py-3 px-4 rounded-xl hover:bg-red-600 font-medium mt-auto"
      >
        Log Out
      </button>

      {/* Dialogs */}
      {!isPractitioner && (
        <TopUpDialog
          isOpen={isTopUpDialogOpen}
          onClose={() => setIsTopUpDialogOpen(false)}
          onTopUp={topUp}
        />
      )}
      
      {isPractitioner && (
        <CashoutDialog
          isOpen={isCashoutDialogOpen}
          onClose={() => setIsCashoutDialogOpen(false)}
          onCashout={handleCashout}
          balance={balance}
        />
      )}
    </div>
  );
}