import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN';

import RouterComponents from '@/routers/router';

import reportWebVitals from './reportWebVitals';
import './index.less';

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <RouterComponents />
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
