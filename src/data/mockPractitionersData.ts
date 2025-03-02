import { Practitioner, Clinic, PractitionerCategory } from '../types/practitioners';

export const practitioners: Practitioner[] = [
  {
    id: '1',
    name: 'Dr. Li Wei',
    specialty: 'Traditional Chinese Medicine',
    categories: ['Acupuncture', 'Herbal Medicine'],
    rating: 4.8,
    location: 'TCM Wellness Center',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&auto=format&fit=crop&q=80',
    introduction: 'Dr. Li Wei has over 15 years of experience in Traditional Chinese Medicine, specializing in acupuncture and herbal remedies. He received his training from Beijing University of Chinese Medicine.',
    phone: '(555) 123-4567',
    clinicId: '1',
    inquiryPrice: 50,
    primaryRegion: 'ON',
    reviews: [
      {
        id: '1',
        author: 'Sarah M.',
        rating: 5,
        date: '2024-02-15',
        content: 'Dr. Li is amazing! His acupuncture treatment helped with my chronic back pain.'
      },
      {
        id: '2',
        author: 'John D.',
        rating: 4.2,
        date: '2024-02-10',
        content: 'Very knowledgeable and professional. The herbal medicine he prescribed worked well.'
      }
    ]
  },
  {
    id: '2',
    name: 'Dr. Chen Yu',
    specialty: 'Pain Management Specialist',
    categories: ['Acupuncture', 'Physical Therapy'],
    rating: 4.5,
    location: 'Eastern Harmony Clinic',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&auto=format&fit=crop&q=80',
    introduction: 'Dr. Chen Yu specializes in pain management through acupuncture and traditional techniques. With 10 years of experience, she combines modern and traditional approaches.',
    phone: '(555) 234-5678',
    clinicId: '2',
    inquiryPrice: 45,
    primaryRegion: 'BC',
    reviews: [
      {
        id: '3',
        author: 'Michael R.',
        rating: 4.8,
        date: '2024-02-14',
        content: 'Dr. Chen\'s pain management techniques are very effective. Highly recommended!'
      },
      {
        id: '4',
        author: 'Emily W.',
        rating: 4.5,
        date: '2024-02-08',
        content: 'Great experience with Dr. Chen. Very thorough and professional.'
      }
    ]
  },
  {
    id: '3',
    name: 'Dr. Zhang Wei',
    specialty: 'Herbal Medicine Expert',
    categories: ['Herbal Medicine'],
    rating: 4.9,
    location: 'TCM Wellness Center',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&auto=format&fit=crop&q=80',
    introduction: 'Dr. Zhang Wei is a renowned expert in herbal medicine with 20 years of experience. He specializes in creating personalized herbal formulations for various health conditions.',
    phone: '(555) 345-6789',
    clinicId: '1',
    inquiryPrice: 55,
    primaryRegion: 'AB',
    reviews: [
      {
        id: '5',
        author: 'David L.',
        rating: 5,
        date: '2024-02-13',
        content: 'Dr. Zhang\'s herbal prescriptions have helped me tremendously with my digestive issues.'
      }
    ]
  },
  {
    id: '4',
    name: 'Dr. Liu Mei',
    specialty: 'Physical Therapy & Rehabilitation',
    categories: ['Physical Therapy', 'Acupuncture'],
    rating: 4.7,
    location: 'Eastern Harmony Clinic',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&auto=format&fit=crop&q=80',
    introduction: 'Dr. Liu Mei combines physical therapy with acupuncture to provide comprehensive rehabilitation care. She has helped numerous patients recover from injuries and chronic conditions.',
    phone: '(555) 456-7890',
    clinicId: '2',
    inquiryPrice: 48,
    primaryRegion: 'QC',
    reviews: [
      {
        id: '6',
        author: 'Robert K.',
        rating: 4.7,
        date: '2024-02-12',
        content: 'Dr. Liu\'s combination of physical therapy and acupuncture helped me recover from my sports injury faster than expected.'
      }
    ]
  },
  {
    id: '5',
    name: 'Dr. Wang Jun',
    specialty: 'Holistic Health Practitioner',
    categories: ['Acupuncture', 'Herbal Medicine', 'Physical Therapy'],
    rating: 4.6,
    location: 'TCM Wellness Center',
    image: 'https://images.unsplash.com/photo-1622902046580-2b47f47f5471?w=400&auto=format&fit=crop&q=80',
    introduction: 'Dr. Wang Jun takes a holistic approach to health, integrating various TCM practices. He specializes in treating complex health conditions using multiple therapeutic methods.',
    phone: '(555) 567-8901',
    clinicId: '1',
    inquiryPrice: 52,
    primaryRegion: 'MB',
    reviews: [
      {
        id: '7',
        author: 'Jennifer P.',
        rating: 4.6,
        date: '2024-02-11',
        content: 'Dr. Wang\'s comprehensive approach has made a significant difference in my overall health.'
      }
    ]
  }
];

export const clinics: Clinic[] = [
  {
    id: '1',
    name: 'TCM Wellness Center',
    address: '123 Healing Street, Suite 101',
    phone: '(555) 123-4567',
    rating: 4.8,
    description: 'A leading Traditional Chinese Medicine center offering comprehensive treatments including acupuncture, herbal medicine, and holistic healing approaches.',
    bookingUrl: '#',
    reviews: [
      {
        id: '1',
        author: 'Sarah M.',
        rating: 5,
        date: '2024-02-15',
        content: 'Excellent facility with a calming atmosphere. The practitioners are highly skilled.'
      },
      {
        id: '2',
        author: 'John D.',
        rating: 4.2,
        date: '2024-02-10',
        content: 'Clean, professional environment. Very satisfied with the services.'
      }
    ],
    coordinates: {
      x: 30,
      y: 40
    }
  },
  {
    id: '2',
    name: 'Eastern Harmony Clinic',
    address: '456 Wellness Avenue',
    phone: '(555) 234-5678',
    rating: 4.3,
    description: 'Specializing in pain management and holistic healing through traditional Chinese medicine techniques.',
    bookingUrl: '#',
    reviews: [
      {
        id: '3',
        author: 'Michael R.',
        rating: 4.8,
        date: '2024-02-14',
        content: 'Great location and excellent service. The staff is very professional.'
      },
      {
        id: '4',
        author: 'Emily W.',
        rating: 4.5,
        date: '2024-02-08',
        content: 'Modern facility with traditional values. Highly recommended.'
      }
    ],
    coordinates: {
      x: 60,
      y: 70
    }
  }
];