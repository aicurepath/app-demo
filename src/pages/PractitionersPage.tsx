import { useState, useMemo } from 'react';
import { ChevronUpIcon, ChevronDownIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { practitioners, clinics } from '../data/mockPractitionersData';
import { Clinic, PractitionerCategory, PractitionerRegion } from '../types/practitioners';
import { REGIONS, SPECIALTIES } from '../data/constants';
import PractitionersList from '../components/practitioners/PractitionersList';
import ClinicMap from '../components/clinics/ClinicMap';
import ClinicsList from '../components/clinics/ClinicsList';

type Tab = 'practitioners' | 'clinics';

export default function PractitionersPage() {
  const [activeTab, setActiveTab] = useState<Tab>('practitioners');
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<PractitionerRegion | 'all'>('all');
  const [selectedSpecialty, setSelectedSpecialty] = useState<PractitionerCategory | 'all'>('all');
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);

  const filteredPractitioners = useMemo(() => {
    return practitioners.filter(practitioner => {
      const matchesRegion = selectedRegion === 'all' || practitioner.primaryRegion === selectedRegion;
      const matchesSpecialty = selectedSpecialty === 'all' || practitioner.categories.includes(selectedSpecialty);
      return matchesRegion && matchesSpecialty;
    });
  }, [selectedRegion, selectedSpecialty]);

  const activeFiltersCount = [
    selectedRegion !== 'all',
    selectedSpecialty !== 'all'
  ].filter(Boolean).length;

  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-white shadow-soft">
        <div className="p-4">
          <h1 className="text-lg font-medium text-center">Find TCM Expert</h1>
        </div>
      </div>

      <div className="p-4">
        <div className="flex space-x-2 mb-6">
          {['practitioners', 'clinics'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as Tab)}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-primary-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-primary-50'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === 'practitioners' && (
          <div className="bg-white rounded-2xl shadow-card mb-6">
            <button
              onClick={() => setIsFilterExpanded(!isFilterExpanded)}
              className="w-full p-4 flex items-center justify-between"
            >
              <div className="flex items-center space-x-2">
                <FunnelIcon className="w-5 h-5 text-gray-500" />
                <span className="font-medium">Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="bg-primary-500 text-white text-xs px-2 py-1 rounded-full">
                    {activeFiltersCount}
                  </span>
                )}
              </div>
              {isFilterExpanded ? (
                <ChevronUpIcon className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDownIcon className="w-5 h-5 text-gray-500" />
              )}
            </button>
            
            {isFilterExpanded && (
              <div className="px-4 pb-4 space-y-4 border-t">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Province
                  </label>
                  <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value as PractitionerRegion | 'all')}
                    className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="all">All Provinces</option>
                    {REGIONS.map(region => (
                      <option key={region.value} value={region.value}>{region.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specialty
                  </label>
                  <select
                    value={selectedSpecialty}
                    onChange={(e) => setSelectedSpecialty(e.target.value as PractitionerCategory | 'all')}
                    className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="all">All Specialties</option>
                    {SPECIALTIES.map(specialty => (
                      <option key={specialty} value={specialty}>{specialty}</option>
                    ))}
                  </select>
                </div>

                {activeFiltersCount > 0 && (
                  <button
                    onClick={() => {
                      setSelectedRegion('all');
                      setSelectedSpecialty('all');
                    }}
                    className="text-sm text-primary-500 hover:text-primary-600"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'practitioners' ? (
          <PractitionersList practitioners={filteredPractitioners} />
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-card overflow-hidden">
              <div className="h-[300px]">
                <ClinicMap
                  clinics={clinics}
                  selectedClinic={selectedClinic}
                  onSelectClinic={setSelectedClinic}
                />
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-card p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Nearby Clinics</h2>
              <ClinicsList
                clinics={clinics}
                selectedClinicId={selectedClinic?.id || null}
                onSelectClinic={setSelectedClinic}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}