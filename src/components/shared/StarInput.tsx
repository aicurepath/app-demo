interface StarInputProps {
  rating: number;
  onRatingChange: (rating: number) => void;
}

export default function StarInput({ rating, onRatingChange }: StarInputProps) {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((value) => (
        <button
          key={value}
          onClick={() => onRatingChange(value)}
          className="text-2xl focus:outline-none"
        >
          <span className={value <= rating ? 'text-yellow-400' : 'text-gray-300'}>
            ★
          </span>
        </button>
      ))}
    </div>
  );
}