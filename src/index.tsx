import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

import { request } from '@/utils';
import RouterComponents from '@/routers/router';

import 'antd/dist/reset.css';
import './index.less';

window.onerror = function (message) {
  request({
    url: `api/log?error=${message}`,
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
