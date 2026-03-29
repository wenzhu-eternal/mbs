import { useCallback, useState } from 'react';

import { DEFAULT_PAGINATION } from '@/constants';
import type { IPagination } from '@/types';

interface UsePaginationOptions {
  defaultCurrent?: number;
  defaultPageSize?: number;
}

interface UsePaginationReturn {
  pagination: IPagination;
  setPagination: (pagination: Partial<IPagination>) => void;
  setTotal: (total: number) => void;
  resetPagination: () => void;
  handleTableChange: (pagination: {
    current?: number;
    pageSize?: number;
  }) => void;
}

export function usePagination(
  options: UsePaginationOptions = {},
): UsePaginationReturn {
  const {
    defaultCurrent = DEFAULT_PAGINATION.current,
    defaultPageSize = DEFAULT_PAGINATION.pageSize,
  } = options;

  const [pagination, setPaginationState] = useState<IPagination>({
    current: defaultCurrent,
    pageSize: defaultPageSize,
    total: 0,
  });

  const setPagination = useCallback((newPagination: Partial<IPagination>) => {
    setPaginationState((prev) => ({ ...prev, ...newPagination }));
  }, []);

  const setTotal = useCallback((total: number) => {
    setPaginationState((prev) => ({ ...prev, total }));
  }, []);

  const resetPagination = useCallback(() => {
    setPaginationState({
      current: defaultCurrent,
      pageSize: defaultPageSize,
      total: 0,
    });
  }, [defaultCurrent, defaultPageSize]);

  const handleTableChange = useCallback(
    (tablePagination: { current?: number; pageSize?: number }) => {
      setPaginationState((prev) => ({
        ...prev,
        current: tablePagination.current || prev.current,
        pageSize: tablePagination.pageSize || prev.pageSize,
      }));
    },
    [],
  );

  return {
    pagination,
    setPagination,
    setTotal,
    resetPagination,
    handleTableChange,
  };
}
