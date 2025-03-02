import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { practitioners } from '../data/mockPractitionersData';
import { useAuth } from '../hooks/useAuth';
import { usePayment } from '../hooks/usePayment';
import { useAppointments, getAvailableTimeSlots } from '../hooks/useAppointments';
import { TimeSlot, AppointmentType } from '../types/appointment';
import { mockInsuranceCards } from '../data/mockInsurance';
import BackButton from '../components/shared/BackButton';
import { showSuccess, showError } from '../components/notifications/toast';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export default function BookAppointmentPage() {
  const { practitionerId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { balance, makePayment } = usePayment();
  const { addAppointment } = useAppointments();
  
  const practitioner = practitioners.find(p => p.id === practitionerId);
  
  const [currentDate, setCurrentDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [appointmentType, setAppointmentType] = useState<AppointmentType>('video');
  const [paymentMethod, setPaymentMethod] = useState<'balance' | string>('balance');
  const [notes, setNotes] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const appointmentPrice = practitioner ? practitioner.inquiryPrice * 2 : 0;
  
  useEffect(() => {
    if (practitionerId) {
      const slots = getAvailableTimeSlots(practitionerId, currentDate);
      setTimeSlots(slots);
    }
  }, [practitionerId, currentDate]);
  
  if (!practitioner || !user) {
    return (
      <div className="max-w-lg mx-auto p-4">
        <div className="bg-white rounded-2xl shadow-md p-6 text-center">
          <p className="text-gray-600">Practitioner not found or you need to log in first.</p>
          <button
            onClick={() => navigate('/login')}
            className="mt-4 px-4 py-2 bg-primary-500 text-white rounded-lg"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }
  
  const handleDateChange = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setDate(newDate.getDate() + 7);
    }
    setCurrentDate(newDate);
  };
  
  const handleBookAppointment = async () => {
    if (!selectedSlot) {
      showError('Please select a time slot');
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Process payment
      const useInsurance = paymentMethod !== 'balance';
      
      if (!useInsurance) {
        // Check if user has enough balance
        if (balance < appointmentPrice) {
          showError('Insufficient balance. Please top up your account.');
          setIsProcessing(false);
          return;
        }
        
        // Process payment from balance
        const paymentSuccess = await makePayment(
          appointmentPrice, 
          `Appointment with ${practitioner.name}`
        );
        
        if (!paymentSuccess) {
          throw new Error('Payment failed');
        }
      }
      
      // Create appointment
      const appointmentId = addAppointment({
        practitionerId: practitioner.id,
        practitionerName: practitioner.name,
        practitionerImage: practitioner.image,
        userId: user.id,
        userName: user.name,
        date: selectedSlot.date,
        startTime: selectedSlot.startTime,
        endTime: selectedSlot.endTime,
        type: appointmentType,
        price: appointmentPrice,
        paidWithInsurance: useInsurance,
        notes: notes.trim() || undefined,
        status: 'upcoming'
      });
      
      showSuccess('Appointment booked successfully!');
      navigate(`/appointments/${appointmentId}`);
    } catch (error) {
      showError('Failed to book appointment. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Group time slots by date
  const slotsByDate: Record<string, TimeSlot[]> = {};
  timeSlots.forEach(slot => {
    if (!slotsByDate[slot.date]) {
      slotsByDate[slot.date] = [];
    }
    slotsByDate[slot.date].push(slot);
  });
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  return (
    <div className="max-w-lg mx-auto">
      <div className="p-4 bg-white border-b sticky top-0 z-10">
        <div className="relative">
          <BackButton />
          <h1 className="text-lg font-medium text-center">Book Appointment</h1>
        </div>
      </div>
      
      <div className="p-4 space-y-6">
        {/* Practitioner Info */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex items-center space-x-4">
            <img 
              src={practitioner.image} 
              alt={practitioner.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h2 className="text-xl font-bold">{practitioner.name}</h2>
              <p className="text-gray-600">{practitioner.specialty}</p>
            </div>
          </div>
        </div>
        
        {/* Calendar */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <button 
              onClick={() => handleDateChange('prev')}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-semibold">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h2>
            <button 
              onClick={() => handleDateChange('next')}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-6">
            {Object.keys(slotsByDate).length > 0 ? (
              Object.entries(slotsByDate).map(([date, slots]) => (
                <div key={date} className="border-b pb-4 last:border-b-0 last:pb-0">
                  <h3 className="font-medium mb-2">{formatDate(date)}</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {slots.map(slot => (
                      <button
                        key={slot.id}
                        onClick={() => setSelectedSlot(slot.isAvailable ? slot : null)}
                        disabled={!slot.isAvailable}
                        className={`py-2 px-3 rounded-lg text-center text-sm ${
                          selectedSlot?.id === slot.id
                            ? 'bg-primary-500 text-white'
                            : slot.isAvailable
                            ? 'bg-white border border-gray-200 hover:border-primary-200'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {slot.startTime}
                      </button>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No available slots for this week</p>
            )}
          </div>
        </div>
        
        {/* Appointment Type */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Appointment Type</h2>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setAppointmentType('video')}
              className={`p-4 rounded-xl text-center ${
                appointmentType === 'video'
                  ? 'bg-primary-50 border-2 border-primary-500 text-primary-700'
                  : 'bg-white border border-gray-200'
              }`}
            >
              <span className="block text-2xl mb-2">📹</span>
              <span className="font-medium">Video Call</span>
            </button>
            <button
              onClick={() => setAppointmentType('in-person')}
              className={`p-4 rounded-xl text-center ${
                appointmentType === 'in-person'
                  ? 'bg-primary-50 border-2 border-primary-500 text-primary-700'
                  : 'bg-white border border-gray-200'
              }`}
            >
              <span className="block text-2xl mb-2">👨‍⚕️</span>
              <span className="font-medium">In-Person Visit</span>
            </button>
          </div>
        </div>
        
        {/* Notes */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Additional Notes</h2>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any notes or specific concerns for the practitioner..."
            className="w-full border rounded-lg p-3 h-32 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        
        {/* Payment */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <input
                type="radio"
                id="balance"
                checked={paymentMethod === 'balance'}
                onChange={() => setPaymentMethod('balance')}
                className="h-4 w-4 text-primary-500 focus:ring-primary-500"
              />
              <label htmlFor="balance" className="flex-1">
                <div className="font-medium">Pay with Balance</div>
                <div className="text-sm text-gray-500">Available: ${balance}</div>
              </label>
              <span className="font-bold">${appointmentPrice}</span>
            </div>
            
            {mockInsuranceCards.map(card => (
              <div key={card.id} className="flex items-center space-x-3">
                <input
                  type="radio"
                  id={card.id}
                  checked={paymentMethod === card.id}
                  onChange={() => setPaymentMethod(card.id)}
                  className="h-4 w-4 text-primary-500 focus:ring-primary-500"
                />
                <label htmlFor={card.id} className="flex-1">
                  <div className="font-medium">{card.productName}</div>
                  <div className="text-sm text-gray-500">{card.memberNumber}</div>
                </label>
                <span className="font-bold text-green-600">Covered</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Booking Button */}
        <button
          onClick={handleBookAppointment}
          disabled={!selectedSlot || isProcessing}
          className="w-full bg-primary-500 text-white py-3 px-4 rounded-xl hover:bg-primary-600 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? 'Processing...' : `Book Appointment • ${paymentMethod === 'balance' ? `$${appointmentPrice}` : 'Insurance'}`}
        </button>
      </div>
    </div>
  );
}