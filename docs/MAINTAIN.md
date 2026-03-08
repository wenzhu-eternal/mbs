# MBS 项目维护说明

> 本文是给"人 + AI"一起看的精简版说明，方便后续快速上手和修改。

---

## 📋 目录

- [1. 项目概况](#1-项目概况)
- [2. 技术栈](#2-技术栈)
- [3. 项目结构](#3-项目结构)
- [4. 关键文件速查](#4-关键文件速查)
- [5. 核心功能说明](#5-核心功能说明)
- [6. 运行 & 配置](#6--运行--配置)
- [7. 开发规范](#7-开发规范)
- [8. 常见问题](#8-常见问题)

---

## 1. 项目概况

- **项目名称**: mbs（中后台模板）
- **项目描述**: a private Middle and backstage
- **项目类型**: 前端应用
- **开发语言**: TypeScript
- **框架**: React 18.3.1 + Vite 4.5.14
- **UI 框架**: Ant Design 5.29.3
- **版本**: 1.0.0

---

## 2. 技术栈

### 核心框架

- **React**: v18.3.1 - UI 框架
- **TypeScript**: v5.9.3 - 类型安全
- **Vite**: v4.5.14 - 构建工具

### 路由 & UI

- **React Router**: v6.30.3 - 路由管理
- **Ant Design**: v5.29.3 - UI 组件库
- **@ant-design/icons**: v5.6.1 - 图标库

### 网络通信

- **Axios**: v1.4.0 - HTTP 请求
- **Socket.io-client**: v4.6.1 - WebSocket 客户端

### 其他依赖

- **Less**: v4.1.3 - CSS 预处理器
- **classnames**: v2.3.2 - 类名工具
- **@amap/amap-jsapi-loader**: v1.0.1 - 高德地图加载器

### 开发工具

- **ESLint**: v8.57.1 - 代码检查
- **Prettier**: v2.8.8 - 代码格式化
- **Husky**: v8.0.3 - Git 钩子
- **lint-staged**: v13.2.2 - 暂存文件检查
- **mb-ci**: v0.1.1 - CI/CD 工具

---

## 3. 项目结构

```
mbs/
├── src/
│   ├── assets/              # 静态资源
│   │   ├── favicon.ico
│   │   └── logo.svg
│   ├── components/           # 公共组件
│   │   ├── BasisMenu/       # 菜单组件
│   │   │   ├── SiderMenu.tsx      # 侧边栏菜单
│   │   │   ├── HeaderMenu.tsx     # 顶部栏
│   │   │   ├── FooterMenu.tsx     # 底部栏
│   │   │   └── styles.module.less # 样式
│   │   ├── Loading/         # 加载组件
│   │   ├── NotFount/        # 404 页面
│   │   └── WebSocket.tsx    # WebSocket 组件
│   ├── layouts/             # 布局组件
│   │   ├── BasisLayout.tsx  # 主布局
│   │   ├── BlankLayout.tsx  # 空布局
│   │   └── BasisLayout.module.less
│   ├── pages/               # 页面组件
│   │   ├── home/           # 首页（接口示例）
│   │   ├── about/          # WebSocket 示例
│   │   └── map/            # 高德地图示例
│   ├── routers/             # 路由配置
│   │   ├── router.tsx      # 路由渲染
│   │   └── types.d.ts      # 类型定义
│   ├── services/            # 接口服务
│   │   ├── user.service.ts # 用户相关接口
│   │   ├── file.service.ts # 文件上传接口
│   │   └── index.ts       # 统一导出
│   ├── utils/               # 工具函数
│   │   ├── request.ts      # Axios 封装
│   │   ├── upload.ts       # 文件上传
│   │   ├── Icons.ts        # 图标组件
│   │   ├── time.ts         # 时间处理
│   │   └── index.ts        # 统一导出
│   ├── index.tsx            # 应用入口
│   ├── index.less           # 全局样式
│   └── vite-env.d.ts        # Vite 类型声明
├── docs/                    # 文档目录
│   └── MAINTAIN.md          # 维护文档
├── config.ts                # 项目配置
├── index.html               # HTML 模板
├── package.json             # 项目依赖
├── tsconfig.json            # TypeScript 配置
├── vite.config.ts           # Vite 配置
└── README.md                # 项目说明
```

---

## 4. 关键文件速查

### 入口 & 全局

- **[src/index.tsx](../src/index.tsx)**: 应用入口

  - 挂载 React 应用
  - 配置 Ant Design 中文语言
  - 全局 `window.onerror` 错误上报

- **[vite.config.ts](../vite.config.ts)**: Vite 配置

  - 注入全局 `__CONFIG__` 变量
  - 设置别名 `@ -> src`
  - 配置 Less 预处理器

- **[config.ts](../config.ts)**: 核心配置
  - 接口地址：`IP.development` / `IP.production`
  - 路由 + 菜单：`routers` 数组

### 路由 & 布局

- **[src/routers/router.tsx](../src/routers/router.tsx)**: 路由渲染

  - 根据 `__CONFIG__.routers` 动态渲染 React Router
  - 支持懒加载和嵌套路由

- **[src/routers/types.d.ts](../src/routers/types.d.ts)**: 路由类型

  - `routerProps` 接口定义

- **[src/layouts/BasisLayout.tsx](../src/layouts/BasisLayout.tsx)**: 主布局

  - 侧边栏 + 头部 + 内容区 + 底部

- **[src/layouts/BlankLayout.tsx](../src/layouts/BlankLayout.tsx)**: 空布局
  - 用于登录页等特殊页面

### 菜单 & 公共组件

- **[src/components/BasisMenu/SiderMenu.tsx](../src/components/BasisMenu/SiderMenu.tsx)**: 侧边栏菜单

  - 由路由配置动态生成

- **[src/components/BasisMenu/HeaderMenu.tsx](../src/components/BasisMenu/HeaderMenu.tsx)**: 顶部栏

  - 用户信息、退出登录等

- **[src/components/BasisMenu/FooterMenu.tsx](../src/components/BasisMenu/FooterMenu.tsx)**: 底部栏

  - 版权信息等

- **[src/components/WebSocket.tsx](../src/components/WebSocket.tsx)**: WebSocket 封装

  - Socket.io 客户端连接管理

- **[src/components/Loading/index.tsx](../src/components/Loading/index.tsx)**: 加载组件
  - 全局加载状态显示

### 工具函数

- **[src/utils/request.ts](../src/utils/request.ts)**: Axios 封装

  - 请求/响应拦截器
  - 统一错误处理
  - 自动携带 Cookie

- **[src/utils/upload.ts](../src/utils/upload.ts)**: 文件上传封装

  - 基于 `request` 实现
  - 支持进度回调

- **[src/utils/Icons.ts](../src/utils/Icons.ts)**: 图标组件

  - IconFont 图标封装

- **[src/utils/time.ts](../src/utils/time.ts)**: 时间处理工具

  - `now()`: 获取当前时间戳
  - `formatIsoTime()`: 格式化时间

- **[src/utils/index.ts](../src/utils/index.ts)**: 工具统一导出

### 接口服务

- **[src/services/user.service.ts](../src/services/user.service.ts)**: 用户相关接口

  - `login()`: 用户登录
  - `loginOut()`: 用户登出
  - `findUsers()`: 查询用户列表

- **[src/services/file.service.ts](../src/services/file.service.ts)**: 文件上传接口

  - `upload()`: 上传文件

- **[src/services/index.ts](../src/services/index.ts)**: 服务统一导出

### 示例页面

- **[src/pages/home/index.tsx](../src/pages/home/index.tsx)**: 接口示例

  - 登录 / 查询 / 退出登录

- **[src/pages/about/index.tsx](../src/pages/about/index.tsx)**: WebSocket 示例

  - 实时消息推送

- **[src/pages/map/index.tsx](../src/pages/map/index.tsx)**: 高德地图示例
  - 地图定位功能

---

## 5. 核心功能说明

### 5.1 动态路由 & 菜单

**实现原理**:

1. 在 [config.ts](../config.ts) 中配置 `routers` 数组
2. [src/routers/router.tsx](../src/routers/router.tsx) 读取配置动态渲染路由
3. [src/components/BasisMenu/SiderMenu.tsx](../src/components/BasisMenu/SiderMenu.tsx) 根据路由配置生成菜单

**路由配置示例**:

```typescript
{
  path: '/home',
  name: '首页',
  icon: 'HomeOutlined',
  element: 'pages/home',
}
```

**⚠️ 重命名逻辑**:

- 路由组件加载通过 `import.meta.glob('../**/**.tsx')` + 正则匹配
- 规则约定：
  - 配置写法：`element: 'pages/home'`
  - 对应文件：`src/pages/home/index.tsx` 或 `src/pages/home.tsx`
- 重命名文件/目录时，必须同步修改 [config.ts](../config.ts) 中的 `element` 字段

### 5.2 Axios 请求封装

**功能特性**:

- 统一的请求/响应拦截器
- 自动携带 Cookie（`withCredentials: true`）
- 统一的错误处理
- 支持请求取消

**返回码处理**:

- `0`: 业务成功
- `400`: 业务错误，直接 `reject`
- `401`: 未授权，弹出提示 + 自动跳转登录页

**使用示例**:

```typescript
import request from '@/utils/request';

request.get('/api/user/info');
request.post('/api/user/login', { account, password });
```

### 5.3 接口服务（Services）

**设计理念**:

- 按业务维度划分接口服务（如 `user.service.ts`、`file.service.ts`）
- 统一管理接口请求，避免重复代码
- 提供完整的 TypeScript 类型定义

**使用方式**:

```typescript
import { userService } from '@/services';

userService.login({ account, password });
userService.findUsers({ page: 1, pageSize: 10 });
userService.loginOut();
```

**文件结构**:

```
src/services/
├── user.service.ts  # 用户相关接口
├── file.service.ts  # 文件上传接口
└── index.ts        # 统一导出
```

### 5.4 WebSocket 通信

**实现方式**:

- 使用 Socket.io-client
- 封装在 [src/components/WebSocket.tsx](../src/components/WebSocket.tsx) 组件中
- 支持自动重连

**使用示例**:

```typescript
import WebSocket from '@/components/WebSocket';

<WebSocket url="ws://localhost:9000" />;
```

### 5.5 时间处理工具

**可用函数**:

- `now()`: 获取当前时间戳（毫秒）
- `formatIsoTime(timestamp: number)`: 将时间戳转换为 ISO 格式字符串

**使用示例**:

```typescript
import { now, formatIsoTime } from '@/utils/time';

const currentTime = now();
const isoTime = formatIsoTime(currentTime);
```

### 5.6 权限控制

**当前实现**:

- 依赖 Cookie（`withCredentials: true`）
- 后端返回码：`401` 弹出未授权提示 + 自动跳转登录页
- 无前端路由守卫

**扩展方向**:

1. 在路由配置中添加权限字段：
   - `roles?: string[]`
2. 在菜单和路由渲染中根据角色过滤

### 5.7 高德地图集成

**实现方式**:

- 使用 `@amap/amap-jsapi-loader` 加载地图
- 示例在 [src/pages/map/index.tsx](../src/pages/map/index.tsx)

**注意事项**:

- 上线前替换为正式 Key
- 文件位置：[src/pages/map/index.tsx](../src/pages/map/index.tsx)

---

## 6. 运行 & 配置

### 6.1 环境准备

```bash
# 检查 Node.js 版本
node --version  # 需要 v18+

# 检查 pnpm 版本
pnpm --version  # 需要 v7.15.0+
```

### 6.2 安装依赖

```bash
# 使用 pnpm（推荐）
pnpm install

# 或使用 npm
npm install
```

### 6.3 启动开发

```bash
# 开发环境
pnpm dev

# 访问地址
http://localhost:3000
```

### 6.4 构建部署

```bash
# 构建生产版本
pnpm build

# CI/CD 部署
pnpm ci:deploy
```

### 6.5 后端地址配置

**重要**: 修改 [config.ts](../config.ts) 中的后端地址

```typescript
const IP = {
  development: 'http://localhost:9000/', // 开发环境
  production: 'https://api.example.com/', // 生产环境
};
```

所有接口 & WebSocket 都通过 `__CONFIG__.IP[import.meta.env.MODE]` 访问后端。

### 6.6 高德地图 Key

**文件**: [src/pages/map/index.tsx](../src/pages/map/index.tsx)

**字段**: `AMapLoader.load({ key: 'xxx', ... })`

**注意**: 上线前请替换为你自己的正式 Key。

---

## 7. 开发规范

### 7.1 代码风格

- 使用 ESLint + Prettier 进行代码格式化
- 提交前自动运行 `lint-staged` 检查代码质量
- 遵循 TypeScript 严格模式

### 7.2 Git 提交

- 使用 Husky 进行 Git 钩子管理
- Pre-commit: 自动运行 lint-staged
- Pre-push: 自动运行 CI 部署

### 7.3 包管理

- 使用 pnpm 作为包管理器（版本 7.15.0+）
- 优先使用 `pnpm add` 而非 `npm install`

### 7.4 命名规范

- **文件命名**: kebab-case（如 `user-list.tsx`）
- **组件命名**: PascalCase（如 `UserList`）
- **函数/变量**: camelCase（如 `getUserInfo`）
- **常量**: UPPER_CASE（如 `API_BASE_URL`）

---

## 8. 常见问题

### Q: 路由页面显示 404？

**A**: 检查 [config.ts](../config.ts) 中的 `element` 字段是否与实际文件路径匹配

### Q: 接口请求失败？

**A**: 检查 [config.ts](../config.ts) 中的后端地址配置是否正确

### Q: 高德地图无法加载？

**A**: 检查 [src/pages/map/index.tsx](../src/pages/map/index.tsx) 中的 Key 是否有效

### Q: 时间格式不符合需求？

**A**: 在 [src/utils/time.ts](../src/utils/time.ts) 中添加自定义格式化函数

### Q: WebSocket 连接失败？

**A**:

1. 检查后端 WebSocket 服务是否启动
2. 检查 [config.ts](../config.ts) 中的 WebSocket 地址配置
3. 查看浏览器控制台错误信息

### Q: 权限验证不生效？

**A**:

1. 确认后端返回了正确的 Token
2. 检查 Cookie 是否正确设置
3. 查看请求头中是否携带了 Cookie

---

## 📝 给未来维护者的建议

### 增加新页面

1. 在 `src/pages/` 下创建对应组件文件
2. 在 [config.ts](../config.ts) 的 `routers` 中新增路由项
3. 确认 `element` 与文件路径符合规则

### 时间处理

- 使用 [src/utils/time.ts](../src/utils/time.ts) 中的统一函数
- 避免直接使用 `Date.now()` 或 `new Date()`

### 添加权限

- 从拦截器和路由层两个方向入手
- 前后端约定统一的 `statusCode` 和角色信息字段

### 扩展时间功能

- 在 [src/utils/time.ts](../src/utils/time.ts) 中添加新的时间处理函数
- 保持函数命名清晰，参数类型明确

---

**文档版本**: 1.1.0  
**最后更新**: 2026-03-08  
**维护者**: Development Team
