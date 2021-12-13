import axios from 'axios';
import { notification } from 'antd';
import cookie from 'react-cookies';

export const getIP = () => {
  if (process.env.NODE_ENV === 'production') {
    return '';
  }
  return 'http://localhost:9000/';
};

const request = axios.create({
  baseURL: getIP(),
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 3000,
})

request.interceptors.request.use((config: any) => {
  config['headers']['x-auth-token'] = cookie.load('x-auth-token');
  return config;
});

request.interceptors.response.use((response: any) => {
  const { data, config: { headers } } = response;
  switch (data.statusCode) {
    case 0: {
      const token = headers['x-auth-token'];
      if (token) {
        cookie.save('x-auth-token', token, { path: '/' });
      }
      return data.data;
    };
    case 400: return Promise.reject(data.data);
    case 401: {
      return notification['error']({
        message: data.message,
        description: data.data,
      });
    };
  }
});

export default request;
