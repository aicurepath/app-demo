import { InsuranceProduct, InsuranceCard } from '../types/insurance';

export const insuranceProducts: InsuranceProduct[] = [
  {
    id: '1',
    name: 'TCM Essential Care',
    provider: 'HealthGuard Insurance',
    pricePerYear: 599,
    description: 'Comprehensive TCM coverage including acupuncture, herbal medicine, and consultations',
    coverageDetails: [
      'Unlimited online TCM consultations',
      'Up to 24 acupuncture sessions per year',
      'Herbal medicine coverage up to $1,000/year',
      'No waiting period for basic services'
    ],
    benefits: [
      'No deductible',
      'Direct billing available',
      'Access to premium TCM network',
      '24/7 health advice hotline'
    ],
    terms: [
      'Must be between 18-65 years old',
      'Pre-existing conditions have 6-month waiting period',
      'Annual contract with auto-renewal',
      'Cancel anytime with 30-day notice'
    ]
  },
  {
    id: '2',
    name: 'TCM Plus',
    provider: 'Eastern Wellness Insurance',
    pricePerYear: 899,
    description: 'Premium coverage for all your Traditional Chinese Medicine needs',
    coverageDetails: [
      'Unlimited TCM consultations (online & in-person)',
      'Unlimited acupuncture sessions',
      'Herbal medicine coverage up to $2,000/year',
      'Includes preventive care services'
    ],
    benefits: [
      'No deductible or copay',
      'Priority booking at partner clinics',
      'Family discount available',
      'Wellness rewards program'
    ],
    terms: [
      'Available for ages 18-70',
      '3-month waiting period for specialized treatments',
      'Annual contract required',
      'Free cancellation within first 30 days'
    ]
  },
  {
    id: '3',
    name: 'Basic TCM Care',
    provider: 'CareFirst Insurance',
    pricePerYear: 399,
    description: 'Affordable coverage for essential TCM services',
    coverageDetails: [
      '12 online TCM consultations per year',
      '12 acupuncture sessions per year',
      'Herbal medicine coverage up to $500/year',
      'Basic preventive care'
    ],
    benefits: [
      'Low monthly payments',
      'No referral needed',
      'Basic TCM network access',
      'Online claim submission'
    ],
    terms: [
      'Ages 18-60 eligible',
      '6-month waiting period',
      'Annual contract',
      'Standard cancellation terms'
    ]
  },
  {
    id: '4',
    name: 'Family TCM Shield',
    provider: 'FamilyCare Insurance',
    pricePerYear: 1299,
    description: 'Comprehensive family coverage for up to 4 family members',
    coverageDetails: [
      'Unlimited consultations for all members',
      '48 total acupuncture sessions per year',
      'Herbal medicine coverage up to $3,000/year',
      'Family preventive care package'
    ],
    benefits: [
      'Cover up to 4 family members',
      'Shared or individual limits',
      'Family wellness programs',
      'Emergency TCM support'
    ],
    terms: [
      'Primary member must be 18-65',
      'Dependents under 21 eligible',
      'Annual family contract',
      'Flexible payment options'
    ]
  },
  {
    id: '5',
    name: 'Senior TCM Care',
    provider: 'GoldenLife Insurance',
    pricePerYear: 799,
    description: 'Specialized TCM coverage designed for seniors',
    coverageDetails: [
      'Unlimited consultations',
      '36 acupuncture sessions per year',
      'Herbal medicine coverage up to $1,500/year',
      'Senior wellness assessments'
    ],
    benefits: [
      'Specialized senior network',
      'Home visit options',
      'Chronic condition support',
      'Dedicated care coordinator'
    ],
    terms: [
      'Ages 60+ eligible',
      'No waiting period',
      'Monthly payment option',
      'Guaranteed renewal'
    ]
  }
];

export const mockInsuranceCards: InsuranceCard[] = [
  {
    id: '1',
    productId: '1',
    productName: 'TCM Essential Care',
    provider: 'HealthGuard Insurance',
    memberName: 'John Smith',
    memberNumber: 'HG1234567',
    effectiveDate: new Date('2024-01-01'),
    expirationDate: new Date('2024-12-31'),
    coverageDetails: [
      'Unlimited online TCM consultations',
      'Up to 24 acupuncture sessions per year',
      'Herbal medicine coverage up to $1,000/year'
    ]
  }
];