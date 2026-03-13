import { notification } from 'antd';
import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

interface CustomResponse<T = unknown> {
  statusCode?: number;
  data?: T;
  message?: string;
}

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: __CONFIG__.IP[import.meta.env.MODE],
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 3000,
});

// 这里通过类型断言绕过 Axios 对拦截器返回值的严格约束，便于直接返回业务 data
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(axiosInstance.interceptors.response as any).use(
  (response: AxiosResponse<CustomResponse>) => {
    const { data } = response;
    const statusCode = data?.statusCode;

    switch (statusCode) {
      case 0:
        return data?.data as unknown;
      case 400:
        return Promise.reject(data?.data);
      case 401: {
        notification.error({
          message: data?.message || '未授权或登录失效',
          description: data?.data as string,
        });

        // 简单的前端“登录守卫”：收到 401 时统一跳回登录页
        const loginPath = '/layout/one/one';
        if (window.location.pathname !== loginPath) {
          window.setTimeout(() => {
            window.location.href = loginPath;
          }, 0);
        }

        return Promise.reject(data?.data);
      }
      default:
        // 未约定的返回码：统一走错误提示，方便排查
        if (statusCode !== undefined) {
          notification.error({
            message: '请求失败',
            description: data?.message || `状态码：${statusCode}`,
          });
        }
        return Promise.reject(data);
    }
  },
  (error: AxiosError) => {
    notification.error({
      message: '网络异常',
      description:
        error.message || '网络请求失败，请检查网络连接或稍后重试。',
    });
    return Promise.reject(error);
  },
);

export function request<T = unknown>(
  config: AxiosRequestConfig,
): Promise<T> {
  return axiosInstance(config) as Promise<T>;
}

export default request;
