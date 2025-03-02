export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'user' | 'practitioner';
  provider?: 'email' | 'google' | 'wechat' | 'facebook';
  licenseNumber?: string; // For practitioners
  bankCards?: BankCard[];
  consultPrice?: number;
}

export interface BankCard {
  id: string;
  lastFourDigits: string;
  cardType: 'visa' | 'mastercard' | 'unionpay';
  isDefault: boolean;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}