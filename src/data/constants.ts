import { PractitionerRegion, PractitionerCategory } from '../types/practitioners';

export const REGIONS: { value: PractitionerRegion; label: string }[] = [
  { value: 'ON', label: 'Ontario' },
  { value: 'BC', label: 'British Columbia' },
  { value: 'AB', label: 'Alberta' },
  { value: 'QC', label: 'Quebec' },
  { value: 'MB', label: 'Manitoba' },
  { value: 'SK', label: 'Saskatchewan' },
  { value: 'NS', label: 'Nova Scotia' },
  { value: 'NB', label: 'New Brunswick' },
  { value: 'NL', label: 'Newfoundland and Labrador' },
  { value: 'PE', label: 'Prince Edward Island' }
];

export const SPECIALTIES: PractitionerCategory[] = [
  'Acupuncture',
  'Herbal Medicine',
  'Physical Therapy'
];