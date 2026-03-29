import React from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { createRoot } from 'react-dom/client';

import 'antd/dist/reset.css';
import 'dayjs/locale/zh-cn';

import { GlobalErrorHandler } from '@/components/GlobalErrorHandler';
import RouterComponents from '@/components/Router';
import { request } from '@/utils';

import './index.less';

const reportError = (data: {
  errorType: string;
  message: string;
  stack?: string;
  file?: string;
  line?: number;
  column?: number;
  url?: string;
  extra?: Record<string, unknown>;
}) => {
  request({
    url: 'api/error-log/reportError',
    method: 'POST',
    data: {
      source: 'frontend',
      ...data,
      extra: {
        ...data.extra,
        userAgent: navigator.userAgent,
        href: window.location.href,
      },
    },
  }).catch(() => {});
};

window.onerror = function (message, source, lineno, colno, error) {
  reportError({
    errorType: 'js_error',
    message: String(message),
    file: source || undefined,
    line: lineno || undefined,
    column: colno || undefined,
    stack: error?.stack,
  });
};

window.onunhandledrejection = function (event) {
  const error = event.reason;
  reportError({
    errorType: 'unhandled_promise',
    message: error?.message || String(error),
    stack: error?.stack,
  });
};

window.addEventListener('error', (event) => {
  if (event.target && event.target !== window) {
    const target = event.target as HTMLElement;
    reportError({
      errorType: 'resource_error',
      message: `Resource load error: ${target.tagName}`,
      file: (target as HTMLImageElement).src || (target as HTMLScriptElement).src,
      url: window.location.href,
    });
  }
}, true);

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <GlobalErrorHandler />
      <RouterComponents />
    </ConfigProvider>
  </React.StrictMode>,
);
