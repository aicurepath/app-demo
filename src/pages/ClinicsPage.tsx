import { useState, useEffect } from 'react';
import { clinics } from '../data/mockPractitionersData';
import ClinicMap from '../components/clinics/ClinicMap';
import ClinicsList from '../components/clinics/ClinicsList';
import BackButton from '../components/shared/BackButton';
import { Clinic } from '../types/practitioners';

export default function ClinicsPage() {
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null);

  useEffect(() => {
    // Check for stored clinic ID when component mounts
    const storedClinicId = sessionStorage.getItem('selectedClinicId');
    if (storedClinicId) {
      const clinic = clinics.find(c => c.id === storedClinicId);
      if (clinic) {
        setSelectedClinic(clinic);
        // Clear the stored ID after using it
        sessionStorage.removeItem('selectedClinicId');
      }
    }
  }, []);

  return (
    <div className="max-w-lg mx-auto">
      <div className="p-4 bg-white border-b sticky top-0 z-10">
        <div className="relative">
          <BackButton />
          <h1 className="text-lg font-medium text-center">Nearby Clinics</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="h-[300px]">
          <ClinicMap
            clinics={clinics}
            selectedClinic={selectedClinic}
            onSelectClinic={setSelectedClinic}
          />
        </div>
        
        <div className="mt-4">
          <h2 className="text-lg mb-3">Available Clinics</h2>
          <ClinicsList
            clinics={clinics}
            selectedClinicId={selectedClinic?.id || null}
            onSelectClinic={setSelectedClinic}
          />
        </div>
      </div>
    </div>
  );
}