import { Review } from '../../types/practitioners';
import StarRating from './StarRating';

interface ReviewsListProps {
  reviews: Review[];
}

export default function ReviewsList({ reviews }: ReviewsListProps) {
  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review.id} className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">{review.author}</span>
            <div className="flex items-center space-x-1">
              <StarRating rating={review.rating} />
              <span className="text-sm">{review.rating}</span>
            </div>
          </div>
          <p className="text-gray-600 mb-2">{review.content}</p>
          <span className="text-sm text-gray-400">{new Date(review.date).toLocaleDateString()}</span>
        </div>
      ))}
    </div>
  );
}