import { useNavigate } from 'react-router-dom';
import { insuranceProducts } from '../data/mockInsurance';
import BackButton from '../components/shared/BackButton';

export default function InsuranceMarketPage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-lg mx-auto">
      <div className="p-4 bg-white border-b sticky top-0 z-10">
        <div className="relative">
          <BackButton />
          <h1 className="text-lg font-medium text-center">Insurance Plans</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {insuranceProducts.map((product) => (
          <div
            key={product.id}
            onClick={() => navigate(`/insurance/products/${product.id}`)}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold">{product.name}</h2>
                  <p className="text-gray-600">{product.provider}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary-500">
                    ${product.pricePerYear}
                  </div>
                  <div className="text-sm text-gray-500">per year</div>
                </div>
              </div>

              <p className="text-gray-600 mb-4">{product.description}</p>

              <div className="space-y-2">
                {product.coverageDetails.slice(0, 2).map((detail, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">✓</span>
                    {detail}
                  </div>
                ))}
                {product.coverageDetails.length > 2 && (
                  <div className="text-sm text-primary-500">
                    + {product.coverageDetails.length - 2} more benefits
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}