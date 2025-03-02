import { Transaction } from '../../types/payment';

interface TransactionHistoryProps {
  transactions: Transaction[];
}

export default function TransactionHistory({ transactions }: TransactionHistoryProps) {
  if (transactions.length === 0) {
    return (
      <div className="text-center text-gray-500 py-4">
        No transactions yet
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
        >
          <div>
            <p className="font-medium">
              {transaction.type === 'topup' ? 'Top Up' : 'Payment'}
            </p>
            <p className="text-sm text-gray-500">
              {new Date(transaction.date).toLocaleDateString()} {new Date(transaction.date).toLocaleTimeString()}
            </p>
          </div>
          <div className="text-right">
            <p className={`font-medium ${
              transaction.type === 'topup' ? 'text-green-600' : 'text-red-600'
            }`}>
              {transaction.type === 'topup' ? '+' : '-'}${transaction.amount}
            </p>
            <p className="text-sm text-gray-500">{transaction.status}</p>
          </div>
        </div>
      ))}
    </div>
  );
}