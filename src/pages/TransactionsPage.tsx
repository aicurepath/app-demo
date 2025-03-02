import BackButton from '../components/shared/BackButton';
import TransactionHistory from '../components/payment/TransactionHistory';
import { usePayment } from '../hooks/usePayment';

export default function TransactionsPage() {
  const { transactions } = usePayment();

  return (
    <div className="max-w-lg mx-auto">
      <div className="p-4 bg-white border-b sticky top-0 z-10">
        <div className="relative">
          <BackButton />
          <h1 className="text-lg font-medium text-center">Transaction History</h1>
        </div>
      </div>

      <div className="p-4">
        <TransactionHistory transactions={transactions} />
      </div>
    </div>
  );
}