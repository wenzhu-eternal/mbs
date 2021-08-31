/**
 * @Description: http 请求
 * @param {string} method 请求类型
 * @param {string} url
 * @param {any} body
 * @param {any} history
 */
import cookie from 'react-cookies';

export default function request(method: string, url: string, body?: any, history?: any) {
  method = method.toUpperCase();
  if (method === 'GET') {
    body = undefined;
  } else {
    body = body && JSON.stringify(body);
  }
  const c_token = cookie.load('x-auth-token');
  return fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'x-auth-token': c_token
    },
    body
  }).then((res) => {
    const token = res.headers.get('x-auth-token');
    if (token) {
      cookie.save('x-auth-token', token, { path: '/' });
    }
    if (res.status === 401) {
      // history.push('/');
      return Promise.reject('Unauthorized.');
    } else {
      return res.json();
    }
  });
}