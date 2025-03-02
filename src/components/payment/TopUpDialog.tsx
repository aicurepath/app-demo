import { useState } from 'react';

interface TopUpDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onTopUp: (amount: number) => Promise<void>;
}

const PRESET_AMOUNTS = [10, 20, 50, 100];

export default function TopUpDialog({ isOpen, onClose, onTopUp }: TopUpDialogProps) {
  const [amount, setAmount] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleTopUp = async () => {
    if (amount > 0) {
      setIsProcessing(true);
      await onTopUp(amount);
      setIsProcessing(false);
      setAmount(0);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Top Up Balance</h3>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          {PRESET_AMOUNTS.map((preset) => (
            <button
              key={preset}
              onClick={() => setAmount(preset)}
              className={`p-3 rounded-lg border text-center transition-colors ${
                amount === preset
                  ? 'bg-primary-50 border-primary-500 text-primary-700'
                  : 'border-gray-200 hover:border-primary-200'
              }`}
            >
              ${preset}
            </button>
          ))}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Custom Amount
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              min="0"
              value={amount || ''}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full border rounded-lg p-2 pl-8"
              placeholder="Enter amount"
            />
          </div>
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
            onClick={handleTopUp}
            disabled={amount <= 0 || isProcessing}
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50"
          >
            {isProcessing ? 'Processing...' : 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
}