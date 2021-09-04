/**
 * @Description: http 请求
 * @param {string} method 请求类型
 * @param {string} url
 * @param {any} body
 * @param {any} history
 */
import { message } from 'antd';
import cookie from 'react-cookies';

const getIP = () => {
  if (process.env.NODE_ENV === 'production') {
    return '';
  }
  return 'http://localhost:9000/';
};

export default function request(
  method: string,
  url: string,
  body?: any,
) {
  method = method.toUpperCase();
  if (method === 'GET') {
    body = undefined;
  } else {
    body = body && JSON.stringify(body);
  }
  const c_token = cookie.load('x-auth-token');
  return fetch(getIP() + url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'x-auth-token': c_token,
    },
    body,
  }).then((res) => {
    const token = res.headers.get('x-auth-token');
    if (token) {
      cookie.save('x-auth-token', token, { path: '/' });
    }
    return res.json().then((res) => {
      if (res.statusCode === 401) {
        message.error('你无权限或权限到期，请重新登录！').then(() => {
          if (!(window.location.pathname === '/')) {
            window.history.pushState('', '', '/');
            window.history.go();
          }
        })
      }
      return res;
    })
  });
}
