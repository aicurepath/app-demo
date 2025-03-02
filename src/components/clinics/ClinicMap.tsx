import { Link } from 'react-router-dom';
import { Clinic } from '../../types/practitioners';

interface ClinicMapProps {
  clinics: Clinic[];
  selectedClinic: Clinic | null;
  onSelectClinic: (clinic: Clinic) => void;
}

export default function ClinicMap({ clinics, selectedClinic, onSelectClinic }: ClinicMapProps) {
  return (
    <div className="relative h-full rounded-lg overflow-hidden">
      {/* Map background */}
      <div className="absolute inset-0">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8IS0tIEJhY2tncm91bmQgLS0+CiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2YwZjBmMCIvPgogIAogIDwhLS0gUm9hZHMgLS0+CiAgPHBhdGggZD0iTTAgMzAwIGg4MDAiIHN0cm9rZT0iI2RkZCIgc3Ryb2tlLXdpZHRoPSI1Ii8+CiAgPHBhdGggZD0iTTQwMCAwIHYxMDAwIiBzdHJva2U9IiNkZGQiIHN0cm9rZS13aWR0aD0iNSIvPgogIAogIDwhLS0gQmxvY2tzIC0tPgogIDxyZWN0IHg9IjUwIiB5PSI1MCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNlMGUwZTAiLz4KICA8cmVjdCB4PSIyMDAiIHk9IjE1MCIgd2lkdGg9IjE1MCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNlMGUwZTAiLz4KICA8cmVjdCB4PSI0NTAiIHk9IjUwIiB3aWR0aD0iMTIwIiBoZWlnaHQ9IjE4MCIgZmlsbD0iI2UwZTBlMCIvPgogIDxyZWN0IHg9IjEwMCIgeT0iNDAwIiB3aWR0aD0iMTUwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2UwZTBlMCIvPgogIDxyZWN0IHg9IjUwMCIgeT0iMzUwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iI2UwZTBlMCIvPgogIAogIDwhLS0gUGFya3MgLS0+CiAgPGNpcmNsZSBjeD0iMzAwIiBjeT0iNDUwIiByPSI1MCIgZmlsbD0iI2MwZTBjMCIvPgogIDxjaXJjbGUgY3g9IjYwMCIgY3k9IjIwMCIgcj0iNzAiIGZpbGw9IiNjMGUwYzAiLz4KPC9zdmc+Cg==')`
          }}
        />
      </div>

      {/* Clinic markers */}
      {clinics.map((clinic) => (
        <button
          key={clinic.id}
          className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${
            selectedClinic?.id === clinic.id
              ? 'text-red-500 scale-125'
              : 'text-primary-500 hover:scale-110'
          } transition-transform`}
          style={{ left: clinic.coordinates.x + '%', top: clinic.coordinates.y + '%' }}
          onClick={() => onSelectClinic(clinic)}
        >
          📍
        </button>
      ))}

      {/* Selected clinic info */}
      {selectedClinic && (
        <div className="absolute bottom-4 left-4 right-4 bg-white p-4 rounded-lg shadow-lg">
          <h3 className="font-semibold">{selectedClinic.name}</h3>
          <p className="text-sm text-gray-600">{selectedClinic.address}</p>
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-500">{selectedClinic.phone}</span>
            <Link
              to={`/clinics/${selectedClinic.id}`}
              className="text-sm text-primary-500 hover:text-primary-600"
            >
              View Details →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}