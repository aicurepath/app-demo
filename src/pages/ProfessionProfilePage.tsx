import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import BackButton from '../components/shared/BackButton';
import { showSuccess } from '../components/notifications/toast';

interface ProfessionalInfo {
  name: string;
  specialty: string;
  introduction: string;
  phone: string;
  location: string;
  clinicId: string;
  consultPrice: number;
  image: string;
}

export default function ProfessionProfilePage() {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [info, setInfo] = useState<ProfessionalInfo>({
    name: user?.name || '',
    specialty: 'Acupuncture & Herbal Medicine',
    introduction: 'Experienced TCM practitioner specializing in acupuncture and herbal remedies.',
    phone: '(555) 123-4567',
    location: 'TCM Wellness Center',
    clinicId: '1',
    consultPrice: user?.consultPrice || 50,
    image: user?.avatar || 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&auto=format&fit=crop&q=80'
  });

  const handleSave = async () => {
    if (user) {
      await updateProfile({ 
        ...user, 
        name: info.name,
        consultPrice: info.consultPrice,
        // In a real app, we would save all the professional info to the backend
      });
      setIsEditing(false);
      showSuccess('Profile updated successfully');
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="p-4 bg-white border-b sticky top-0 z-10">
        <div className="relative">
          <BackButton />
          <h1 className="text-lg font-medium text-center">Professional Profile</h1>
        </div>
      </div>

      <div className="p-4">
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="p-6 space-y-6">
            {/* Profile Image */}
            <div className="flex justify-center">
              <div className="relative">
                <img 
                  src={info.image}
                  alt={info.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
                {isEditing && (
                  <button className="absolute bottom-0 right-0 bg-primary-500 text-white p-2 rounded-full">
                    📷
                  </button>
                )}
              </div>
            </div>

            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={info.name}
                      onChange={(e) => setInfo({ ...info, name: e.target.value })}
                      className="w-full border rounded-lg p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Specialty
                    </label>
                    <input
                      type="text"
                      value={info.specialty}
                      onChange={(e) => setInfo({ ...info, specialty: e.target.value })}
                      className="w-full border rounded-lg p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Introduction
                    </label>
                    <textarea
                      value={info.introduction}
                      onChange={(e) => setInfo({ ...info, introduction: e.target.value })}
                      className="w-full border rounded-lg p-2 h-32"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <p><span className="font-medium">Name:</span> {info.name}</p>
                  <p><span className="font-medium">Specialty:</span> {info.specialty}</p>
                  <p><span className="font-medium">Introduction:</span> {info.introduction}</p>
                </div>
              )}
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={info.phone}
                      onChange={(e) => setInfo({ ...info, phone: e.target.value })}
                      className="w-full border rounded-lg p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Practice Location
                    </label>
                    <input
                      type="text"
                      value={info.location}
                      onChange={(e) => setInfo({ ...info, location: e.target.value })}
                      className="w-full border rounded-lg p-2"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <p><span className="font-medium">Phone:</span> {info.phone}</p>
                  <p><span className="font-medium">Location:</span> {info.location}</p>
                </div>
              )}
            </div>

            {/* Consultation Price */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Consultation Price</h3>
              {isEditing ? (
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={info.consultPrice}
                    onChange={(e) => setInfo({ ...info, consultPrice: Number(e.target.value) })}
                    className="w-full border rounded-lg p-2 pl-8"
                    placeholder="Enter consultation price"
                  />
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-primary-600">
                    ${info.consultPrice}
                  </span>
                </div>
              )}
            </div>

            {/* License Information */}
            <div>
              <h3 className="text-lg font-semibold mb-2">License Information</h3>
              <p className="text-gray-600">License Number: {user?.licenseNumber}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              {isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex-1 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex-1 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
                  >
                    Save Changes
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}