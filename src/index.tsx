import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

import { request } from '@/utils';
import RouterComponents from '@/routers/router';

import 'antd/dist/reset.css';
import './index.less';

window.onerror = function (message, source, lineno, colno, error) {
  const params = new URLSearchParams({
    message: String(message),
    source: source || '',
    line: lineno?.toString() || '',
    column: colno?.toString() || '',
    time: new Date().toISOString(),
  });

  if (error && error.stack) {
    params.append('stack', error.stack);
  }

  request({
    url: `api/log?${params.toString()}`,
    method: 'GET',
  });
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <RouterComponents />
    </ConfigProvider>
  </React.StrictMode>,
);
