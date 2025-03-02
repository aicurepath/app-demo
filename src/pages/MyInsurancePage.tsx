import { mockInsuranceCards } from '../data/mockInsurance';
import BackButton from '../components/shared/BackButton';

export default function MyInsurancePage() {
  return (
    <div className="max-w-lg mx-auto">
      <div className="p-4 bg-white border-b sticky top-0 z-10">
        <div className="relative">
          <BackButton />
          <h1 className="text-lg font-medium text-center">My Insurance</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {mockInsuranceCards.map((card) => (
          <div key={card.id} className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="bg-primary-500 p-6 text-white">
              <h2 className="text-xl font-bold">{card.productName}</h2>
              <p>{card.provider}</p>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Member Name</h3>
                <p className="text-lg font-semibold">{card.memberName}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Member Number</h3>
                <p className="text-lg font-semibold">{card.memberNumber}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Effective Date</h3>
                  <p>{card.effectiveDate.toLocaleDateString()}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Expiration Date</h3>
                  <p>{card.expirationDate.toLocaleDateString()}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Coverage</h3>
                <div className="space-y-1">
                  {card.coverageDetails.map((detail, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-600">
                      <span className="mr-2">✓</span>
                      {detail}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}