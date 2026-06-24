# 架构计划

## 关联规范
- [01-specify.md](./01-specify.md)

## 技术方案
1. **路由层**: 新增 `POST /api/v1/auth/register` 和 `POST /api/v1/auth/login`。
2. **中间件**: 新增 `rateLimiter` 中间件处理登录限流。
3. **服务层**: 扩展 `UserService`，增加 `createUser` 和 `verifyPassword` 方法。

## 废弃机制 (Legacy Only)
- 旧的 `/login` 接口将被标记为 `@deprecated`，保留 30 天过渡期。