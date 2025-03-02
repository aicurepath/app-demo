export type PractitionerCategory = 'Acupuncture' | 'Herbal Medicine' | 'Physical Therapy';
export type PractitionerRegion = 'ON' | 'BC' | 'AB' | 'QC' | 'MB' | 'SK' | 'NS' | 'NB' | 'NL' | 'PE';

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  content: string;
}

export interface Practitioner {
  id: string;
  name: string;
  specialty: string;
  categories: PractitionerCategory[];
  rating: number;
  location: string;
  image: string;
  introduction: string;
  phone: string;
  clinicId: string;
  reviews: Review[];
  inquiryPrice: number;
  primaryRegion: PractitionerRegion;
}

export interface Clinic {
  id: string;
  name: string;
  address: string;
  phone: string;
  rating: number;
  description: string;
  bookingUrl: string;
  reviews: Review[];
  coordinates: {
    x: number;
    y: number;
  };
}