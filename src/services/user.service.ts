import request from '@/utils/request';

export interface LoginParams {
  account: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  id?: number;
}

export interface LoginOutResponse {
  success: boolean;
}

export interface FindUsersParams {
  page?: number;
  pageSize?: number;
}

export interface User {
  id: number;
  account: string;
  phone?: string;
  email?: string;
  roleId?: number;
  role?: {
    id: number;
    name: string;
  };
  createTime: string;
  updateTime: string;
  lastLoginTime?: string;
  isDisable: boolean;
}

export interface FindUsersResponse {
  list: User[];
  total: number;
  page: number;
  pageSize: number;
}

export const userService = {
  login: (data: LoginParams) =>
    request<LoginResponse>({
      url: 'api/user/login',
      method: 'POST',
      data,
    }),

  loginOut: () =>
    request<LoginOutResponse>({
      url: 'api/user/loginOut',
      method: 'GET',
    }),

  findUsers: (params?: FindUsersParams) =>
    request<FindUsersResponse>({
      url: 'api/user/findUsers',
      method: 'GET',
      params,
    }),
};

export default userService;
