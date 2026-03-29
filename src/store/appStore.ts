import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface AppState {
  loading: boolean;
  error: string | null;
  sidebarCollapsed: boolean;
  theme: 'light' | 'dark';
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  toggleSidebar: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  reset: () => void;
}

const initialState = {
  loading: false,
  error: null,
  sidebarCollapsed: false,
  theme: 'light' as const,
};

export const useAppStore = create<AppState>()(
  devtools(
    (set) => ({
      ...initialState,
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),
      toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setTheme: (theme) => set({ theme }),
      reset: () => set(initialState),
    }),
    {
      name: 'app-storage',
    },
  ),
);