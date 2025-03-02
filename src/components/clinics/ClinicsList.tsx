import { Link } from 'react-router-dom';
import { Clinic } from '../../types/practitioners';
import StarRating from '../shared/StarRating';

interface ClinicsListProps {
  clinics: Clinic[];
  selectedClinicId: string | null;
  onSelectClinic: (clinic: Clinic) => void;
}

export default function ClinicsList({ clinics, selectedClinicId, onSelectClinic }: ClinicsListProps) {
  return (
    <div className="space-y-4">
      {clinics.map((clinic) => (
        <div
          key={clinic.id}
          className={`bg-white p-4 rounded-lg shadow-sm cursor-pointer transition-colors ${
            selectedClinicId === clinic.id ? 'ring-2 ring-primary-500' : ''
          }`}
          onClick={() => onSelectClinic(clinic)}
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{clinic.name}</h3>
              <p className="text-sm text-gray-600">{clinic.address}</p>
            </div>
            <div className="flex items-center space-x-1">
              <StarRating rating={clinic.rating} />
              <span className="text-sm font-medium ml-1">{clinic.rating}</span>
            </div>
          </div>
          
          {selectedClinicId === clinic.id && (
            <div className="mt-3 flex justify-end">
              <Link
                to={`/clinics/${clinic.id}`}
                className="text-sm text-primary-500 hover:text-primary-600"
              >
                View Details →
              </Link>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}