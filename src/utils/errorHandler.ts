import { notification } from 'antd';

import { ErrorCode } from '@/types/error';
import type { AppError, ErrorResponse } from '@/types/error';

const ERROR_MESSAGES: Record<ErrorCode, string> = {
  UNKNOWN: '未知错误，请稍后重试',
  NETWORK_ERROR: '网络连接失败，请检查网络',
  UNAUTHORIZED: '登录已过期，请重新登录',
  FORBIDDEN: '没有权限执行此操作',
  NOT_FOUND: '请求的资源不存在',
  VALIDATION_ERROR: '请求参数错误',
  SERVER_ERROR: '服务器错误，请稍后重试',
  TIMEOUT: '请求超时，请稍后重试',
};

export const mapStatusCodeToErrorCode = (statusCode: number): ErrorCode => {
  const mapping: Record<number, ErrorCode> = {
    400: ErrorCode.VALIDATION_ERROR,
    401: ErrorCode.UNAUTHORIZED,
    403: ErrorCode.FORBIDDEN,
    404: ErrorCode.NOT_FOUND,
    408: ErrorCode.TIMEOUT,
    500: ErrorCode.SERVER_ERROR,
    502: ErrorCode.SERVER_ERROR,
    503: ErrorCode.SERVER_ERROR,
    504: ErrorCode.TIMEOUT,
  };
  return mapping[statusCode] || ErrorCode.UNKNOWN;
};

export const createAppError = (
  code: ErrorCode,
  message?: string,
  details?: unknown,
): AppError => ({
  code,
  message: message || ERROR_MESSAGES[code],
  details,
  timestamp: new Date().toISOString(),
});

export const parseErrorResponse = (response: ErrorResponse): AppError => {
  const code = mapStatusCodeToErrorCode(response.statusCode);
  return createAppError(code, response.message, response.data);
};

export const showErrorNotification = (error: AppError): void => {
  const config = {
    UNAUTHORIZED: { type: 'error' as const, title: '认证失败' },
    FORBIDDEN: { type: 'error' as const, title: '权限不足' },
    VALIDATION_ERROR: { type: 'warning' as const, title: '参数错误' },
    NETWORK_ERROR: { type: 'error' as const, title: '网络错误' },
    TIMEOUT: { type: 'warning' as const, title: '请求超时' },
    SERVER_ERROR: { type: 'error' as const, title: '服务器错误' },
    NOT_FOUND: { type: 'warning' as const, title: '资源不存在' },
    UNKNOWN: { type: 'error' as const, title: '未知错误' },
  };

  const { type, title } = config[error.code];

  notification[type]({
    message: title,
    description: error.message,
  });
};
