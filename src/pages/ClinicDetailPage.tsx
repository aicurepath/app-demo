import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { clinics } from '../data/mockPractitionersData';
import ReviewsList from '../components/shared/ReviewsList';
import StarRating from '../components/shared/StarRating';
import ReviewDialog from '../components/shared/ReviewDialog';
import BackButton from '../components/shared/BackButton';
import { useReviews } from '../hooks/useReviews';

export default function ClinicDetailPage() {
  const { id } = useParams();
  const clinic = clinics.find(c => c.id === id);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  
  const { reviews, addReview } = useReviews(clinic?.reviews || []);

  if (!clinic) {
    return <div className="p-4">Clinic not found</div>;
  }

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <div className="max-w-lg mx-auto">
      <div className="p-4 bg-white border-b sticky top-0 z-10">
        <div className="relative">
          <BackButton />
          <h1 className="text-lg font-medium text-center">Clinic Details</h1>
        </div>
      </div>

      <div className="p-4">
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-2">{clinic.name}</h1>
            
            <div className="flex items-center space-x-2 mb-4">
              <StarRating rating={averageRating} />
              <span className="font-medium">{averageRating.toFixed(1)}</span>
            </div>

            <div className="space-y-4 mb-6">
              <p className="text-gray-700">{clinic.description}</p>
              
              <div>
                <h3 className="font-semibold mb-1">Contact</h3>
                <p className="text-gray-600">{clinic.phone}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-1">Location</h3>
                <p className="text-gray-600">{clinic.address}</p>
              </div>

              <a
                href={clinic.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-primary-500 text-white text-center py-2 px-4 rounded-xl hover:bg-primary-600 font-medium"
              >
                Book Appointment
              </a>
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Patient Reviews</h2>
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
    </div>
  );
}