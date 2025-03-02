import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User } from '../types/auth';
import { mockUsers } from '../data/mockAccounts';

interface AuthStore extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  loginWithProvider: (provider: 'google' | 'wechat' | 'facebook') => Promise<boolean>;
  loginPractitioner: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string) => Promise<boolean>;
  signupWithProvider: (provider: 'google' | 'wechat' | 'facebook') => Promise<boolean>;
  signupPractitioner: (email: string, password: string, licenseNumber: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (user: User) => Promise<void>;
}

export const useAuth = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const user = mockUsers[email];
          if (!user || user.role !== 'user') {
            throw new Error('Invalid credentials');
          }

          set({
            user,
            isLoading: false
          });
          return true;
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to login',
            isLoading: false 
          });
          return false;
        }
      },

      loginWithProvider: async (provider) => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Mock successful login
          set({
            user: {
              id: '1',
              email: 'john@example.com',
              name: 'John Doe',
              role: 'user',
              provider
            },
            isLoading: false
          });
          return true;
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to login',
            isLoading: false 
          });
          return false;
        }
      },

      loginPractitioner: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const user = mockUsers[email];
          if (!user || user.role !== 'practitioner') {
            throw new Error('Invalid credentials');
          }

          set({
            user,
            isLoading: false
          });
          return true;
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to login',
            isLoading: false 
          });
          return false;
        }
      },

      signup: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Mock successful signup
          set({
            user: {
              id: '1',
              email,
              name: 'John Doe',
              role: 'user'
            },
            isLoading: false
          });
          return true;
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to sign up',
            isLoading: false 
          });
          return false;
        }
      },

      signupWithProvider: async (provider) => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Mock successful signup
          set({
            user: {
              id: '1',
              email: 'john@example.com',
              name: 'John Doe',
              role: 'user',
              provider
            },
            isLoading: false
          });
          return true;
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to sign up',
            isLoading: false 
          });
          return false;
        }
      },

      signupPractitioner: async (email: string, password: string, licenseNumber: string) => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Mock successful signup
          set({
            user: {
              id: '1',
              email,
              name: 'Dr. Li Wei',
              role: 'practitioner',
              licenseNumber
            },
            isLoading: false
          });
          return true;
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to sign up',
            isLoading: false 
          });
          return false;
        }
      },

      logout: () => {
        set({ user: null, error: null });
      },

      updateProfile: async (user: User) => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          set({ user, isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to update profile',
            isLoading: false 
          });
        }
      }
    }),
    {
      name: 'auth-storage'
    }
  )
);