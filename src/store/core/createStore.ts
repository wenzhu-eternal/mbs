import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import type {
  BaseState,
  BaseActions,
  StoreConfig,
  PaginationState,
  PaginationActions,
} from './types';
import type { StateCreator } from 'zustand';

const DEFAULT_CACHE_DURATION = 5 * 60 * 1000;

export const baseInitialState: BaseState = {
  loading: false,
  error: null,
};

export const paginationInitialState: PaginationState = {
  page: 1,
  pageSize: 10,
  total: 0,
};

export function createBaseActions<T extends BaseState>(
  set: (partial: Partial<T> | ((state: T) => Partial<T>)) => void,
  initialState: T,
): BaseActions {
  return {
    setLoading: (loading) => set({ loading } as Partial<T>),
    setError: (error) => set({ error } as Partial<T>),
    reset: () => set(initialState),
  };
}

export function createPaginationActions<T extends PaginationState>(
  set: (partial: Partial<T> | ((state: T) => Partial<T>)) => void,
  initialState: PaginationState,
): PaginationActions {
  return {
    setPage: (page) => set({ page } as Partial<T>),
    setPageSize: (pageSize) => set({ pageSize, page: 1 } as Partial<T>),
    setTotal: (total) => set({ total } as Partial<T>),
    resetPagination: () => set(initialState as Partial<T>),
  };
}

export function isCacheValid(
  lastFetchTime: number | null,
  duration: number = DEFAULT_CACHE_DURATION,
): boolean {
  return lastFetchTime !== null && Date.now() - lastFetchTime < duration;
}

export function createStore<T extends BaseState & BaseActions>(
  config: StoreConfig<T>,
  stateCreator: StateCreator<T, [], []>,
) {
  if (config.persist && config.devtools) {
    return create<T>()(
      devtools(persist(stateCreator, { name: config.name }), {
        name: config.name,
      }),
    );
  } else if (config.persist) {
    return create<T>()(persist(stateCreator, { name: config.name }));
  } else if (config.devtools) {
    return create<T>()(devtools(stateCreator, { name: config.name }));
  }
  return create<T>()(stateCreator);
}

export function createPageStore<T>(
  name: string,
  stateCreator: StateCreator<T, [], []>,
) {
  return create<T>()(devtools(stateCreator, { name }));
}
