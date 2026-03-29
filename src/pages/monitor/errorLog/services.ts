import { request } from '@/utils';

export interface ErrorLogItem {
  id: number;
  source: 'frontend' | 'backend' | 'taro';
  errorType: string;
  message: string;
  stack: string;
  file: string;
  line: number;
  column: number;
  url: string;
  method: string;
  statusCode: number;
  extra: Record<string, unknown>;
  isResolved: boolean;
  resolvedAt: string;
  resolvedBy: number;
  createTime: string;
}

export interface ErrorStats {
  total: number;
  unresolved: number;
  bySource: Record<string, number>;
  byType: Record<string, number>;
}

export interface WhitelistItem {
  id: number;
  name: string;
  matchType: 'message' | 'url' | 'errorType' | 'file';
  pattern: string;
  isEnabled: boolean;
  remark: string;
  createTime: string;
}

export interface ErrorLogListParams {
  page: number;
  pageSize: number;
  source?: string;
  isResolved?: string;
  startTime?: string;
  endTime?: string;
  keyword?: string;
}

export interface ErrorLogListResult {
  list: ErrorLogItem[];
  total: number;
  page: number;
  pageSize: number;
}

export interface IState {
  list: ErrorLogItem[];
  total: number;
  page: number;
  pageSize: number;
  loading: boolean;
  drawerOpen: boolean;
  currentLog: ErrorLogItem | null;
  stats: ErrorStats | null;
  whitelist: WhitelistItem[];
  whitelistDrawerOpen: boolean;
  filters: {
    source?: string;
    isResolved?: string;
    startTime?: string;
    endTime?: string;
    keyword?: string;
  };
}

export const getErrorLogList = async (
  params: ErrorLogListParams,
): Promise<ErrorLogListResult> => {
  const searchParams = new URLSearchParams();
  searchParams.append('page', params.page.toString());
  searchParams.append('pageSize', params.pageSize.toString());
  if (params.source) searchParams.append('source', params.source);
  if (params.isResolved !== undefined && params.isResolved !== '') {
    searchParams.append('isResolved', params.isResolved);
  }
  if (params.startTime) searchParams.append('startTime', params.startTime);
  if (params.endTime) searchParams.append('endTime', params.endTime);
  if (params.keyword) searchParams.append('keyword', params.keyword);

  return request<ErrorLogListResult>({
    url: `api/error-log/getErrorLogList?${searchParams.toString()}`,
    skipError: true,
  });
};

export const getErrorStats = async (): Promise<ErrorStats> => {
  return request<ErrorStats>({
    url: 'api/error-log/getErrorStats',
    skipError: true,
  });
};

export const getWhitelist = async (): Promise<WhitelistItem[]> => {
  return request<WhitelistItem[]>({
    url: 'api/error-log/getWhitelist',
    skipError: true,
  });
};

export const resolveError = async (id: number): Promise<void> => {
  return request<void>({
    url: 'api/error-log/resolveError',
    method: 'POST',
    data: { id },
    skipError: true,
  });
};

export const addWhitelist = async (
  params: Omit<WhitelistItem, 'id' | 'createTime'>,
): Promise<void> => {
  return request<void>({
    url: 'api/error-log/addWhitelist',
    method: 'POST',
    data: params,
    skipError: true,
  });
};

export const updateWhitelist = async (
  params: Omit<WhitelistItem, 'createTime'>,
): Promise<void> => {
  return request<void>({
    url: 'api/error-log/updateWhitelist',
    method: 'POST',
    data: params,
    skipError: true,
  });
};

export const deleteWhitelist = async (id: number): Promise<void> => {
  return request<void>({
    url: 'api/error-log/deleteWhitelist',
    method: 'POST',
    data: { id },
    skipError: true,
  });
};
