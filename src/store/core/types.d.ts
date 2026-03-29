import type { StoreApi, UseBoundStore } from 'zustand';

export interface BaseState {
  loading: boolean;
  error: string | null;
}

export interface BaseActions {
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}

export interface PaginationActions {
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  setTotal: (total: number) => void;
  resetPagination: () => void;
}

export interface CacheConfig {
  duration: number;
  enabled: boolean;
}

export interface CacheState {
  lastFetchTime: number | null;
}

export interface StoreConfig<T = unknown> {
  name: string;
  persist?: boolean;
  devtools?: boolean;
  cache?: CacheConfig;
  initialState?: Partial<T>;
}

export type CreateStoreFn<T extends BaseState & BaseActions> =
  () => UseBoundStore<StoreApi<T>>;
