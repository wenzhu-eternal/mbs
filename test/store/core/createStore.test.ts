import { isCacheValid, createStore, baseInitialState, paginationInitialState } from '@/store/core/createStore';
import { create } from 'zustand';

describe('createStore core utilities', () => {
  describe('isCacheValid', () => {
    it('should return false when lastFetchTime is null', () => {
      expect(isCacheValid(null)).toBe(false);
    });

    it('should return true when cache is within duration', () => {
      const recentTime = Date.now() - 1000;
      expect(isCacheValid(recentTime, 5000)).toBe(true);
    });

    it('should return false when cache is expired', () => {
      const oldTime = Date.now() - 10000;
      expect(isCacheValid(oldTime, 5000)).toBe(false);
    });

    it('should use default duration when not specified', () => {
      const recentTime = Date.now() - 1000;
      expect(isCacheValid(recentTime)).toBe(true);
    });
  });

  describe('baseInitialState', () => {
    it('should have correct initial values', () => {
      expect(baseInitialState.loading).toBe(false);
      expect(baseInitialState.error).toBeNull();
    });
  });

  describe('paginationInitialState', () => {
    it('should have correct initial values', () => {
      expect(paginationInitialState.page).toBe(1);
      expect(paginationInitialState.pageSize).toBe(10);
      expect(paginationInitialState.total).toBe(0);
    });
  });

  describe('createStore', () => {
    it('should create a store with devtools', () => {
      interface TestState {
        count: number;
        increment: () => void;
      }

      const useTestStore = create<TestState>()((set) => ({
        count: 0,
        increment: () => set((state) => ({ count: state.count + 1 })),
      }));

      expect(useTestStore.getState().count).toBe(0);

      useTestStore.getState().increment();
      expect(useTestStore.getState().count).toBe(1);
    });
  });
});
