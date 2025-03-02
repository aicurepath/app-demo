import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useAppointments } from '../../hooks/useAppointments';
import { Appointment } from '../../types/appointment';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export default function PractitionerCalendar() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getAppointmentsByPractitioner } = useAppointments();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState<Date[]>([]);
  
  useEffect(() => {
    if (user?.id) {
      const practitionerAppointments = getAppointmentsByPractitioner(user.id);
      setAppointments(practitionerAppointments.filter(a => a.status === 'upcoming'));
    }
  }, [user, getAppointmentsByPractitioner]);
  
  useEffect(() => {
    // Generate calendar days for the current week
    const days: Date[] = [];
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay()); // Start from Sunday
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    
    setCalendarDays(days);
  }, [currentDate]);
  
  const handlePrevWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(newDate);
  };
  
  const handleNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(newDate);
  };
  
  const getAppointmentsForDay = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return appointments.filter(a => a.date === dateString);
  };
  
  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };
  
  return (
    <div className="bg-white rounded-2xl shadow-card p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl text-gray-800">My Calendar</h2>
        <div className="flex space-x-2">
          <button
            onClick={handlePrevWeek}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          <button
            onClick={handleNextWeek}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-2 mb-4">
        {calendarDays.map((day, index) => (
          <div key={index} className="text-center">
            <div className="text-xs text-gray-500">
              {day.toLocaleDateString('en-US', { weekday: 'short' })}
            </div>
            <div className={`text-sm font-medium rounded-full w-8 h-8 mx-auto flex items-center justify-center ${
              day.toDateString() === new Date().toDateString()
                ? 'bg-primary-500 text-white'
                : ''
            }`}>
              {day.getDate()}
            </div>
          </div>
        ))}
      </div>
      
      <div className="space-y-3">
        {calendarDays.map((day, index) => {
          const dayAppointments = getAppointmentsForDay(day);
          if (dayAppointments.length === 0) return null;
          
          return (
            <div key={index} className="border-t pt-3 first:border-t-0 first:pt-0">
              <h3 className="font-medium mb-2">
                {day.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
              </h3>
              <div className="space-y-2">
                {dayAppointments.map(appointment => (
                  <button
                    key={appointment.id}
                    onClick={() => navigate(`/appointments/${appointment.id}`)}
                    className="w-full flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        appointment.type === 'video' ? 'bg-blue-500' : 'bg-green-500'
                      }`} />
                      <span className="font-medium">{appointment.userName}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {formatTime(appointment.startTime)}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
        
        {!calendarDays.some(day => getAppointmentsForDay(day).length > 0) && (
          <div className="text-center text-gray-500 py-4">
            No appointments this week
          </div>
        )}
      </div>
    </div>
  );
}