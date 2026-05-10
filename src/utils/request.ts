import { message } from 'antd';
import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

import { useAuthStore } from '@/store/authStore';

import {
  mapStatusCodeToErrorCode,
  createAppError,
  showErrorNotification,
} from './errorHandler';

interface CustomResponse<T = unknown> {
  statusCode?: number;
  data?: T;
  message?: string;
}

interface RequestConfig extends AxiosRequestConfig {
  skipAuth?: boolean;
  skipError?: boolean;
  showLoading?: boolean;
  showError?: boolean;
}

const pendingRequests = new Map<string, AbortController>();

const generateRequestKey = (config: InternalAxiosRequestConfig): string => {
  const { method, url, params, data } = config;
  return [method, url, JSON.stringify(params), JSON.stringify(data)].join('&');
};

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: __CONFIG__.IP[import.meta.env.MODE],
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 10000,
  paramsSerializer: {
    indexes: null,
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const requestConfig = config as RequestConfig;

    if (requestConfig.showLoading) {
      message.loading({
        content: '加载中...',
        key: 'global-loading',
        duration: 0,
      });
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse<CustomResponse>) => {
    const requestConfig = response.config as RequestConfig;
    const requestKey = generateRequestKey(
      requestConfig as InternalAxiosRequestConfig,
    );
    pendingRequests.delete(requestKey);

    if (requestConfig.showLoading) {
      message.destroy('global-loading');
    }

    const { data } = response;
    const statusCode = data?.statusCode;

    switch (statusCode) {
      case 0:
        return response;
      case 400:
      case 401:
      case 403:
      case 404:
      case 500: {
        if (!requestConfig.skipError) {
          const errorCode = mapStatusCodeToErrorCode(statusCode);
          const appError = createAppError(errorCode, data?.message);
          showErrorNotification(appError);
        }
        if (statusCode === 401) {
          useAuthStore.getState().logout();
          const loginPath = '/login';
          if (window.location.pathname !== loginPath) {
            window.location.href = `${loginPath}?redirect=${encodeURIComponent(
              window.location.pathname,
            )}`;
          }
        }
        return Promise.reject(data?.message);
      }
      default:
        if (statusCode !== undefined && !requestConfig.skipError) {
          const errorCode = mapStatusCodeToErrorCode(statusCode);
          const appError = createAppError(errorCode, data?.message);
          showErrorNotification(appError);
        }
        return Promise.reject(data);
    }
  },
  (error: AxiosError) => {
    const requestConfig = error.config as RequestConfig;
    if (requestConfig) {
      const requestKey = generateRequestKey(
        requestConfig as InternalAxiosRequestConfig,
      );
      pendingRequests.delete(requestKey);
    }

    if (requestConfig?.showLoading) {
      message.destroy('global-loading');
    }

    if (axios.isCancel(error)) {
      return Promise.reject({ message: '请求已取消' });
    }

    if (!requestConfig?.skipError) {
      let errorCode = mapStatusCodeToErrorCode(0);

      if (error.code === 'ECONNABORTED') {
        errorCode = mapStatusCodeToErrorCode(408);
      } else if (!error.response) {
        errorCode = mapStatusCodeToErrorCode(0);
      } else {
        errorCode = mapStatusCodeToErrorCode(error.response.status);
      }

      const appError = createAppError(errorCode, error.message);
      showErrorNotification(appError);
    }

    return Promise.reject(error);
  },
);

export function request<T = unknown>(config: RequestConfig): Promise<T> {
  return axiosInstance(config).then((response) => {
    const data = response.data as CustomResponse<T>;
    if (data.statusCode === 0) {
      return data.data as T;
    }
    if ('success' in data) {
      return data as T;
    }
    return Promise.reject(data);
  });
}

export function cancelRequest(requestKey?: string) {
  if (requestKey) {
    const controller = pendingRequests.get(requestKey);
    if (controller) {
      controller.abort();
      pendingRequests.delete(requestKey);
    }
  } else {
    pendingRequests.forEach((controller) => controller.abort());
    pendingRequests.clear();
  }
}

export default request;
