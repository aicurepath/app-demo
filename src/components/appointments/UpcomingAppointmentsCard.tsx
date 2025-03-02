import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useAppointments } from '../../hooks/useAppointments';
import { Appointment } from '../../types/appointment';
import AppointmentCard from './AppointmentCard';

export default function UpcomingAppointmentsCard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getUpcomingAppointments } = useAppointments();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  
  const isPractitioner = user?.role === 'practitioner';
  
  useEffect(() => {
    if (user) {
      const upcomingAppointments = getUpcomingAppointments(user.id);
      setAppointments(upcomingAppointments.slice(0, 2)); // Show only 2 most recent
    }
  }, [user, getUpcomingAppointments]);
  
  if (appointments.length === 0) {
    return null;
  }
  
  return (
    <div className="bg-white rounded-2xl shadow-card p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl text-gray-800">Upcoming Appointments</h2>
        <button
          onClick={() => navigate('/appointments')}
          className="text-primary-500 hover:text-primary-600 font-medium text-sm"
        >
          View All
        </button>
      </div>
      <div className="space-y-3">
        {appointments.map(appointment => (
          <AppointmentCard 
            key={appointment.id} 
            appointment={appointment}
            isPractitioner={isPractitioner}
          />
        ))}
      </div>
    </div>
  );
}