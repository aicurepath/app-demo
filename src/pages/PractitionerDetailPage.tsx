import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { practitioners } from '../data/mockPractitionersData';
import { REGIONS } from '../data/constants';
import ReviewsList from '../components/shared/ReviewsList';
import StarRating from '../components/shared/StarRating';
import ReviewDialog from '../components/shared/ReviewDialog';
import InquiryDialog from '../components/practitioners/InquiryDialog';
import TopUpDialog from '../components/payment/TopUpDialog';
import BackButton from '../components/shared/BackButton';
import { useReviews } from '../hooks/useReviews';
import { usePayment } from '../hooks/usePayment';
import { useAuth } from '../hooks/useAuth';
import { mockConsultations } from '../data/mockAccounts';
import { generateUniqueId } from '../utils/helpers';
import { showSuccess, showError } from '../components/notifications/toast';

export default function PractitionerDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const practitioner = practitioners.find(p => p.id === id);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [isInquiryDialogOpen, setIsInquiryDialogOpen] = useState(false);
  const [isTopUpDialogOpen, setIsTopUpDialogOpen] = useState(false);
  
  const { reviews, addReview } = useReviews(practitioner?.reviews || []);
  const { balance, makePayment, topUp } = usePayment();

  if (!practitioner) {
    return <div className="p-4">Practitioner not found</div>;
  }

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  const handleClinicClick = () => {
    sessionStorage.setItem('selectedClinicId', practitioner.clinicId);
    navigate('/clinics');
  };

  const handleStartInquiry = async (shareHealthReport: boolean) => {
    if (!user) {
      showError('Please log in first');
      navigate('/login');
      return;
    }

    // Check for existing consultation
    const existingConsultation = Object.values(mockConsultations).find(
      c => c.patientId === user.id && c.practitionerId === practitioner.id
    );

    if (existingConsultation) {
      setIsInquiryDialogOpen(false);
      navigate(`/consultation-history/${existingConsultation.id}`);
      return;
    }

    // Create new consultation
    const consultationId = generateUniqueId();
    mockConsultations[consultationId] = {
      id: consultationId,
      patientId: user.id,
      practitionerId: practitioner.id,
      messages: [
        {
          id: generateUniqueId(),
          role: 'assistant',
          content: `Hello! I'm ${practitioner.name}. How can I help you today?`,
          timestamp: new Date()
        }
      ],
      sharedHealthReport: shareHealthReport,
      startDate: new Date()
    };

    setIsInquiryDialogOpen(false);
    if (shareHealthReport) {
      sessionStorage.setItem(`healthReport_${consultationId}`, 'true');
    }
    showSuccess('Consultation started successfully!');
    navigate(`/consultation-history/${consultationId}`);
  };

  const getProvinceFullName = (code: string) => {
    const province = REGIONS.find(r => r.value === code);
    return province ? province.label : code;
  };

  const handleBookAppointment = () => {
    if (!user) {
      showError('Please log in first');
      navigate('/login');
      return;
    }
    
    navigate(`/appointments/book/${practitioner.id}`);
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="p-4 bg-white border-b sticky top-0 z-10">
        <div className="relative">
          <BackButton />
          <h1 className="text-lg font-medium text-center">Practitioner Details</h1>
        </div>
      </div>

      <div className="p-4">
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <img 
                src={practitioner.image} 
                alt={practitioner.name}
                className="w-24 h-24 rounded-full object-cover"
              />
              <div>
                <h1 className="text-2xl font-bold">{practitioner.name}</h1>
                <p className="text-gray-600">{practitioner.specialty}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {practitioner.categories.map((category) => (
                    <span 
                      key={category}
                      className="text-xs px-2 py-1 bg-primary-50 text-primary-600 rounded-full"
                    >
                      {category}
                    </span>
                  ))}
                </div>
                <div className="mt-2">
                  <span className="text-xs px-2 py-1 bg-secondary-50 text-secondary-600 rounded-full">
                    {getProvinceFullName(practitioner.primaryRegion)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 mb-4">
              <StarRating rating={averageRating} />
              <span className="font-medium">{averageRating.toFixed(1)}</span>
            </div>

            <div className="space-y-4 mb-6">
              <p className="text-gray-700">{practitioner.introduction}</p>
              
              <div>
                <h3 className="font-semibold mb-1">Contact</h3>
                <p className="text-gray-600">{practitioner.phone}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-1">Practice Location</h3>
                <button 
                  onClick={handleClinicClick}
                  className="text-primary-500 hover:underline text-left"
                >
                  {practitioner.location}
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="bg-primary-50 rounded-xl p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-800">Online Consultation</h3>
                      <p className="text-gray-600 mt-1">24-hour consultation period</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary-600">
                        ${practitioner.inquiryPrice}
                      </div>
                      <div className="text-sm text-gray-500">per consultation</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsInquiryDialogOpen(true)}
                    className="w-full bg-primary-500 text-white py-3 px-4 rounded-xl hover:bg-primary-600 font-medium"
                  >
                    Start Online Consultation
                  </button>
                </div>

                <div className="bg-primary-50 rounded-xl p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-800">Book Appointment</h3>
                      <p className="text-gray-600 mt-1">In-person or video call</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary-600">
                        ${practitioner.inquiryPrice * 2}
                      </div>
                      <div className="text-sm text-gray-500">per session</div>
                    </div>
                  </div>
                  <button
                    onClick={handleBookAppointment}
                    className="w-full bg-primary-500 text-white py-3 px-4 rounded-xl hover:bg-primary-600 font-medium"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">User Reviews</h2>
                <button
                  onClick={() => setIsReviewDialogOpen(true)}
                  className="text-primary-500 hover:text-primary-600"
                >
                  Write a Review
                </button>
              </div>
              <ReviewsList reviews={reviews} />
            </div>
          </div>
        </div>
      </div>

      <ReviewDialog
        isOpen={isReviewDialogOpen}
        onClose={() => setIsReviewDialogOpen(false)}
        onSubmit={addReview}
      />

      <InquiryDialog
        isOpen={isInquiryDialogOpen}
        onClose={() => setIsInquiryDialogOpen(false)}
        onConfirm={handleStartInquiry}
        practitionerName={practitioner.name}
        price={practitioner.inquiryPrice}
      />

      <TopUpDialog
        isOpen={isTopUpDialogOpen}
        onClose={() => setIsTopUpDialogOpen(false)}
        onTopUp={topUp}
      />
    </div>
  );
}