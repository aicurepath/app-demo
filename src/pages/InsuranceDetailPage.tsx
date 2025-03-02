import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { insuranceProducts } from '../data/mockInsurance';
import BackButton from '../components/shared/BackButton';
import { showSuccess } from '../components/notifications/toast';

export default function InsuranceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const product = insuranceProducts.find(p => p.id === id);

  if (!product) {
    return <div>Product not found</div>;
  }

  const handlePurchase = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsProcessing(false);
    showSuccess('Insurance purchased successfully!');
    navigate('/profile');
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="p-4 bg-white border-b sticky top-0 z-10">
        <div className="relative">
          <BackButton />
          <h1 className="text-lg font-medium text-center">Plan Details</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            <p className="text-gray-600">{product.provider}</p>
            <div className="mt-4">
              <span className="text-3xl font-bold text-primary-500">${product.pricePerYear}</span>
              <span className="text-gray-500 ml-2">per year</span>
            </div>
          </div>

          <p className="text-gray-700 mb-6">{product.description}</p>

          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-3">Coverage Details</h2>
              <div className="space-y-2">
                {product.coverageDetails.map((detail, index) => (
                  <div key={index} className="flex items-center text-gray-600">
                    <span className="mr-2 text-primary-500">✓</span>
                    {detail}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-3">Benefits</h2>
              <div className="space-y-2">
                {product.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center text-gray-600">
                    <span className="mr-2 text-primary-500">•</span>
                    {benefit}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-3">Terms & Conditions</h2>
              <div className="space-y-2">
                {product.terms.map((term, index) => (
                  <div key={index} className="flex items-start text-gray-600">
                    <span className="mr-2 text-primary-500">-</span>
                    {term}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={handlePurchase}
              disabled={isProcessing}
              className="w-full bg-primary-500 text-white py-3 px-4 rounded-xl hover:bg-primary-600 font-medium disabled:opacity-50"
            >
              {isProcessing ? 'Processing...' : 'Purchase Plan'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}