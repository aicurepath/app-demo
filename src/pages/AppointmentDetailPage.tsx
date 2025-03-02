import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppointments } from '../hooks/useAppointments';
import { useAuth } from '../hooks/useAuth';
import BackButton from '../components/shared/BackButton';
import { showError } from '../components/notifications/toast';
import { VideoIcon, PhoneIcon, CalendarIcon, MapPinIcon, CurrencyDollarIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function AppointmentDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getAppointmentById, cancelAppointment } = useAppointments();
  const [appointment, setAppointment] = useState(id ? getAppointmentById(id) : undefined);
  const [isCanceling, setIsCanceling] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const isPractitioner = user?.role === 'practitioner';
  const isUserAppointment = user?.id === appointment?.userId;
  const isPractitionerAppointment = user?.id === appointment?.practitionerId;
  
  useEffect(() => {
    if (id) {
      setAppointment(getAppointmentById(id));
    }
  }, [id, getAppointmentById]);
  
  if (!appointment) {
    return (
      <div className="max-w-lg mx-auto p-4">
        <div className="bg-white rounded-2xl shadow-md p-6 text-center">
          <p className="text-gray-600">Appointment not found</p>
          <button
            onClick={() => navigate('/appointments')}
            className="mt-4 px-4 py-2 bg-primary-500 text-white rounded-lg"
          >
            View All Appointments
          </button>
        </div>
      </div>
    );
  }
  
  const handleCancel = async () => {
    if (!id) return;
    
    setIsCanceling(true);
    try {
      await cancelAppointment(id);
      setAppointment(getAppointmentById(id));
    } catch (error) {
      showError('Failed to cancel appointment');
    } finally {
      setIsCanceling(false);
      setShowConfirmation(false);
    }
  };
  
  const handleStartVideo = () => {
    if (appointment.type !== 'video') {
      showError('This is not a video appointment');
      return;
    }
    
    // In a real app, this would start a video call
    alert('Video call would start here in a real application');
  };
  
  // Format date and time
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
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
    <div className="max-w-lg mx-auto">
      <div className="p-4 bg-white border-b sticky top-0 z-10">
        <div className="relative">
          <BackButton />
          <h1 className="text-lg font-medium text-center">Appointment Details</h1>
        </div>
      </div>
      
      <div className="p-4 space-y-6">
        {/* Status Banner */}
        <div className={`p-4 rounded-xl text-center font-medium ${
          appointment.status === 'upcoming' 
            ? 'bg-primary-50 text-primary-700' 
            : appointment.status === 'completed'
            ? 'bg-green-50 text-green-700'
            : 'bg-red-50 text-red-700'
        }`}>
          {appointment.status === 'upcoming' 
            ? 'Upcoming Appointment' 
            : appointment.status === 'completed'
            ? 'Completed Appointment'
            : 'Canceled Appointment'}
        </div>
        
        {/* Appointment Info */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex items-center space-x-4 mb-6">
            <img 
              src={isPractitioner ? '/user-avatar.png' : appointment.practitionerImage}
              alt={isPractitioner ? appointment.userName : appointment.practitionerName}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h2 className="text-xl font-bold">
                {isPractitioner ? appointment.userName : appointment.practitionerName}
              </h2>
              <p className="text-gray-600">
                {appointment.type === 'video' ? 'Video Consultation' : 'In-Person Visit'}
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <CalendarIcon className="w-5 h-5 text-gray-500" />
              <div>
                <div className="font-medium">Date</div>
                <div>{formatDate(appointment.date)}</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <ClockIcon className="w-5 h-5 text-gray-500" />
              <div>
                <div className="font-medium">Time</div>
                <div>{formatTime(appointment.startTime)} - {formatTime(appointment.endTime)}</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {appointment.type === 'video' ? (
                <VideoIcon className="w-5 h-5 text-gray-500" />
              ) : (
                <MapPinIcon className="w-5 h-5 text-gray-500" />
              )}
              <div>
                <div className="font-medium">Type</div>
                <div>
                  {appointment.type === 'video' 
                    ? 'Video Consultation' 
                    : 'In-Person Visit at the clinic'}
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <CurrencyDollarIcon className="w-5 h-5 text-gray-500" />
              <div>
                <div className="font-medium">Payment</div>
                <div>
                  {appointment.paidWithInsurance 
                    ? 'Covered by insurance' 
                    : `$${appointment.price} paid from balance`}
                </div>
              </div>
            </div>
            
            {appointment.notes && (
              <div className="border-t pt-4 mt-4">
                <h3 className="font-medium mb-2">Notes</h3>
                <p className="text-gray-600">{appointment.notes}</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Action Buttons */}
        {isUpcoming && (
          <div className="space-y-3">
            {appointment.type === 'video' && (
              <button
                onClick={handleStartVideo}
                className="w-full flex items-center justify-center space-x-2 bg-primary-500 text-white py-3 px-4 rounded-xl hover:bg-primary-600 font-medium"
              >
                <VideoIcon className="w-5 h-5" />
                <span>Start Video Call</span>
              </button>
            )}
            
            {isUserAppointment && (
              <button
                onClick={() => setShowConfirmation(true)}
                className="w-full flex items-center justify-center space-x-2 bg-white border border-red-500 text-red-500 py-3 px-4 rounded-xl hover:bg-red-50 font-medium"
              >
                <span>Cancel Appointment</span>
              </button>
            )}
          </div>
        )}
      </div>
      
      {/* Confirmation Dialog */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Cancel Appointment</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to cancel this appointment? 
              {!appointment.paidWithInsurance && " You will receive a full refund to your balance."}
            </p>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                disabled={isCanceling}
              >
                Keep Appointment
              </button>
              <button
                onClick={handleCancel}
                disabled={isCanceling}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
              >
                {isCanceling ? 'Canceling...' : 'Yes, Cancel'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}