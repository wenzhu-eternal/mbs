import { act } from '@testing-library/react';

import { useAppStore } from '@/store/appStore';

describe('useAppStore', () => {
  beforeEach(() => {
    useAppStore.setState({
      loading: false,
      error: null,
      sidebarCollapsed: false,
      theme: 'light',
    });
  });

  it('should initialize with default state', () => {
    const state = useAppStore.getState();

    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.sidebarCollapsed).toBe(false);
    expect(state.theme).toBe('light');
  });

  it('should set loading', () => {
    act(() => {
      useAppStore.getState().setLoading(true);
    });

    expect(useAppStore.getState().loading).toBe(true);
  });

  it('should set error', () => {
    act(() => {
      useAppStore.getState().setError('Test error');
    });

    expect(useAppStore.getState().error).toBe('Test error');
  });

  it('should clear error', () => {
    act(() => {
      useAppStore.getState().setError('Test error');
    });

    expect(useAppStore.getState().error).toBe('Test error');

    act(() => {
      useAppStore.getState().clearError();
    });

    expect(useAppStore.getState().error).toBeNull();
  });

  it('should toggle sidebar', () => {
    expect(useAppStore.getState().sidebarCollapsed).toBe(false);

    act(() => {
      useAppStore.getState().toggleSidebar();
    });

    expect(useAppStore.getState().sidebarCollapsed).toBe(true);

    act(() => {
      useAppStore.getState().toggleSidebar();
    });

    expect(useAppStore.getState().sidebarCollapsed).toBe(false);
  });

  it('should set theme', () => {
    act(() => {
      useAppStore.getState().setTheme('dark');
    });

    expect(useAppStore.getState().theme).toBe('dark');
  });

  it('should reset state', () => {
    act(() => {
      useAppStore.getState().setLoading(true);
      useAppStore.getState().setError('Test error');
      useAppStore.getState().toggleSidebar();
      useAppStore.getState().setTheme('dark');
    });

    act(() => {
      useAppStore.getState().reset();
    });

    expect(useAppStore.getState().loading).toBe(false);
    expect(useAppStore.getState().error).toBeNull();
    expect(useAppStore.getState().sidebarCollapsed).toBe(false);
    expect(useAppStore.getState().theme).toBe('light');
  });
});
