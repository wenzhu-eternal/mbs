import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useErrorLogStore } from '@/pages/monitor/errorLog/store';

const mockGetErrorLogList = vi.fn();
const mockGetErrorStats = vi.fn();
const mockGetWhitelist = vi.fn();
const mockResolveError = vi.fn();
const mockAddWhitelist = vi.fn();
const mockUpdateWhitelist = vi.fn();
const mockDeleteWhitelist = vi.fn();

vi.mock('@/pages/monitor/errorLog/services', () => ({
  getErrorLogList: () => mockGetErrorLogList(),
  getErrorStats: () => mockGetErrorStats(),
  getWhitelist: () => mockGetWhitelist(),
  resolveError: () => mockResolveError(),
  addWhitelist: () => mockAddWhitelist(),
  updateWhitelist: () => mockUpdateWhitelist(),
  deleteWhitelist: () => mockDeleteWhitelist(),
}));

describe('useErrorLogStore', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useErrorLogStore.setState({
      list: [],
      total: 0,
      loading: false,
      currentLog: null,
      stats: null,
      whitelist: [],
      filters: {},
    });
  });

  it('should initialize with default state', () => {
    const state = useErrorLogStore.getState();

    expect(state.list).toEqual([]);
    expect(state.total).toBe(0);
    expect(state.loading).toBe(false);
    expect(state.currentLog).toBeNull();
    expect(state.stats).toBeNull();
    expect(state.whitelist).toEqual([]);
    expect(state.filters).toEqual({});
  });

  it('should fetch error logs', async () => {
    mockGetErrorLogList.mockResolvedValue({
      list: [{ id: 1, message: 'Test error' }],
      total: 1,
    });

    await act(async () => {
      await useErrorLogStore.getState().fetchErrorLogs({}, 1, 20);
    });

    const state = useErrorLogStore.getState();
    expect(state.list).toHaveLength(1);
    expect(state.total).toBe(1);
  });

  it('should fetch stats', async () => {
    mockGetErrorStats.mockResolvedValue({
      total: 10,
      unresolved: 5,
      bySource: {},
      byType: {},
    });

    await act(async () => {
      await useErrorLogStore.getState().fetchStats();
    });

    const state = useErrorLogStore.getState();
    expect(state.stats?.total).toBe(10);
    expect(state.stats?.unresolved).toBe(5);
  });

  it('should fetch whitelist', async () => {
    mockGetWhitelist.mockResolvedValue([
      { id: 1, name: 'Rule 1', pattern: '.*test.*' },
    ]);

    await act(async () => {
      await useErrorLogStore.getState().fetchWhitelist();
    });

    const state = useErrorLogStore.getState();
    expect(state.whitelist).toHaveLength(1);
  });

  it('should handle view detail', () => {
    const mockLog = { id: 1, message: 'Test error' };

    act(() => {
      useErrorLogStore.getState().handleViewDetail(mockLog as any);
    });

    expect(useErrorLogStore.getState().currentLog).toEqual(mockLog);
  });

  it('should clear current log', () => {
    const mockLog = { id: 1, message: 'Test error' };

    act(() => {
      useErrorLogStore.getState().handleViewDetail(mockLog as any);
    });

    expect(useErrorLogStore.getState().currentLog).toEqual(mockLog);

    act(() => {
      useErrorLogStore.getState().clearCurrentLog();
    });

    expect(useErrorLogStore.getState().currentLog).toBeNull();
  });

  it('should set filters', () => {
    const filters = { source: 'frontend', isResolved: 'false' };

    act(() => {
      useErrorLogStore.getState().setFilters(filters);
    });

    expect(useErrorLogStore.getState().filters).toEqual(filters);
  });
});
