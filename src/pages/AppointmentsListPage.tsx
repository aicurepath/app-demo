import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppointments } from '../hooks/useAppointments';
import { useAuth } from '../hooks/useAuth';
import { Appointment } from '../types/appointment';
import BackButton from '../components/shared/BackButton';
import { VideoIcon, MapPinIcon } from '@heroicons/react/24/outline';

export default function AppointmentsListPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getAppointmentsByUser, getAppointmentsByPractitioner } = useAppointments();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');
  
  const isPractitioner = user?.role === 'practitioner';
  
  useEffect(() => {
    if (user) {
      const userAppointments = isPractitioner 
        ? getAppointmentsByPractitioner(user.id)
        : getAppointmentsByUser(user.id);
      
      let filteredAppointments = [...userAppointments];
      
      // Apply filter
      if (filter === 'upcoming') {
        filteredAppointments = filteredAppointments.filter(
          a => a.status === 'upcoming' && new Date(`${a.date}T${a.startTime}`) > new Date()
        );
      } else if (filter === 'past') {
        filteredAppointments = filteredAppointments.filter(
          a => a.status === 'completed' || a.status === 'canceled' || 
               (a.status === 'upcoming' && new Date(`${a.date}T${a.startTime}`) <= new Date())
        );
      }
      
      // Sort by date (newest first for past, oldest first for upcoming)
      filteredAppointments.sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.startTime}`);
        const dateB = new Date(`${b.date}T${b.startTime}`);
        return filter === 'past' ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
      });
      
      setAppointments(filteredAppointments);
    }
  }, [user, filter, getAppointmentsByUser, getAppointmentsByPractitioner, isPractitioner]);
  
  // Format date and time
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };
  
  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };
  
  return (
    <div className="max-w-lg mx-auto">
      <div className="p-4 bg-white border-b sticky top-0 z-10">
        <div className="relative">
          <BackButton />
          <h1 className="text-lg font-medium text-center">My Appointments</h1>
        </div>
      </div>
      
      <div className="p-4 space-y-6">
        {/* Filter Tabs */}
        <div className="flex space-x-2 mb-6">
          {['all', 'upcoming', 'past'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab as 'all' | 'upcoming' | 'past')}
              className={`flex-1 py-2 px-4 rounded-xl font-medium transition-colors ${
                filter === tab
                  ? 'bg-primary-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-primary-50'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        
        {/* Appointments List */}
        {appointments.length > 0 ? (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <button
                key={appointment.id}
                onClick={() => navigate(`/appointments/${appointment.id}`)}
                className="w-full bg-white rounded-xl shadow-md p-4 text-left hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={isPractitioner ? '/user-avatar.png' : appointment.practitionerImage}
                      alt={isPractitioner ? appointment.userName : appointment.practitionerName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold">
                        {isPractitioner ? appointment.userName : appointment.practitionerName}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500">
                        {appointment.type === 'video' ? (
                          <VideoIcon className="w-4 h-4 mr-1" />
                        ) : (
                          <MapPinIcon className="w-4 h-4 mr-1" />
                        )}
                        <span>
                          {appointment.type === 'video' ? 'Video Call' : 'In-Person'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    appointment.status === 'upcoming' 
                      ? 'bg-primary-50 text-primary-700' 
                      : appointment.status === 'completed'
                      ? 'bg-green-50 text-green-700'
                      : 'bg-red-50 text-red-700'
                  }`}>
                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-3 text-sm">
                  <div className="text-gray-600">
                    {formatDate(appointment.date)} • {formatTime(appointment.startTime)}
                  </div>
                  <div className="font-medium">
                    {appointment.paidWithInsurance ? 'Insurance' : `$${appointment.price}`}
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <p className="text-gray-500 mb-4">No appointments found</p>
            {!isPractitioner && (
              <button
                onClick={() => navigate('/practitioners')}
                className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
              >
                Find a Practitioner
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}