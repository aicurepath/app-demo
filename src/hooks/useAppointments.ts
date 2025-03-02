import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Appointment, TimeSlot, AppointmentStatus } from '../types/appointment';
import { generateUniqueId } from '../utils/helpers';
import { usePayment } from './usePayment';
import { showSuccess } from '../components/notifications/toast';

interface AppointmentState {
  appointments: Appointment[];
  addAppointment: (appointment: Omit<Appointment, 'id' | 'createdAt'>) => string;
  cancelAppointment: (id: string) => Promise<boolean>;
  getAppointmentsByUser: (userId: string) => Appointment[];
  getAppointmentsByPractitioner: (practitionerId: string) => Appointment[];
  getUpcomingAppointments: (userId: string) => Appointment[];
  getAppointmentById: (id: string) => Appointment | undefined;
  updateAppointmentStatus: (id: string, status: AppointmentStatus) => void;
}

export const useAppointments = create<AppointmentState>()(
  persist(
    (set, get) => ({
      appointments: [],
      
      addAppointment: (appointmentData) => {
        const id = generateUniqueId();
        const appointment: Appointment = {
          ...appointmentData,
          id,
          createdAt: new Date().toISOString(),
          status: 'upcoming'
        };
        
        set((state) => ({
          appointments: [...state.appointments, appointment]
        }));
        
        return id;
      },
      
      cancelAppointment: async (id) => {
        const { makePayment } = usePayment.getState();
        const appointment = get().appointments.find(a => a.id === id);
        
        if (!appointment || appointment.status !== 'upcoming') {
          return false;
        }
        
        // Process refund
        if (!appointment.paidWithInsurance) {
          await makePayment(-appointment.price, 'Appointment cancellation refund');
        }
        
        set((state) => ({
          appointments: state.appointments.map(a => 
            a.id === id ? { ...a, status: 'canceled' } : a
          )
        }));
        
        showSuccess('Appointment canceled successfully');
        return true;
      },
      
      getAppointmentsByUser: (userId) => {
        return get().appointments.filter(a => a.userId === userId);
      },
      
      getAppointmentsByPractitioner: (practitionerId) => {
        return get().appointments.filter(a => a.practitionerId === practitionerId);
      },
      
      getUpcomingAppointments: (userId) => {
        return get().appointments.filter(a => 
          a.userId === userId && 
          a.status === 'upcoming' && 
          new Date(a.date) >= new Date()
        );
      },
      
      getAppointmentById: (id) => {
        return get().appointments.find(a => a.id === id);
      },
      
      updateAppointmentStatus: (id, status) => {
        set((state) => ({
          appointments: state.appointments.map(a => 
            a.id === id ? { ...a, status } : a
          )
        }));
      }
    }),
    {
      name: 'appointments-storage'
    }
  )
);

// Mock available time slots for practitioners
export function getAvailableTimeSlots(practitionerId: string, startDate: Date, days: number = 7): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const currentDate = new Date(startDate);
  
  // Generate time slots for the next 'days' days
  for (let day = 0; day < days; day++) {
    const date = new Date(currentDate);
    date.setDate(date.getDate() + day);
    
    // Skip if weekend (0 = Sunday, 6 = Saturday)
    if (date.getDay() === 0 || date.getDay() === 6) {
      continue;
    }
    
    // Generate slots for this day (9 AM to 5 PM, 1-hour slots)
    for (let hour = 9; hour < 17; hour++) {
      const startTime = `${hour.toString().padStart(2, '0')}:00`;
      const endTime = `${(hour + 1).toString().padStart(2, '0')}:00`;
      
      // Randomly mark some slots as unavailable
      const isAvailable = Math.random() > 0.3;
      
      slots.push({
        id: generateUniqueId(),
        date: date.toISOString().split('T')[0],
        startTime,
        endTime,
        isAvailable
      });
    }
  }
  
  return slots;
}