import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

import { request } from '@/utils';
import RouterComponents from '@/routers/router';

import './index.less';

window.onerror = function (message) {
  request({
    url: `api/log?error=${message}`,
    method: 'GET',
  });
};

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <RouterComponents />
  </ConfigProvider>,
  document.getElementById('root'),
);
