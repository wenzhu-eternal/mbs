export enum ErrorCode {
  UNKNOWN = 'UNKNOWN',
  NETWORK_ERROR = 'NETWORK_ERROR',
  TIMEOUT = 'TIMEOUT',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  SERVER_ERROR = 'SERVER_ERROR',
}

export interface AppError {
  code: ErrorCode;
  message: string;
  details?: unknown;
  timestamp: number;
}

export class AppErrorClass extends Error {
  code: ErrorCode;
  details?: unknown;
  timestamp: number;

  constructor(code: ErrorCode, message: string, details?: unknown) {
    super(message);
    this.code = code;
    this.details = details;
    this.timestamp = Date.now();
    this.name = 'AppError';
  }

  static fromError(error: unknown): AppErrorClass {
    if (error instanceof AppErrorClass) {
      return error;
    }

    if (error instanceof Error) {
      return new AppErrorClass(ErrorCode.UNKNOWN, error.message, error);
    }

    return new AppErrorClass(ErrorCode.UNKNOWN, String(error));
  }

  static networkError(message = '网络请求失败'): AppErrorClass {
    return new AppErrorClass(ErrorCode.NETWORK_ERROR, message);
  }

  static timeout(message = '请求超时'): AppErrorClass {
    return new AppErrorClass(ErrorCode.TIMEOUT, message);
  }

  static unauthorized(message = '未授权或登录失效'): AppErrorClass {
    return new AppErrorClass(ErrorCode.UNAUTHORIZED, message);
  }

  static forbidden(message = '权限不足'): AppErrorClass {
    return new AppErrorClass(ErrorCode.FORBIDDEN, message);
  }

  static notFound(message = '资源不存在'): AppErrorClass {
    return new AppErrorClass(ErrorCode.NOT_FOUND, message);
  }

  static validationError(message: string, details?: unknown): AppErrorClass {
    return new AppErrorClass(ErrorCode.VALIDATION_ERROR, message, details);
  }

  static serverError(message = '服务器错误'): AppErrorClass {
    return new AppErrorClass(ErrorCode.SERVER_ERROR, message);
  }
}

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof AppErrorClass) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  return '发生未知错误';
};

export const isNetworkError = (error: unknown): boolean => {
  if (error instanceof AppErrorClass) {
    return error.code === ErrorCode.NETWORK_ERROR;
  }
  return false;
};

export const isAuthError = (error: unknown): boolean => {
  if (error instanceof AppErrorClass) {
    return error.code === ErrorCode.UNAUTHORIZED || error.code === ErrorCode.FORBIDDEN;
  }
  return false;
};
