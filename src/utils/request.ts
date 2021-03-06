import axios from 'axios';
import { notification } from 'antd';

export const getIP = () => {
  if (process.env.NODE_ENV === 'production') {
    return '';
  }
  return 'http://localhost:9000/';
};

const request = axios.create({
  withCredentials: true,
  baseURL: getIP(),
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 3000,
});

request.interceptors.response.use((response: any) => {
  const { data } = response;
  switch (data.statusCode) {
    case 0:
      return data.data;
    case 400:
      return Promise.reject(data.data);
    case 401: {
      return notification['error']({
        message: data.message,
        description: data.data,
      });
    }
  }
});

export default request;
