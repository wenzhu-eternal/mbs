import { act } from '@testing-library/react';

import { useAuthStore } from '@/store/authStore';

describe('useAuthStore', () => {
  beforeEach(() => {
    useAuthStore.setState({
      user: null,
      isAuthenticated: false,
      _hasHydrated: false,
    });
  });

  it('should initialize with default state', () => {
    const state = useAuthStore.getState();

    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(state._hasHydrated).toBe(false);
  });

  it('should set user', () => {
    const mockUser = {
      id: 1,
      account: 'test',
      createTime: new Date(),
      isDisable: false,
    };

    act(() => {
      useAuthStore.getState().setUser(mockUser);
    });

    expect(useAuthStore.getState().user).toEqual(mockUser);
    expect(useAuthStore.getState().isAuthenticated).toBe(true);
  });

  it('should login user', () => {
    const mockUser = {
      id: 1,
      account: 'test',
      createTime: new Date(),
      isDisable: false,
    };

    act(() => {
      useAuthStore.getState().login(mockUser);
    });

    expect(useAuthStore.getState().user).toEqual(mockUser);
    expect(useAuthStore.getState().isAuthenticated).toBe(true);
  });

  it('should logout user', () => {
    const mockUser = {
      id: 1,
      account: 'test',
      createTime: new Date(),
      isDisable: false,
    };

    act(() => {
      useAuthStore.getState().login(mockUser);
    });

    expect(useAuthStore.getState().isAuthenticated).toBe(true);

    act(() => {
      useAuthStore.getState().logout();
    });

    expect(useAuthStore.getState().user).toBeNull();
    expect(useAuthStore.getState().isAuthenticated).toBe(false);
  });

  it('should set hydrated state', () => {
    act(() => {
      useAuthStore.getState().setHasHydrated(true);
    });

    expect(useAuthStore.getState()._hasHydrated).toBe(true);
  });
});
