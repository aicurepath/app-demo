import { useNavigate } from 'react-router-dom';
import { Appointment } from '../../types/appointment';
import { VideoIcon, MapPinIcon } from '@heroicons/react/24/outline';

interface AppointmentCardProps {
  appointment ```
interface AppointmentCardProps {
  appointment: Appointment;
  isPractitioner?: boolean;
}

export default function AppointmentCard({ appointment, isPractitioner = false }: AppointmentCardProps) {
  const navigate = useNavigate();
  
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
  
  const isUpcoming = appointment.status === 'upcoming' && new Date(`${appointment.date}T${appointment.startTime}`) > new Date();
  
  return (
    <div 
      onClick={() => navigate(`/appointments/${appointment.id}`)}
      className="bg-white rounded-xl shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow"
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
        {isUpcoming && (
          <div className="bg-primary-50 text-primary-700 px-2 py-1 rounded-full text-xs font-medium">
            Upcoming
          </div>
        )}
      </div>
      
      <div className="flex justify-between items-center mt-3 text-sm">
        <div className="text-gray-600">
          {formatDate(appointment.date)} • {formatTime(appointment.startTime)}
        </div>
      </div>
    </div>
  );
}
```
}