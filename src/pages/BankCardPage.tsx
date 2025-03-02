import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import BackButton from '../components/shared/BackButton';
import { showSuccess } from '../components/notifications/toast';
import { BankCard } from '../types/auth';

interface CardFormData {
  cardNumber: string;
  expiryDate: string;
  cardholderName: string;
  cvv: string;
}

export default function BankCardPage() {
  const navigate = useNavigate();
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState<CardFormData>({
    cardNumber: '',
    expiryDate: '',
    cardholderName: '',
    cvv: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.cardNumber.replace(/\s/g, '').match(/^\d{16}$/)) {
      alert('Please enter a valid 16-digit card number');
      return;
    }

    if (!formData.expiryDate.match(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)) {
      alert('Please enter a valid expiry date (MM/YY)');
      return;
    }

    if (!formData.cvv.match(/^\d{3,4}$/)) {
      alert('Please enter a valid CVV');
      return;
    }

    if (formData.cardholderName.trim().length < 3) {
      alert('Please enter the cardholder name');
      return;
    }

    // Create new bank card object
    const newCard: BankCard = {
      id: Date.now().toString(),
      lastFourDigits: formData.cardNumber.slice(-4),
      cardType: detectCardType(formData.cardNumber),
      isDefault: !(user?.bankCards?.length)
    };

    // Update user profile with new card
    if (user) {
      const updatedUser = {
        ...user,
        bankCards: [...(user.bankCards || []), newCard]
      };
      await updateProfile(updatedUser);
      showSuccess('Bank card added successfully');
      navigate('/profile');
    }
  };

  const detectCardType = (cardNumber: string): BankCard['cardType'] => {
    const firstDigit = cardNumber.charAt(0);
    if (firstDigit === '4') return 'visa';
    if (firstDigit === '5') return 'mastercard';
    return 'unionpay';
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const formatted = cleaned.replace(/(\d{4})/g, '$1 ').trim();
    return formatted.substring(0, 19); // 16 digits + 3 spaces
  };

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="p-4 bg-white border-b sticky top-0 z-10">
        <div className="relative">
          <BackButton />
          <h1 className="text-lg font-medium text-center">Add Bank Card</h1>
        </div>
      </div>

      <div className="p-4">
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Number
              </label>
              <input
                type="text"
                value={formData.cardNumber}
                onChange={(e) => setFormData({
                  ...formData,
                  cardNumber: formatCardNumber(e.target.value)
                })}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date
                </label>
                <input
                  type="text"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({
                    ...formData,
                    expiryDate: formatExpiryDate(e.target.value)
                  })}
                  placeholder="MM/YY"
                  maxLength={5}
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CVV
                </label>
                <input
                  type="text"
                  value={formData.cvv}
                  onChange={(e) => setFormData({
                    ...formData,
                    cvv: e.target.value.replace(/\D/g, '').slice(0, 4)
                  })}
                  placeholder="123"
                  maxLength={4}
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cardholder Name
              </label>
              <input
                type="text"
                value={formData.cardholderName}
                onChange={(e) => setFormData({
                  ...formData,
                  cardholderName: e.target.value.toUpperCase()
                })}
                placeholder="JOHN DOE"
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary-500 text-white py-2 px-4 rounded-xl hover:bg-primary-600 font-medium"
            >
              Add Card
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}