import { useMemo } from 'react';

interface StarRatingProps {
  rating: number;
  className?: string;
}

export default function StarRating({ rating, className = '' }: StarRatingProps) {
  const stars = useMemo(() => {
    const solidStars = Math.floor(rating);
    const hasHalfStar = rating - solidStars >= 0.5;
    const totalStars = 5;
    
    const elements = [];
    
    // Add solid stars
    for (let i = 0; i < solidStars; i++) {
      elements.push(
        <span key={`solid-${i}`} className="text-yellow-400">★</span>
      );
    }
    
    // Add half star if needed
    if (hasHalfStar) {
      elements.push(
        <span key="half" className="text-yellow-400">★</span>
      );
    }
    
    // Add remaining empty stars
    const emptyStars = totalStars - elements.length;
    for (let i = 0; i < emptyStars; i++) {
      elements.push(
        <span key={`empty-${i}`} className="text-gray-300">★</span>
      );
    }
    
    return elements;
  }, [rating]);

  return (
    <div className={`flex ${className}`}>
      {stars}
    </div>
  );
}