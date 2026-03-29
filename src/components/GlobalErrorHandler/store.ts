import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ErrorState {
  error: Error | null;
  showError: boolean;
  setError: (error: Error | null) => void;
  clearError: () => void;
  showGlobalError: (error: Error) => void;
}

export const useErrorStore = create<ErrorState>()(
  devtools(
    (set) => ({
      error: null,
      showError: false,
      setError: (error) => set({ error, showError: !!error }),
      clearError: () => set({ error: null, showError: false }),
      showGlobalError: (error) => set({ error, showError: true }),
    }),
    {
      name: 'error-storage',
    },
  ),
);