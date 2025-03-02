export interface Transaction {
  id: string;
  type: 'topup' | 'payment';
  amount: number;
  date: Date;
  status: 'completed' | 'pending' | 'failed';
  description: string;
}

export interface PaymentState {
  balance: number;
  transactions: Transaction[];
}