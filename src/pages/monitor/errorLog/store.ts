import { message } from 'antd';

import { createPageStore } from '@/store/core/createStore';

import {
  getErrorLogList,
  getErrorStats,
  getWhitelist,
  resolveError,
  addWhitelist,
  updateWhitelist,
  deleteWhitelist,
  type ErrorLogItem,
  type WhitelistItem,
  type ErrorStats,
} from './services';

interface ErrorLogFilters {
  source?: string;
  isResolved?: string;
  startTime?: string;
  endTime?: string;
  keyword?: string;
}

interface ErrorLogState {
  list: ErrorLogItem[];
  total: number;
  loading: boolean;
  currentLog: ErrorLogItem | null;
  stats: ErrorStats | null;
  whitelist: WhitelistItem[];
  filters: ErrorLogFilters;
}

interface ErrorLogActions {
  fetchErrorLogs: (
    filters: ErrorLogFilters,
    page: number,
    pageSize: number,
  ) => Promise<void>;
  fetchStats: () => Promise<void>;
  fetchWhitelist: () => Promise<void>;
  handleViewDetail: (record: ErrorLogItem) => void;
  handleResolve: (id: number) => Promise<void>;
  setFilters: (filters: ErrorLogFilters) => void;
  clearCurrentLog: () => void;
  handleAddWhitelist: (values: WhitelistItem) => Promise<boolean>;
  handleUpdateWhitelist: (values: WhitelistItem) => Promise<boolean>;
  handleDeleteWhitelist: (id: number) => Promise<boolean>;
}

type ErrorLogStore = ErrorLogState & ErrorLogActions;

const initialState: ErrorLogState = {
  list: [],
  total: 0,
  loading: false,
  currentLog: null,
  stats: null,
  whitelist: [],
  filters: {},
};

export const useErrorLogStore = createPageStore<ErrorLogStore>('error-log-store', (set) => ({
  ...initialState,

  fetchErrorLogs: async (filters, page, pageSize) => {
    set({ loading: true });
    try {
      const res = await getErrorLogList({
        page,
        pageSize,
        source: filters.source,
        isResolved: filters.isResolved,
        startTime: filters.startTime,
        endTime: filters.endTime,
        keyword: filters.keyword,
      });
      if (res && Array.isArray(res.list)) {
        set({
          list: res.list,
          total: typeof res.total === 'number' ? res.total : 0,
          loading: false,
        });
      } else {
        set({ list: [], total: 0, loading: false });
      }
    } catch {
      message.error('获取错误日志失败');
      set({ list: [], total: 0, loading: false });
    }
  },

  fetchStats: async () => {
    try {
      const res = await getErrorStats();
      if (res && typeof res.total === 'number') {
        set({ stats: res });
      } else {
        set({
          stats: { total: 0, unresolved: 0, bySource: {}, byType: {} },
        });
      }
    } catch {
      message.error('获取统计数据失败');
      set({ stats: { total: 0, unresolved: 0, bySource: {}, byType: {} } });
    }
  },

  fetchWhitelist: async () => {
    try {
      const res = await getWhitelist();
      if (res && Array.isArray(res)) {
        set({ whitelist: res });
      } else {
        set({ whitelist: [] });
      }
    } catch {
      message.error('获取白名单失败');
      set({ whitelist: [] });
    }
  },

  handleViewDetail: (record) => {
    set({ currentLog: record });
  },

  handleResolve: async (id) => {
    try {
      await resolveError(id);
      message.success('已标记为已处理');
    } catch (error) {
      message.error(`${error}，操作失败！`);
    }
  },

  setFilters: (filters) => {
    set({ filters });
  },

  clearCurrentLog: () => {
    set({ currentLog: null });
  },

  handleAddWhitelist: async (values) => {
    try {
      await addWhitelist(values);
      message.success('添加成功');
      return true;
    } catch (error) {
      message.error(`${error}，操作白名单失败！`);
      return false;
    }
  },

  handleUpdateWhitelist: async (values) => {
    try {
      await updateWhitelist(values);
      message.success('更新成功');
      return true;
    } catch (error) {
      message.error(`${error}，操作白名单失败！`);
      return false;
    }
  },

  handleDeleteWhitelist: async (id) => {
    try {
      await deleteWhitelist(id);
      message.success('删除成功');
      return true;
    } catch (error) {
      message.error(`${error}，删除白名单失败！`);
      return false;
    }
  },
}));
