# 代码规范文档

本文档详细说明了项目的代码规范要求，所有开发人员必须遵守这些规范以确保代码质量和一致性。

## 目录

- [导入顺序规范](#导入顺序规范)
- [代码风格规范](#代码风格规范)
- [TypeScript 规范](#typescript-规范)
- [React 规范](#react-规范)
- [代码质量规范](#代码质量规范)
- [工具使用](#工具使用)

---

## 导入顺序规范

### 规则说明

所有导入语句必须按照以下顺序排列，每组之间必须有空行分隔：

1. **Node.js 内置模块**（如 `path`, `fs`, `http` 等）
2. **外部依赖**（第三方库，如 `react`, `antd`, `axios` 等）
3. **内部模块**（使用 `@/` 别名的项目内部模块）
4. **父级目录模块**（使用 `../` 的相对路径）
5. **同级目录模块**（使用 `./` 的相对路径）
6. **索引文件**（如 `./index`）

### 特殊规则

- **React 必须放在外部依赖的第一位**
- 每组内的导入按字母顺序排列（不区分大小写）
- 同一来源的多个导入应该合并
- 类型导入使用 `import type` 语法

### 示例

```typescript
// 1. Node.js 内置模块
import path from 'path';
import fs from 'fs';

// 2. 外部依赖（React 排在第一位）
import React, { useState, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import axios from 'axios';
import classNames from 'classnames';

// 3. 内部模块（使用 @/ 别名）
import { request } from '@/utils/request';
import { formatTime } from '@/utils/time';
import { getUserInfo } from '@/services/user.service';

// 4. 父级目录模块
import { BaseLayout } from '../layouts/BaseLayout';

// 5. 同级目录模块
import { HeaderMenu } from './HeaderMenu';
import { FooterMenu } from './FooterMenu';
import styles from './styles.module.less';

// 6. 索引文件
import { config } from './index';
```

### 类型导入示例

```typescript
// 类型导入应该放在对应组的最后
import React from 'react';
import { Button } from 'antd';
import type { ButtonProps } from 'antd';
import { request } from '@/utils/request';
import type { UserInfo } from '@/types/user';
```

---

## 代码风格规范

### 基本规则

- 使用 **2 空格缩进**，不使用 Tab
- 使用 **单引号**（`'`）而非双引号
- 每行最大长度 **80 字符**
- 语句末尾必须使用 **分号**（`;`）
- 对象和数组的最后一项后添加 **逗号**
- 使用 **const** 和 **let**，禁止使用 **var**

### 示例

```typescript
// ✅ 正确
const user = {
  name: '张三',
  age: 25,
  hobbies: ['reading', 'coding'],
};

// ❌ 错误
var user = {name: "张三", age: 25};
```

### 命名规范

| 类型 | 命名规则 | 示例 |
|------|---------|------|
| 变量/函数 | 小驼峰（camelCase） | `userName`, `getUserInfo` |
| 常量 | 大写下划线（UPPER_SNAKE_CASE） | `API_BASE_URL`, `MAX_RETRY_COUNT` |
| 类/接口/类型 | 大驼峰（PascalCase） | `UserService`, `UserInfo` |
| 私有成员 | 下划线前缀（_camelCase） | `_privateMethod`, `_internalState` |

### 示例

```typescript
// 变量和函数
const userName = '张三';
const getUserInfo = () => {};

// 常量
const API_BASE_URL = 'https://api.example.com';
const MAX_RETRY_COUNT = 3;

// 类、接口、类型
class UserService {}
interface UserInfo {}
type UserStatus = 'active' | 'inactive';

// 私有成员
class Component {
  private _state: any;
  private _updateState() {}
}
```

---

## TypeScript 规范

### 类型定义

- 优先使用 **interface** 定义对象类型
- 使用 **type** 定义联合类型、交叉类型等复杂类型
- 避免使用 **any**，使用 **unknown** 或具体类型替代
- 函数参数尽量明确类型，避免依赖类型推断

### 示例

```typescript
// ✅ 正确：使用 interface
interface UserInfo {
  id: number;
  name: string;
  email: string;
}

// ✅ 正确：使用 type 定义联合类型
type UserStatus = 'active' | 'inactive' | 'pending';

// ✅ 正确：明确函数参数和返回值类型
function getUserById(id: number): Promise<UserInfo> {
  return request.get(`/users/${id}`);
}

// ❌ 错误：使用 any
function processData(data: any) {
  return data.value;
}

// ✅ 正确：使用 unknown 或具体类型
function processData(data: unknown) {
  if (typeof data === 'object' && data !== null && 'value' in data) {
    return (data as { value: string }).value;
  }
}
```

### 未使用变量

- 未使用的变量会报错
- 如果变量必须存在但不使用，使用下划线前缀 `_`

### 示例

```typescript
// ❌ 错误：未使用的变量
const unused = 'value';

// ✅ 正确：使用下划线前缀
const _unused = 'value';

// ✅ 正确：解构时忽略某些字段
const { id, name, ...rest } = userInfo;
```

---

## React 规范

### 组件定义

- 使用 **函数组件**，不使用类组件
- 组件名称使用 **大驼峰**（PascalCase）
- 使用 **React Hooks** 管理状态和副作用

### 示例

```typescript
// ✅ 正确：函数组件
interface UserCardProps {
  user: UserInfo;
  onUpdate?: (user: UserInfo) => void;
}

export function UserCard({ user, onUpdate }: UserCardProps) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 副作用逻辑
  }, []);

  return <div>{user.name}</div>;
}

// ❌ 错误：类组件
export class UserCard extends React.Component {
  render() {
    return <div>...</div>;
  }
}
```

### Hooks 使用规范

- 只在 **函数组件** 或 **自定义 Hook** 中使用 Hooks
- 只在 **顶层** 调用 Hooks，不要在循环、条件或嵌套函数中调用
- 自定义 Hook 名称必须以 **use** 开头

### 示例

```typescript
// ✅ 正确：在顶层调用
export function UserList() {
  const [users, setUsers] = useState<UserInfo[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  return <div>...</div>;
}

// ❌ 错误：在条件中调用
export function UserList() {
  const [users, setUsers] = useState<UserInfo[]>([]);

  if (loading) {
    const [data, setData] = useState(null); // 错误！
  }

  return <div>...</div>;
}

// ✅ 正确：自定义 Hook
function useUserInfo(userId: number) {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 逻辑
  }, [userId]);

  return { user, loading };
}
```

### 性能优化

- **不要滥用** `useCallback` 和 `useMemo`
- 只在以下情况使用：
  - 作为其他 Hook 的依赖
  - 传递给经过优化的子组件（如 `React.memo`）
  - 计算开销明显较大

### 示例

```typescript
// ✅ 正确：简单逻辑不需要优化
export function UserList({ users }: { users: UserInfo[] }) {
  const handleClick = (userId: number) => {
    console.log(userId);
  };

  return (
    <div>
      {users.map(user => (
        <div key={user.id} onClick={() => handleClick(user.id)}>
          {user.name}
        </div>
      ))}
    </div>
  );
}

// ✅ 正确：需要优化时使用
export function UserList({ users }: { users: UserInfo[] }) {
  const handleClick = useCallback((userId: number) => {
    console.log(userId);
  }, []);

  const sortedUsers = useMemo(
    () => [...users].sort((a, b) => a.name.localeCompare(b.name)),
    [users]
  );

  return (
    <div>
      {sortedUsers.map(user => (
        <MemoizedUserItem key={user.id} user={user} onClick={handleClick} />
      ))}
    </div>
  );
}
```

---

## 代码质量规范

### 禁止使用的代码

- **禁止使用 debugger**：调试代码不应该提交到仓库
- **禁止使用 alert**：使用 Ant Design 的 `message` 或 `modal` 替代
- **限制 console 使用**：只允许使用 `console.warn` 和 `console.error`

### 示例

```typescript
// ❌ 错误：使用 debugger
function processData(data: any) {
  debugger; // 禁止！
  return data;
}

// ❌ 错误：使用 alert
function showError() {
  alert('操作失败'); // 禁止！
}

// ✅ 正确：使用 Ant Design message
import { message } from 'antd';

function showError() {
  message.error('操作失败');
}

// ✅ 正确：使用 console.warn 或 console.error
function logWarning() {
  console.warn('这是一个警告');
}

function logError() {
  console.error('这是一个错误');
}
```

### 代码重复

- **禁止重复导入**：同一模块只能导入一次
- **禁止循环依赖**：模块之间不应该形成循环引用

### 示例

```typescript
// ❌ 错误：重复导入
import { Button } from 'antd';
import { Input } from 'antd';
import { Button } from 'antd'; // 重复！

// ✅ 正确：合并导入
import { Button, Input } from 'antd';
```

### 未使用的模块

- **禁止导入未使用的模块**：导入但未使用的模块会触发警告

### 示例

```typescript
// ❌ 错误：导入未使用的模块
import { Button } from 'antd';
import { Input } from 'antd'; // 未使用

export function MyComponent() {
  return <Button>点击</Button>;
}

// ✅ 正确：删除未使用的导入
import { Button } from 'antd';

export function MyComponent() {
  return <Button>点击</Button>;
}
```

---

## 工具使用

### ESLint

ESLint 用于检查代码质量和风格一致性。

#### 运行检查

```bash
# 检查所有代码
npm run lint

# 自动修复可修复的问题
npm run lint:fix
```

#### 配置文件

ESLint 配置位于项目根目录的 [`.eslintrc.cjs`](file:///Users/hengxinsky/Downloads/openSpace/mbs-project/mbs/.eslintrc.cjs) 文件中。

### Prettier

Prettier 用于格式化代码，确保代码风格一致。

#### 配置

Prettier 配置位于项目根目录的 [`.prettierrc.json`](file:///Users/hengxinsky/Downloads/openSpace/mbs-project/mbs/.prettierrc.json) 文件中。

当前配置：
- `printWidth`: 80（每行最大字符数）
- `singleQuote`: true（使用单引号）
- `trailingComma`: "all"（在可能的情况下添加尾随逗号）

### Git 钩子

项目使用 **husky** 和 **lint-staged** 在提交代码时自动执行检查和修复。

#### 工作流程

1. 开发者执行 `git add` 添加文件到暂存区
2. 执行 `git commit` 提交代码
3. husky 触发 pre-commit 钩子
4. lint-staged 对暂存的文件执行：
   - `prettier --write`（格式化代码）
   - `eslint --fix`（检查并修复代码问题）
   - `git add`（将修复后的文件重新添加到暂存区）
5. 如果所有检查通过，提交成功；否则提交失败

#### 配置

lint-staged 配置在 [`package.json`](file:///Users/hengxinsky/Downloads/openSpace/mbs-project/mbs/package.json) 中：

```json
"lint-staged": {
  "**/*.{ts,tsx,json}": [
    "prettier --write",
    "eslint --fix",
    "git add"
  ]
}
```

### 构建流程

构建命令会自动执行 lint 检查：

```bash
npm run build
```

构建流程：
1. `npm run lint`（检查代码规范）
2. `tsc`（TypeScript 类型检查）
3. `vite build`（打包构建）

如果 lint 检查失败，构建会终止。

---

## 边缘案例和测试建议

### 导入顺序边缘案例

1. **混合类型导入**
   ```typescript
   // ✅ 正确：类型导入放在最后
   import React from 'react';
   import { Button } from 'antd';
   import type { ButtonProps } from 'antd';
   ```

2. **动态导入**
   ```typescript
   // 动态导入不受顺序规则限制
   const loadModule = async () => {
     const module = await import('./heavyModule');
   };
   ```

3. **副作用导入**
   ```typescript
   // 副作用导入（仅执行模块代码，不导入任何内容）
   import './styles.css';
   import './polyfills';
   ```

### TypeScript 类型边缘案例

1. **泛型类型**
   ```typescript
   // ✅ 正确：明确泛型参数
   function identity<T>(value: T): T {
     return value;
   }
   ```

2. **可选链和空值合并**
   ```typescript
   // ✅ 正确：使用可选链
   const userName = user?.profile?.name;

   // ✅ 正确：使用空值合并
   const displayName = userName ?? '匿名用户';
   ```

3. **类型断言**
   ```typescript
   // ❌ 错误：过度使用类型断言
   const user = data as UserInfo;

   // ✅ 正确：使用类型守卫
   if (isUserInfo(data)) {
     const user = data;
   }
   ```

### React Hooks 边缘案例

1. **自定义 Hook 依赖**
   ```typescript
   // ✅ 正确：所有依赖都在依赖数组中
   useEffect(() => {
     fetchData(userId);
   }, [userId]);
   ```

2. **条件渲染**
   ```typescript
   // ✅ 正确：使用条件渲染而非条件 Hook
   function Component({ showFeature }) {
     const [data, setData] = useState(null);

     if (!showFeature) {
       return <div>功能未启用</div>;
     }

     return <Feature data={data} />;
   }
   ```

### 建议的测试用例

1. **导入顺序测试**
   - 测试不同类型的导入是否按正确顺序排列
   - 测试同一组内是否按字母顺序排列
   - 测试组之间是否有空行分隔

2. **代码风格测试**
   - 测试缩进、引号、分号等格式规则
   - 测试命名规范是否正确
   - 测试常量命名是否使用大写下划线

3. **TypeScript 类型测试**
   - 测试类型定义是否完整
   - 测试函数参数和返回值类型是否明确
   - 测试是否正确使用 interface 和 type

4. **React 组件测试**
   - 测试组件是否使用函数组件
   - 测试 Hooks 是否在顶层调用
   - 测试性能优化是否合理使用

5. **代码质量测试**
   - 测试是否包含禁止使用的代码（debugger、alert）
   - 测试是否有未使用的变量和导入
   - 测试是否有重复代码

---

## 总结

遵守代码规范可以：

✅ 提高代码可读性和可维护性  
✅ 减少代码错误和 bug  
✅ 提高团队协作效率  
✅ 确保代码质量一致性  

所有开发人员都应该：

1. 在编写代码时遵守规范
2. 在提交代码前运行 `npm run lint` 检查
3. 使用 `npm run lint:fix` 自动修复可修复的问题
4. 遇到规范问题时及时与团队沟通

如有疑问或建议，请联系项目负责人。
