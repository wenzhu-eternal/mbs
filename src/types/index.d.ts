import type { Dayjs } from 'dayjs';

export type DateType = Date | Dayjs;
export type AddType = 'add' | 'update';
export type TransactionsType = 0 | 1 | 2;
export type CalendarMode = 'year' | 'month' | 'day';

export interface IPagination {
  current: number;
  pageSize: number;
  total: number;
}

export interface IUser {
  id: number;
  account: string;
  password?: string;
  wxOpenid?: string;
  phone?: string;
  email?: string;
  transactions?: ITransactions[];
  bosses?: IBoss[];
  role?: IRole;
  roleID?: number;
  createTime: DateType;
  updateTime?: DateType;
  lastLoginTime?: DateType;
  isDisable: boolean;
}

export interface IRole {
  id: number;
  name: string;
  apiRoutes?: string;
  users?: IUser[];
  createTime: DateType;
  updateTime?: DateType;
  isDisable: boolean;
}

export interface IType {
  id: number;
  name: string;
  transactionsType: TransactionsType;
  transactions?: ITransactions[];
  createTime: DateType;
  lastUpdateTime?: DateType;
  isDisable: boolean;
}

export interface IBoss {
  id: number;
  name: string;
  transactions?: ITransactions[];
  user?: IUser;
  userID?: number;
  createTime: DateType;
  lastUpdateTime?: DateType;
  isDisable: boolean;
}

export interface ITransactions {
  id: number;
  description: string;
  price: number;
  actualDate: DateType;
  type?: IType;
  typeId: number;
  typeName?: string;
  typeTransactionsType: TransactionsType;
  boss?: IBoss;
  bossId?: number;
  bossName?: string;
  user?: IUser;
  userId?: number;
  createTime: DateType;
  lastUpdateTime?: DateType;
  isDisable: boolean;
}

export interface ApiResponse<T = unknown> {
  statusCode: number;
  data: T;
  message?: string;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PageParams {
  page?: number;
  pageSize?: number;
}

export interface PageResult<T> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ILoginResponse {
  success: boolean;
  id?: number;
  message?: string;
}
