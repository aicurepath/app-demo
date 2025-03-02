import { useState } from 'react';
import { Review } from '../types/practitioners';
import { generateUniqueId } from '../utils/helpers';

export function useReviews(initialReviews: Review[]) {
  const [reviews, setReviews] = useState(initialReviews);

  const addReview = (rating: number, comment: string) => {
    const newReview: Review = {
      id: generateUniqueId(),
      author: 'You', // In a real app, this would come from the user's profile
      rating,
      date: new Date().toISOString(),
      content: comment
    };

    setReviews([newReview, ...reviews]);
  };

  return {
    reviews,
    addReview
  };
}