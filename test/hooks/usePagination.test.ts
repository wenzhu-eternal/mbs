import { act, renderHook } from '@testing-library/react';

import { usePagination } from '@/hooks/usePagination';

describe('usePagination', () => {
  it('should initialize with default pagination', () => {
    const { result } = renderHook(() => usePagination());

    expect(result.current.pagination.current).toBe(1);
    expect(result.current.pagination.pageSize).toBe(20);
    expect(result.current.pagination.total).toBe(0);
  });

  it('should initialize with custom default values', () => {
    const { result } = renderHook(() =>
      usePagination({ defaultCurrent: 2, defaultPageSize: 50 }),
    );

    expect(result.current.pagination.current).toBe(2);
    expect(result.current.pagination.pageSize).toBe(50);
  });

  it('should set pagination', () => {
    const { result } = renderHook(() => usePagination());

    act(() => {
      result.current.setPagination({ current: 3, total: 100 });
    });

    expect(result.current.pagination.current).toBe(3);
    expect(result.current.pagination.total).toBe(100);
  });

  it('should set total', () => {
    const { result } = renderHook(() => usePagination());

    act(() => {
      result.current.setTotal(100);
    });

    expect(result.current.pagination.total).toBe(100);
  });

  it('should reset pagination', () => {
    const { result } = renderHook(() =>
      usePagination({ defaultCurrent: 2, defaultPageSize: 50 }),
    );

    act(() => {
      result.current.setPagination({ current: 5, total: 200 });
    });

    expect(result.current.pagination.current).toBe(5);
    expect(result.current.pagination.total).toBe(200);

    act(() => {
      result.current.resetPagination();
    });

    expect(result.current.pagination.current).toBe(2);
    expect(result.current.pagination.pageSize).toBe(50);
    expect(result.current.pagination.total).toBe(0);
  });

  it('should handle table change', () => {
    const { result } = renderHook(() => usePagination());

    act(() => {
      result.current.handleTableChange({ current: 3, pageSize: 50 });
    });

    expect(result.current.pagination.current).toBe(3);
    expect(result.current.pagination.pageSize).toBe(50);
  });
});
