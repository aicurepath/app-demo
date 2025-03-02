import { Link } from 'react-router-dom';
import { Practitioner } from '../../types/practitioners';
import StarRating from '../shared/StarRating';
import { REGIONS } from '../../data/constants';

interface PractitionerCardProps {
  practitioner: Practitioner;
}

export default function PractitionerCard({ practitioner }: PractitionerCardProps) {
  const getProvinceFullName = (code: string) => {
    const province = REGIONS.find(r => r.value === code);
    return province ? province.label : code;
  };

  return (
    <Link 
      to={`/practitioners/${practitioner.id}`}
      className="block bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow"
    >
      <div className="flex items-center space-x-4">
        <img 
          src={practitioner.image} 
          alt={practitioner.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h3 className="font-semibold">{practitioner.name}</h3>
          <p className="text-sm text-gray-600">{practitioner.specialty}</p>
          <span className="inline-block text-xs px-2 py-1 bg-secondary-50 text-secondary-600 rounded-full mt-1">
            {getProvinceFullName(practitioner.primaryRegion)}
          </span>
        </div>
      </div>
      
      <div className="mt-4 flex flex-wrap gap-2">
        {practitioner.categories.map((category) => (
          <span 
            key={category}
            className="text-xs px-2 py-1 bg-primary-50 text-primary-600 rounded-full"
          >
            {category}
          </span>
        ))}
      </div>

      <div className="mt-4 flex justify-between items-center">
        <span className="text-sm text-gray-500">{practitioner.location}</span>
        <div className="flex items-center space-x-1">
          <StarRating rating={practitioner.rating} />
          <span className="text-sm font-medium ml-1">{practitioner.rating}</span>
        </div>
      </div>

      <div className="mt-4 bg-primary-50 rounded-lg p-3 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">Consultation Fee</span>
        <span className="text-lg font-semibold text-primary-600">
          ${practitioner.inquiryPrice}
        </span>
      </div>
    </Link>
  );
}