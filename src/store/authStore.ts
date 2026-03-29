import { create } from 'zustand';

import type { IUser } from '@/types';

interface AuthState {
  user: IUser | null;
  isAuthenticated: boolean;
  _hasHydrated: boolean;
  setUser: (user: IUser | null) => void;
  login: (user: IUser) => void;
  logout: () => void;
  setHasHydrated: (state: boolean) => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  isAuthenticated: false,
  _hasHydrated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  login: (user) => {
    set({ user, isAuthenticated: true });
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
  setHasHydrated: (state: boolean) => set({ _hasHydrated: state }),
}));
