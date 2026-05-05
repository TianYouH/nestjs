# NestJS 学习项目

一个用于学习 NestJS 框架的学习项目，包含控制器、服务、模块、中间件、守卫、拦截器、异常过滤器等核心概念。

## 项目结构

```
src/
├── config/                 # 配置模块
│   ├── cors.config.ts     # CORS 配置
│   └── index.ts           # 配置导出
├── controller/            # 控制器
│   └── app.controller.ts  # 主控制器
├── decorators/            # 自定义装饰器
│   ├── index.ts
│   └── roles.decorator.ts # 角色装饰器 @Roles()
├── dto/                   # 数据传输对象（已废弃，请使用 user/dto）
├── filters/               # 异常过滤器
│   ├── index.ts
│   ├── http-exception.filter.ts  # 全局异常过滤器
│   └── http.exceptions.ts       # 自定义异常类
├── guards/                # 守卫
│   ├── index.ts
│   ├── auth.guard.ts      # 鉴权守卫
│   └── roles.guard.ts     # 角色守卫
├── interceptors/          # 拦截器
│   ├── index.ts
│   ├── exception.interceptor.ts # 异常处理拦截器
│   ├── logging.interceptor.ts   # 日志计时拦截器
│   └── transform.interceptor.ts # null/undefined 转空字符串拦截器
├── middleware/             # 中间件
│   ├── index.ts
│   └── global-logger.middleware.ts # 全局日志中间件
├── service/               # 服务
│   └── app.service.ts     # 主服务
├── types/                 # 类型定义
│   └── auth-user.type.ts  # 认证用户类型扩展
├── user/                  # 用户模块（学习示例）
│   ├── dto/               # 用户 DTO
│   ├── entities/          # 实体
│   ├── middleware/        # 用户模块中间件
│   ├── user.controller.ts # 用户控制器
│   ├── user.module.ts     # 用户模块
│   └── user.service.ts    # 用户服务
├── app.module.ts          # 根模块
└── main.ts                # 应用入口
```

## 核心概念

### 1. 控制器 (Controller)
- 处理 HTTP 请求和响应
- 使用装饰器：`@Controller()`, `@Get()`, `@Post()`, `@Put()`, `@Delete()` 等
- 文件：[app.controller.ts](src/controller/app.controller.ts)

### 2. 服务 (Service)
- 业务逻辑处理
- 使用 `@Injectable()` 装饰器标记为可注入
- 文件：[app.service.ts](src/service/app.service.ts)

### 3. 模块 (Module)
- 组织和管理相关功能
- 使用 `@Module()` 装饰器
- 文件：[app.module.ts](src/app.module.ts), [user.module.ts](src/user/user.module.ts)

### 4. 中间件 (Middleware)
- 请求/响应处理链中的中间层
- 文件：
  - [global-logger.middleware.ts](src/middleware/global-logger.middleware.ts) - 全局日志中间件
  - [logger.middleware.ts](src/user/middleware/logger.middleware.ts) - 用户模块中间件

### 5. 守卫 (Guard)
- 权限控制、身份验证
- 实现 `CanActivate` 接口
- 文件：
  - [auth.guard.ts](src/guards/auth.guard.ts) - 鉴权守卫
  - [roles.guard.ts](src/guards/roles.guard.ts) - 角色守卫

### 6. 拦截器 (Interceptor)
- 请求/响应转换、日志记录、异常处理
- 实现 `NestInterceptor` 接口
- 文件：
  - [logging.interceptor.ts](src/interceptors/logging.interceptor.ts) - 日志计时
  - [transform.interceptor.ts](src/interceptors/transform.interceptor.ts) - 数据转换
  - [exception.interceptor.ts](src/interceptors/exception.interceptor.ts) - 异常处理

### 7. 异常过滤器 (Exception Filter)
- 统一处理异常
- 实现 `ExceptionFilter` 接口
- 文件：[http-exception.filter.ts](src/filters/http-exception.filter.ts)

### 8. DTO 与数据验证
- 使用 `class-validator` 进行数据验证
- 文件：
  - [create-user.dto.ts](src/user/dto/create-user.dto.ts)
  - [update-user.dto.ts](src/user/dto/update-user.dto.ts)

### 9. 自定义装饰器
- 使用 `SetMetadata` 创建自定义装饰器
- 文件：[roles.decorator.ts](src/decorators/roles.decorator.ts)

## API 路由

### 主控制器 (`/app`)

| 方法 | 路由 | 说明 |
|------|------|------|
| GET | `/app/hello` | 返回 Hello World |
| GET | `/app/hello2` | 返回 user-agent |
| POST | `/app/test` | POST 请求测试 |
| PUT | `/app/test/:id` | PUT 请求测试 |
| DELETE | `/app/test/:aaa/:id` | DELETE 请求测试 |
| GET | `/app/wildcard/*path` | 路由通配符测试 |
| GET | `/app/status` | HTTP 状态码测试 |
| GET | `/app/redirect` | 重定向测试 |
| GET | `/app/async` | 异步请求测试 |
| GET | `/app/query` | @Query 参数测试 |
| POST | `/app/body` | @Body 参数测试 |
| GET | `/app/users` | 获取所有用户 |
| GET | `/app/users/:id` | 获取单个用户 |
| GET | `/app/protected` | 鉴权守卫测试（需 Bearer token） |
| GET | `/app/admin` | 角色守卫测试（需 admin 角色） |
| GET | `/app/user` | 角色守卫测试（需 user 或 admin 角色） |

### 用户控制器 (`/users`)

| 方法 | 路由 | 说明 |
|------|------|------|
| GET | `/users` | 获取所有用户 |
| GET | `/users/:id` | 获取单个用户 |
| POST | `/users` | 创建用户 |
| PUT | `/users/:id` | 更新用户 |
| DELETE | `/users/:id` | 删除用户 |

## 守卫与角色测试

### 鉴权守卫 (AuthGuard)
验证请求头中的 `Authorization: Bearer <token>`

```bash
# 无 token - 返回 401
curl http://localhost:3000/app/protected

# 有 token - 返回用户信息
curl -H "Authorization: Bearer my-secret-token" http://localhost:3000/app/protected
```

### 角色守卫 (RolesGuard)
配合 `@Roles()` 装饰器使用

```bash
# 普通用户 token（以 admin 结尾的 token 有 admin 角色）
curl -H "Authorization: Bearer my-token-admin" http://localhost:3000/app/admin

# 普通用户 token
curl -H "Authorization: Bearer my-token" http://localhost:3000/app/user
```

## 拦截器

### 日志计时拦截器
记录每个请求的开始时间和处理耗时

### 数据转换拦截器
将响应中的 `null` 和 `undefined` 转换为空字符串

### 异常处理拦截器
统一处理所有异常，返回标准化错误响应

## 全局配置 (main.ts)

```typescript
// 全局验证管道
app.useGlobalPipes(new ValidationPipe());

// 全局异常过滤器
app.useGlobalFilters(new GlobalExceptionFilter());

// 全局拦截器
app.useGlobalInterceptors(
  new LoggingInterceptor(),
  new TransformInterceptor(),
);

// CORS 配置
app.enableCors({
  origin: true,
  credentials: true,
  exposedHeaders: ['X-Total-Count'],
});
```

## 安装与运行

```bash
# 安装依赖
pnpm install

# 开发模式运行
pnpm run start:dev

# 生产模式运行
pnpm run start:prod

# 运行测试
pnpm run test

# E2E 测试
pnpm run test:e2e
```

## 技术栈

- NestJS - 核心框架
- TypeScript - 类型安全
- class-validator - 数据验证
- pnpm - 包管理器
