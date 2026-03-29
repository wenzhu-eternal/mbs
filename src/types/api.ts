export interface PaginatedResponse<T> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ApiResponse<T = unknown> {
  statusCode: number;
  timestamp: string;
  path: string;
  message: string;
  data: T;
}

export interface UserResponse {
  id: number;
  account: string;
  phone: string;
  email: string;
  isDisable: boolean;
  createTime: string;
  updateTime: string | null;
  lastLoginTime: string | null;
  role: { id: number; name: string } | null;
}

export interface TransactionResponse {
  id: number;
  description: string;
  price: number;
  actualDate: string;
  createTime: string;
  updateTime: string | null;
  isDisable: boolean;
  type: { id: number; name: string; type: number } | null;
  boss: { id: number; name: string } | null;
  user: { id: number; account: string } | null;
}

export interface RoleResponse {
  id: number;
  name: string;
  apiRoutes: string;
  isDisable: boolean;
  createTime: string;
  updateTime: string | null;
}

export interface TypeResponse {
  id: number;
  name: string;
  type: number;
  isDisable: boolean;
  createTime: string;
  updateTime: string | null;
}

export interface BossResponse {
  id: number;
  name: string;
  phone: string;
  isDisable: boolean;
  createTime: string;
  updateTime: string | null;
}
