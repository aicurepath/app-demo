export type AppointmentType = 'video' | 'in-person';
export type AppointmentStatus = 'upcoming' | 'completed' | 'canceled';

export interface TimeSlot {
  id: string;
  date: string; // ISO date string
  startTime: string; // Format: "HH:MM"
  endTime: string; // Format: "HH:MM"
  isAvailable: boolean;
}

export interface Appointment {
  id: string;
  practitionerId: string;
  practitionerName: string;
  practitionerImage?: string;
  userId: string;
  userName: string;
  date: string; // ISO date string
  startTime: string; // Format: "HH:MM"
  endTime: string; // Format: "HH:MM"
  type: AppointmentType;
  status: AppointmentStatus;
  price: number;
  paidWithInsurance: boolean;
  notes?: string;
  createdAt: string; // ISO date string
}