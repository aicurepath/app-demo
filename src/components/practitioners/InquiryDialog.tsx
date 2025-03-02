import { useState } from 'react';
import { mockInsuranceCards } from '../../data/mockInsurance';

interface InquiryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (shareHealthReport: boolean) => void;
  practitionerName: string;
  price: number;
}

export default function InquiryDialog({ 
  isOpen, 
  onClose, 
  onConfirm, 
  practitionerName,
  price 
}: InquiryDialogProps) {
  const [isAgreed, setIsAgreed] = useState(false);
  const [shareHealthReport, setShareHealthReport] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<'balance' | string>('balance');

  if (!isOpen) return null;

  const selectedInsurance = paymentMethod !== 'balance' 
    ? mockInsuranceCards.find(card => card.id === paymentMethod)
    : null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">
          Start Online Consultation with {practitionerName}
        </h3>

        <div className="space-y-4 mb-6">
          <p className="text-gray-600">
            By starting this consultation, you agree to the following terms:
          </p>
          
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
            <li>The consultation fee is ${price}</li>
            <li>The consultation period is valid for 24 hours</li>
            <li>You can ask follow-up questions within this period</li>
            <li>Medical advice is for reference only</li>
            <li>For emergencies, please visit the nearest hospital</li>
          </ul>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Method
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full border rounded-lg p-2"
              >
                <option value="balance">Pay with Balance</option>
                {mockInsuranceCards.map(card => (
                  <option key={card.id} value={card.id}>
                    {card.productName} ({card.memberNumber})
                  </option>
                ))}
              </select>
            </div>

            {selectedInsurance && (
              <div className="p-3 bg-primary-50 rounded-lg">
                <p className="text-sm text-primary-600">
                  This consultation will be covered by your insurance plan.
                </p>
              </div>
            )}

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="agree"
                checked={isAgreed}
                onChange={(e) => setIsAgreed(e.target.checked)}
                className="rounded text-primary-500 focus:ring-primary-500"
              />
              <label htmlFor="agree" className="text-sm text-gray-700">
                I understand and agree to the terms
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="shareReport"
                checked={shareHealthReport}
                onChange={(e) => setShareHealthReport(e.target.checked)}
                className="rounded text-primary-500 focus:ring-primary-500"
              />
              <label htmlFor="shareReport" className="text-sm text-gray-700">
                Share my health assessment report with the practitioner
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(shareHealthReport)}
            disabled={!isAgreed}
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50"
          >
            {selectedInsurance ? 'Start Consultation' : `Pay $${price}`}
          </button>
        </div>
      </div>
    </div>
  );
}