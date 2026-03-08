# MBS

a private Middle and backstage

## 📋 项目概述

MBS 是一个基于 React 18 + TypeScript + Vite + Ant Design 的中后台管理系统模板，提供完整的前端解决方案。

### 技术栈

- **React**: v18.3.1 - UI 框架
- **TypeScript**: v5.9.3 - 类型安全
- **Vite**: v4.5.14 - 构建工具
- **Ant Design**: v5.29.3 - UI 组件库
- **React Router**: v6.30.3 - 路由管理
- **Axios**: v1.4.0 - HTTP 请求
- **Socket.io-client**: v4.6.1 - WebSocket 客户端

### 核心功能

- ✅ 后台基础布局（侧边栏 + 头部 + 内容区 + 底部）
- ✅ 动态路由 + 动态菜单（统一由 `config.ts` 配置）
- ✅ Axios 请求封装（含统一返回码处理）
- ✅ Socket.io WebSocket 示例
- ✅ 高德地图定位示例
- ✅ 统一时间处理工具
- ✅ 文件上传封装
- ✅ ESLint + Prettier 代码规范
- ✅ Husky + lint-staged Git 钩子

## 🚀 快速开始

### 使用模板创建项目

```bash
$ npx create-mb [name]

? 🤓 Which library do you want to use?
❯ mbs
  mbss

 ✨  File Generate Done
```

### 环境准备

```bash
# 检查 Node.js 版本
node --version  # 需要 v18+

# 检查 pnpm 版本
pnpm --version  # 需要 v7.15.0+
```

### 安装依赖

```bash
# 使用 pnpm（推荐）
pnpm install

# 或使用 npm
npm install
```

### 启动开发

```bash
# 开发环境
pnpm dev

# 访问地址
http://localhost:3000
```

### 构建部署

```bash
# 构建生产版本
pnpm build

# CI/CD 部署
pnpm ci:deploy
```

## 📁 项目结构

```
mbs/
├── src/
│   ├── assets/              # 静态资源
│   ├── components/           # 公共组件
│   │   ├── BasisMenu/       # 菜单组件
│   │   ├── Loading/         # 加载组件
│   │   ├── NotFount/        # 404 页面
│   │   └── WebSocket.tsx    # WebSocket 组件
│   ├── layouts/             # 布局组件
│   │   ├── BasisLayout.tsx  # 主布局
│   │   └── BlankLayout.tsx  # 空布局
│   ├── pages/               # 页面组件
│   │   ├── home/           # 首页（接口示例）
│   │   ├── about/          # WebSocket 示例
│   │   └── map/            # 高德地图示例
│   ├── routers/             # 路由配置
│   ├── utils/               # 工具函数
│   ├── index.tsx            # 应用入口
│   └── index.less           # 全局样式
├── config.ts                # 项目配置
├── index.html               # HTML 模板
├── package.json             # 项目依赖
├── tsconfig.json            # TypeScript 配置
├── vite.config.ts           # Vite 配置
├── MAINTAIN.md              # 维护文档
└── README.md                # 本文档
```

## 🔧 配置说明

### 后端地址配置

修改 [config.ts](config.ts) 中的后端地址：

```typescript
const IP = {
  development: 'http://localhost:9000/',  // 开发环境
  production: 'https://api.example.com/', // 生产环境
};
```

### 高德地图 Key

修改 [src/pages/map/index.tsx](src/pages/map/index.tsx) 中的 Key：

```typescript
AMapLoader.load({
  key: 'your-amap-key',  // 替换为你的高德地图 Key
  // ...
});
```

## 📖 文档

完整的项目文档请查看 [docs/MAINTAIN.md](./docs/MAINTAIN.md)，包含：

- 项目概况
- 技术栈详解
- 项目结构说明
- 关键文件速查
- 核心功能说明
- 运行 & 配置
- 开发规范
- 常见问题

## 🛠️ 开发命令

```bash
# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# CI/CD 部署
pnpm ci:deploy

# 代码检查
pnpm lint

# 代码格式化
pnpm format
```

## 📝 开发规范

### 代码风格

- 使用 ESLint + Prettier 进行代码格式化
- 提交前自动运行 `lint-staged` 检查代码质量
- 遵循 TypeScript 严格模式

### Git 提交

- 使用 Husky 进行 Git 钩子管理
- Pre-commit: 自动运行 lint-staged
- Pre-push: 自动运行 CI 部署

### 命名规范

- **文件命名**: kebab-case（如 `user-list.tsx`）
- **组件命名**: PascalCase（如 `UserList`）
- **函数/变量**: camelCase（如 `getUserInfo`）
- **常量**: UPPER_CASE（如 `API_BASE_URL`）

## 🤝 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目为私有项目，未经授权不得使用。

---

**版本**: 0.4.4  
**最后更新**: 2026-03-08  
**维护者**: Development Team
