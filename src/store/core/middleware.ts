import type { CacheState, CacheConfig } from './types';
import type { StateCreator, StoreApi } from 'zustand';

export function withCache<T extends CacheState>(
  _config: CacheConfig,
): (stateCreator: StateCreator<T, [], []>) => StateCreator<T, [], []> {
  return (stateCreator) => (set, get, api) => {
    return stateCreator(set, get, api);
  };
}

export function withLogger<T extends object>(
  name: string,
): (stateCreator: StateCreator<T, [], []>) => StateCreator<T, [], []> {
  return (stateCreator) => (set, get, api) => {
    return stateCreator(
      (partial, replace) => {
        if (import.meta.env.DEV) {
          console.log(`[${name}] Before:`, get());
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        set(partial as any, replace as any);
        if (import.meta.env.DEV) {
          console.log(`[${name}] After:`, get());
        }
      },
      get,
      api as StoreApi<T>,
    );
  };
}
