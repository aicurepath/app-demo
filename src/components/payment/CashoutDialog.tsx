import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface CashoutDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCashout: (amount: number) => Promise<void>;
  balance: number;
}

export default function CashoutDialog({ 
  isOpen, 
  onClose, 
  onCashout,
  balance 
}: CashoutDialogProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [amount, setAmount] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCashout = async () => {
    if (amount > 0 && amount <= balance) {
      if (!user?.bankCards?.length) {
        navigate('/profile/bank-cards');
        return;
      }
      
      setIsProcessing(true);
      await onCashout(amount);
      setIsProcessing(false);
      setAmount(0);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Cash Out</h3>
        
        {user?.bankCards?.length ? (
          <>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  min="0"
                  max={balance}
                  value={amount || ''}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full border rounded-lg p-2 pl-8"
                  placeholder="Enter amount"
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Available balance: ${balance}
              </p>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                disabled={isProcessing}
              >
                Cancel
              </button>
              <button
                onClick={handleCashout}
                disabled={amount <= 0 || amount > balance || isProcessing}
                className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50"
              >
                {isProcessing ? 'Processing...' : 'Confirm'}
              </button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <p className="text-gray-600 mb-4">Please add a bank card first</p>
            <button
              onClick={() => navigate('/profile/bank-cards')}
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
            >
              Add Bank Card
            </button>
          </div>
        )}
      </div>
    </div>
  );
}