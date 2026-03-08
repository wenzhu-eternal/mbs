## 项目维护简要说明

> 本文是给"人 + AI"一起看的精简版说明，方便后续快速上手和修改。

---

### 1. 项目概况

- **项目名称**：mbs（中后台模板）
- **技术栈**：React 18.3.1 + TypeScript 5.9.3 + Vite 4.5.14 + Ant Design 5.29.3
- **主要功能**
  - 后台基础布局（侧边栏 + 头部 + 内容区 + 底部）
  - 动态路由 + 动态菜单（统一由 `config.ts` 配置）
  - Axios 请求封装（含统一返回码处理）
  - Socket.io WebSocket 示例
  - 高德地图定位示例
  - 统一时间处理工具

---

### 2. 关键文件速查

- **入口 & 全局**

  - `src/index.tsx`：应用入口，挂载 React、配置 Antd 中文、全局 `window.onerror` 错误上报。
  - `vite.config.ts`：Vite 配置，注入全局 `__CONFIG__`，设置别名 `@ -> src`。
  - `config.ts`：**核心配置**，包含：
    - 接口地址：`IP.development` / `IP.production`
    - 路由 + 菜单：`routers` 数组

- **路由 & 布局**

  - `src/routers/router.tsx`：根据 `__CONFIG__.routers` 动态渲染 React Router。
  - `src/routers/types.d.ts`：路由配置类型 `routerProps`。
  - `src/layouts/BasisLayout.tsx`：主布局（侧边栏 + 头部 + 内容 + 底部）。
  - `src/layouts/BlankLayout.tsx`：外层空布局。

- **菜单 & 公共组件**

  - `src/components/BasisMenu/SiderMenu.tsx`：左侧菜单（由路由配置生成）。
  - `src/components/BasisMenu/HeaderMenu.tsx`：顶部栏。
  - `src/components/BasisMenu/FooterMenu.tsx`：底部栏。
  - `src/components/WebSocket.tsx`：WebSocket 封装组件。
  - `src/components/Loading/index.tsx`：加载组件。

- **工具**

  - `src/utils/request.ts`：Axios 实例 + 响应拦截器。
  - `src/utils/upload.ts`：文件上传封装（基于 `request`）。
  - `src/utils/Icons.ts`：`MyIcon` 图标组件（IconFont）。
  - `src/utils/time.ts`：时间处理工具（`now()`、`formatIsoTime()`）。
  - `src/utils/index.ts`：工具统一导出。

- **示例页面**
  - `src/pages/home/index.tsx`：登录 / 查询 / 退出登录接口示例。
  - `src/pages/about/index.tsx`：WebSocket 使用示例。
  - `src/pages/map/index.tsx`：高德地图定位示例。

---

### 3. 三个核心点（重点给维护人看的）

#### 3.1 重命名逻辑（⚠️ 改文件名/路径时务必看）

- 路由组件加载逻辑在：`src/routers/router.tsx` → `renderRouter()`。
- 它会根据配置里的 `route.element` 去匹配真实文件路径：
  - 代码（简化描述）：通过 `import.meta.glob('../**/**.tsx')` + 正则 `"*${route.element}(/index)?.(ts|tsx)$"` 找组件。
- **规则约定（建议保持）：**
  - 路由配置写法：`element: 'pages/home'`
  - 对应文件路径：`src/pages/home/index.tsx` 或 `src/pages/home.tsx`
- **⚠️ 风险：**
  - 只改了文件/目录名，却没改 `config.ts` 里的 `element`，会导致加载不到组件，最终回退到 404。
- **操作提示：**
  - 重命名任何页面文件或目录时，请同步搜索 `element: 'xxx'` 并一起修改。

#### 3.2 时间处理工具（已实现）

- 本项目已提供统一的时间处理工具：`src/utils/time.ts`
- **可用函数：**
  - `now()`：获取当前时间戳（毫秒）
  - `formatIsoTime(timestamp: number)`：将时间戳转换为 ISO 格式字符串
- **使用示例：**

  ```typescript
  import { now, formatIsoTime } from '@/utils/time';

  const currentTime = now();
  const isoTime = formatIsoTime(currentTime);
  ```

- **扩展建议：**
  - 如需更多时间格式化功能，可在 `src/utils/time.ts` 中添加新函数
  - 与后端约定：所有时间字段由后端提供（例如 `createTime` / `updateTime`），前端负责展示

#### 3.3 权限配置（当前实现 & 扩展方向）

- 当前代码中 **没有显式的前端"权限路由守卫"**，主要依赖：
  - 登录态：依靠 Cookie（`withCredentials: true`）。
  - 后端返回码：`src/utils/request.ts` 中读取 `data.statusCode`。
    - `0`：业务成功。
    - `400`：业务错误，直接 `reject`。
    - `401`：调用 `notification.error`，提示未授权 / 未登录。
- **现状：**
  - 遇到 401 只弹出提示，不会自动跳转登录页，也不会限制用户路由访问。
- **若你要扩展权限功能，推荐方向：**
  - 在 `request` 拦截器中：
    - 收到 401 时增加逻辑：清理登录态 + 重定向到登录页（例如 `/login`）。
  - 在路由配置 `routerProps` 中加上权限字段（示例）：
    - `roles?: string[]`
  - 在 `SiderMenu` 和 `renderRouter` 中根据当前用户角色过滤无权限路由。

---

### 4. 运行 & 配置快速说明

- **本地启动**

  - 安装依赖：`pnpm install`（或 `npm install`）
  - 启动开发：`pnpm dev`（默认端口 `http://localhost:3000`）

- **构建部署**

  - 构建生产版本：`pnpm build`
  - CI/CD 部署：`pnpm ci:deploy`

- **后端地址配置（重要）**

  - 编辑 `config.ts`：
    - 开发环境：`IP.development`，如 `http://localhost:9000/`
    - 生产环境：`IP.production`，如 `https://api.example.com/`
  - 所有接口 & WebSocket 都通过 `__CONFIG__.IP[import.meta.env.MODE]` 访问后端。⚠️

- **高德地图 Key**
  - 文件：`src/pages/map/index.tsx`
  - 字段：`AMapLoader.load({ key: 'xxx', ... })`
  - 上线前请替换为你自己的正式 Key。

---

### 5. 开发规范

- **代码风格**

  - 使用 ESLint + Prettier 进行代码格式化
  - 提交前会自动运行 `lint-staged` 检查代码质量
  - 遵循 TypeScript 严格模式

- **Git 提交**

  - 使用 Husky 进行 Git 钩子管理
  - Pre-commit：自动运行 lint-staged
  - Pre-push：自动运行 CI 部署

- **包管理**
  - 使用 pnpm 作为包管理器（版本 7.15.0+）
  - 优先使用 `pnpm add` 而非 `npm install`

---

### 6. 给未来维护者的一点小建议

- **增加新页面时：**

  1. 在 `src/pages/` 下创建对应组件文件。
  2. 在 `config.ts` 的 `routers` 中新增路由项（`path` / `name` / `icon` / `element` 等）。
  3. 确认 `element` 与文件路径符合上文"重命名逻辑"的规则。

- **时间处理：**

  - 使用 `src/utils/time.ts` 中的统一函数
  - 避免直接使用 `Date.now()` 或 `new Date()`，便于后续统一修改

- **如需加权限：**

  - 从拦截器和路由层两个方向入手（见 3.3），前后端约定统一的 `statusCode` 和角色信息字段。

- **如需扩展时间功能：**
  - 在 `src/utils/time.ts` 中添加新的时间处理函数
  - 保持函数命名清晰，参数类型明确

---

### 7. 常见问题

- **Q: 路由页面显示 404？**

  - A: 检查 `config.ts` 中的 `element` 字段是否与实际文件路径匹配

- **Q: 接口请求失败？**

  - A: 检查 `config.ts` 中的后端地址配置是否正确

- **Q: 高德地图无法加载？**

  - A: 检查 `src/pages/map/index.tsx` 中的 Key 是否有效

- **Q: 时间格式不符合需求？**
  - A: 在 `src/utils/time.ts` 中添加自定义格式化函数
