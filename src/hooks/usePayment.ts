import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PaymentState, Transaction } from '../types/payment';
import { generateUniqueId } from '../utils/helpers';

interface PaymentStore extends PaymentState {
  topUp: (amount: number) => Promise<void>;
  makePayment: (amount: number, description: string) => Promise<boolean>;
}

export const usePayment = create<PaymentStore>()(
  persist(
    (set, get) => ({
      balance: 0,
      transactions: [],
      topUp: async (amount: number) => {
        const transaction: Transaction = {
          id: generateUniqueId(),
          type: 'topup',
          amount,
          date: new Date(),
          status: 'completed',
          description: 'Balance top-up'
        };

        set((state) => ({
          balance: state.balance + amount,
          transactions: [transaction, ...state.transactions]
        }));
      },
      makePayment: async (amount: number, description: string) => {
        const currentBalance = get().balance;
        if (currentBalance < amount) {
          return false;
        }

        const transaction: Transaction = {
          id: generateUniqueId(),
          type: 'payment',
          amount,
          date: new Date(),
          status: 'completed',
          description
        };

        set((state) => ({
          balance: state.balance - amount,
          transactions: [transaction, ...state.transactions]
        }));

        return true;
      }
    }),
    {
      name: 'payment-storage'
    }
  )
);