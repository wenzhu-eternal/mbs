# 前端架构设计方案

## 一、整体架构概览

```
mbs/
├── config.ts                  # 应用配置（路由、API地址）
│
├── src/
│   ├── assets/                # 静态资源
│   ├── components/            # 公共组件
│   │   ├── AuthGuard/         # 路由权限守卫
│   │   ├── BasisMenu/         # 布局菜单组件
│   │   ├── GlobalErrorHandler/# 全局错误处理
│   │   ├── LazyImage/         # 图片懒加载
│   │   ├── Loading/           # 加载组件
│   │   ├── NotFound/          # 404页面
│   │   ├── Router/            # 路由组件
│   │   └── WebSocket.tsx      # WebSocket连接
│   │
│   ├── constants/             # 公共常量
│   ├── hooks/                 # 公共自定义Hooks
│   ├── layouts/               # 布局组件
│   │   ├── BasisLayout.tsx    # 主布局
│   │   └── BlankLayout.tsx    # 空白布局
│   │
│   ├── pages/                 # 页面（标准化结构）
│   ├── services/              # 公共API服务层
│   ├── store/                 # 状态管理（仅全局状态）
│   │   ├── core/              # Zustand底层核心
│   │   ├── authStore.ts       # 认证Store
│   │   └── appStore.ts        # 应用Store
│   │
│   ├── types/                 # 全局类型定义
│   ├── utils/                 # 全局工具函数
│   ├── index.tsx              # 应用入口
│   └── vite-env.d.ts          # Vite环境类型
│
└── test/                      # 测试目录（与src同级）
```

---

### 1.1 页面级标准结构

```
pages/[route]/
├── index.tsx              # 页面入口组件（必需）
├── store.ts               # 页面级Store
├── constants.ts           # 页面级常量
├── utils.ts               # 页面级工具函数
├── types.d.ts             # 页面级类型定义
├── styles.module.less     # 页面级样式
├── services.ts            # 页面级API服务
└── components/            # 页面子组件
```

### 1.2 页面级文件职责

| 文件                 | 职责            | 说明                                   |
| ------------------- | --------------- | -------------------------------------- |
| `index.tsx`         | 页面入口组件    | 页面主逻辑，组合子组件（必需）         |
| `store.ts`          | 页面级状态管理  | 使用 `createPageStore` 创建            |
| `constants.ts`      | 页面级常量      | 表格列配置、枚举值、默认配置等         |
| `utils.ts`          | 页面级工具函数  | 数据格式化、验证函数、参数构建等       |
| `types.d.ts`        | 页面级类型定义  | 页面特有的接口类型                     |
| `styles.module.less`| 页面级样式      | 页面整体布局样式                       |
| `services.ts`       | 页面级 API 服务 | 该页面专用的 API 请求封装              |
| `components/`       | 页面子组件      | 页面内的子组件，每个子组件独立目录     |

---

## 二、路由系统

### 2.1 路由配置 (`config.ts`)

采用**配置驱动**的动态路由：

```typescript
interface routerProps {
  path?: string;
  name?: string;
  icon?: string;
  form?: string;      // 重定向来源
  to?: string;        // 重定向目标
  element?: ReactNode;
  children?: routerProps[];
}

// 路由配置示例
{
  path: '/',
  element: 'layouts/BlankLayout',
  children: [
    { path: '/login', element: 'pages/login' },
    {
      path: '/',
      element: 'layouts/BasisLayout',
      children: [
        { path: '/monitor/errorLog', name: '错误日志', element: 'pages/monitor/errorLog', icon: 'icon-error' },
        { form: '/', to: '/monitor/errorLog' },  // 重定向
      ],
    },
  ],
}
```

### 2.2 路由渲染 (`components/Router/index.tsx`)

```typescript
// 核心逻辑：使用 import.meta.glob 实现懒加载
const modules = import.meta.glob('../../**/**.tsx');
const renderRouter = (routers?: routerProps[]) => ReactNode;
export default RouterComponents;
```

### 2.3 路由特性

| 特性         | 说明                                       |
| ------------ | ------------------------------------------ |
| **懒加载**   | 使用 `import.meta.glob` 实现路由组件懒加载 |
| **嵌套布局** | 支持 BasisLayout/BlankLayout 嵌套          |
| **权限控制** | 通过 AuthGuard 组件实现路由权限控制        |
| **重定向**   | 支持配置重定向路由                         |
| **菜单配置** | 支持 name、icon 属性用于菜单渲染           |

---

## 三、布局系统

### 3.1 布局结构

```
┌─────────────────────────────────────────────────────┐
│                     HeaderMenu                       │
├──────────┬──────────────────────────────────────────┤
│          │                                          │
│  Sider   │              Content                     │
│  Menu    │           (Outlet 渲染)                  │
│          │                                          │
├──────────┴──────────────────────────────────────────┤
│                     FooterMenu                       │
└─────────────────────────────────────────────────────┘
```

### 3.2 布局组件

| 组件           | 文件                      | 说明                         |
| -------------- | ------------------------- | ---------------------------- |
| `BasisLayout`  | `layouts/BasisLayout.tsx` | 主布局（侧边栏+头部+内容区） |
| `BlankLayout`  | `layouts/BlankLayout.tsx` | 空白布局（用于登录页等）     |

---

## 四、组件系统

### 4.1 公共组件列表

| 组件                 | 路径                              | 功能                           |
| -------------------- | --------------------------------- | ------------------------------ |
| `AuthGuard`          | `components/AuthGuard`            | 路由权限守卫，检查登录状态     |
| `Router`             | `components/Router`               | 路由渲染组件，解析配置生成路由 |
| `SiderMenu`          | `components/BasisMenu/SiderMenu`  | 侧边栏菜单                     |
| `HeaderMenu`         | `components/BasisMenu/HeaderMenu` | 头部菜单                       |
| `FooterMenu`         | `components/BasisMenu/FooterMenu` | 底部菜单                       |
| `Loading`            | `components/Loading`              | 加载状态组件                   |
| `NotFound`           | `components/NotFound`             | 404 页面                       |
| `GlobalErrorHandler` | `components/GlobalErrorHandler`   | 全局错误处理                   |

### 4.2 AuthGuard 权限守卫

```typescript
interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps): ReactNode;
// 功能：检查登录状态，未登录跳转登录页，已登录渲染子组件
```

### 4.3 组件命名规范

| 类型     | 约定               | 示例                      |
| -------- | ------------------ | ------------------------- |
| 组件文件 | PascalCase         | `BasisLayout.tsx`         |
| 样式文件 | camelCase + module | `styles.module.less`      |
| 组件导出 | default export     | `export default function` |

---

## 五、公共常量

### 5.1 常量定义

```typescript
// constants/index.ts
export const DEFAULT_PAGINATION = {
  current: 1,
  pageSize: 20,
} as const;
```

### 5.2 常量使用场景

| 常量                 | 使用场景                             |
| -------------------- | ------------------------------------ |
| `DEFAULT_PAGINATION` | 表格分页默认值、usePagination 初始化 |

---

## 六、公共服务层

### 6.1 服务文件结构

```
services/
├── index.ts           # 统一导出
└── ...                # 其他全局API服务
```

### 6.2 公共服务说明

| 服务         | 说明                 |
| ------------ | -------------------- |
| 文件上传     | 公共文件上传接口     |
| 错误上报     | 前端错误日志上报     |
| 当前用户     | 获取当前登录用户信息 |

### 6.3 服务层规范

| 规范         | 说明                                       |
| ------------ | ------------------------------------------ |
| **命名**     | 使用动词+名词：`uploadFile`、`getCurrentUser` |
| **返回值**   | 明确返回类型，使用泛型                     |
| **错误处理** | 默认设置 `skipError: true`                 |

---

## 七、类型系统

### 7.1 类型文件结构

```
types/
└── index.d.ts           # 统一导出
```

### 7.2 核心类型定义

```typescript
// 分页类型
export interface IPagination {
  current: number;
  pageSize: number;
  total: number;
}

// API响应
export interface ApiResponse<T = unknown> {
  statusCode: number;
  data: T;
  message?: string;
}

// 分页结果
export interface PageResult<T> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
}
```

### 7.3 业务实体类型

| 类型            | 说明           |
| --------------- | -------------- |
| `IUser`         | 用户类型       |
| `IRole`         | 角色类型       |
| `IErrorLog`     | 错误日志类型   |

---

## 八、工具函数

### 8.1 工具文件结构

```
utils/
├── index.ts         # 统一导出
├── request.ts       # HTTP请求封装
├── Icons.ts         # 图标组件
├── time.ts          # 时间处理工具
├── upload.ts        # 上传工具
├── error.ts         # 错误处理
└── errorHandler.ts  # 错误处理器
```

### 8.2 HTTP 请求封装 (`utils/request.ts`)

```typescript
interface RequestConfig extends AxiosRequestConfig {
  skipAuth?: boolean;     // 跳过认证
  skipError?: boolean;    // 跳过错误提示
  showLoading?: boolean;  // 显示全局加载状态
}

export function request<T = unknown>(config: RequestConfig): Promise<T>;
export function cancelRequest(requestKey?: string): void;
```

### 8.3 请求配置选项

| 参数          | 类型    | 默认值 | 说明             |
| ------------- | ------- | ------ | ---------------- |
| `skipAuth`    | boolean | false  | 跳过认证         |
| `skipError`   | boolean | false  | 跳过错误提示     |
| `showLoading` | boolean | false  | 显示全局加载状态 |

---

## 8.5 公共 Hooks

### 8.5.1 Hooks 文件结构

```
hooks/
├── index.ts           # 统一导出
├── usePagination.ts   # 分页 Hook
├── useModal.ts        # 弹窗 Hook
└── useRequest.ts      # 请求 Hook
```

### 8.5.2 分页 Hook (`usePagination.ts`)

```typescript
interface UsePaginationOptions {
  defaultCurrent?: number;
  defaultPageSize?: number;
}

interface UsePaginationReturn {
  pagination: IPagination;
  setPagination: (pagination: Partial<IPagination>) => void;
  setTotal: (total: number) => void;
  resetPagination: () => void;
  handleTableChange: (pagination: { current?: number; pageSize?: number }) => void;
}

export function usePagination(options?: UsePaginationOptions): UsePaginationReturn;
```

### 8.5.3 弹窗 Hook (`useModal.ts`)

```typescript
interface UseModalReturn {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export function useModal(initialState?: boolean): UseModalReturn;
```

### 8.5.4 请求 Hook (`useRequest.ts`)

```typescript
interface UseRequestOptions<T, P extends unknown[]> {
  requestFn: (...args: P) => Promise<T>;
  onSuccess?: (data: T) => void;
  onError?: (error: unknown) => void;
  successMessage?: string;
  errorMessage?: string;
}

interface UseRequestReturn<T, P extends unknown[]> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  run: (...args: P) => Promise<T | null>;
  reset: () => void;
}

export function useRequest<T, P extends unknown[] = unknown[]>(
  options: UseRequestOptions<T, P>
): UseRequestReturn<T, P>;
```

### 8.5.5 Hooks 使用场景

| Hook            | 使用场景                                 |
| --------------- | ---------------------------------------- |
| `usePagination` | 表格分页、列表分页                       |
| `useModal`      | 弹窗、抽屉、对话框的显示/隐藏控制        |
| `useRequest`    | API 请求状态管理（loading、error、data） |

---

## 九、状态管理

### 9.1 Store 文件结构

```
store/
├── core/                  # Zustand底层核心
│   ├── createStore.ts     # 通用Store工厂函数
│   ├── types.d.ts         # Store类型定义
│   ├── middleware.ts      # 自定义中间件
│   └── index.ts           # 导出
├── authStore.ts           # 认证Store
├── appStore.ts            # 应用Store
└── index.ts               # 统一导出
```

### 9.2 Store 分类

| Store           | 用途                                           | 作用域 |
| --------------- | ---------------------------------------------- | ------ |
| `authStore`     | 用户认证状态                                   | 全局   |
| `appStore`      | 应用状态（主题、侧边栏等）                     | 全局   |

> **注意**：页面级 Store 放在页面目录下的 `store.ts` 文件中。

### 9.3 核心类型定义 (`store/core/types.d.ts`)

```typescript
export interface BaseState {
  loading: boolean;
  error: string | null;
}

export interface BaseActions {
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export interface StoreConfig<T = unknown> {
  name: string;
  persist?: boolean;
  devtools?: boolean;
}
```

### 9.4 通用 Store 工厂函数 (`store/core/createStore.ts`)

```typescript
// 全局 Store 创建函数
export function createStore<T extends BaseState & BaseActions>(
  config: StoreConfig<T>,
  stateCreator: StateCreator<T, [], []>,
): UseBoundStore<StoreApi<T>>;

// 页面级 Store 创建函数（自动集成 devtools）
export function createPageStore<T>(
  name: string,
  stateCreator: StateCreator<T, [], []>,
): UseBoundStore<StoreApi<T>>;

// 缓存验证工具
export function isCacheValid(
  lastFetchTime: number | null,
  duration?: number,
): boolean;
```

---

## 十、页面级文件示例

### 10.1 常量文件 (`constants.ts`)

```typescript
export const TABLE_COLUMNS = [...] as const;
export const SEARCH_FIELDS = [...] as const;
export const MODAL_TYPE = { ADD: 'add', EDIT: 'edit', VIEW: 'view' } as const;
```

### 10.2 类型文件 (`types.d.ts`)

```typescript
export interface IErrorLogSearchParams { message?: string; page?: number; pageSize?: number; }
export interface IErrorLogFormData { message: string; source: string; }
```

### 10.3 服务文件 (`services.ts`)

```typescript
export const findErrorLogs = async (params: IErrorLogSearchParams): Promise<PageResult<IErrorLog>>;
export const resolveError = async (id: number): Promise<void>;
```

### 10.4 Store 文件 (`store.ts`)

```typescript
interface ErrorLogState {
  list: IErrorLog[];
  record: Partial<IErrorLog>;
  loading: boolean;
  total: number;
}

interface ErrorLogActions {
  fetchData: (page: number, pageSize: number) => Promise<void>;
  handleEdit: (log: IErrorLog) => void;
  handleSubmit: (values: IErrorLogFormData) => Promise<boolean>;
}

export const useErrorLogStore = createPageStore<ErrorLogState & ErrorLogActions>('errorLog-store', (set, get) => ({
  // 状态和操作...
}));
```

### 10.5 Store + Hooks 分离模式

| 层级      | 职责                | 示例                        |
| --------- | ------------------- | --------------------------- |
| **Store** | 业务逻辑、数据管理  | `useErrorLogStore`          |
| **Hooks** | UI 状态、分页、弹窗 | `usePagination`、`useModal` |

---

## 十一、架构优势

| 特性           | 说明                                       |
| -------------- | ------------------------------------------ |
| **统一底层**   | Zustand 核心提供通用的状态管理工具         |
| **类型安全**   | 完整的 TypeScript 类型定义                 |
| **开发体验**   | 集成 DevTools 中间件，便于调试             |
| **页面隔离**   | 每个页面有独立的 Store、Services、Types    |
| **标准化结构** | 统一的文件组织方式，便于维护和扩展         |
| **职责分离**   | 公共层与页面层清晰分离                     |
| **懒加载**     | 路由组件懒加载，优化首屏性能               |
| **权限控制**   | 统一的 AuthGuard 守卫，保护路由安全        |
