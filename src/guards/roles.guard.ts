import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

// 角色守卫：验证用户是否具有访问路由所需的角色权限
@Injectable()
export class RolesGuard implements CanActivate {
  // 注入 Reflector：用于读取装饰器设置的元数据
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1. 从装饰器中读取所需的角色
    // 这里的 'roles' 对应 Roles 装饰器中设置的元数据键名
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(), // 检查方法级别的装饰器
      context.getClass(), // 检查类级别的装饰器
    ]);

    // 2. 如果没有设置角色要求，则直接放行
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    // 3. 获取 HTTP 请求对象
    const request = context.switchToHttp().getRequest<Request>();

    // 4. 从 request 中获取用户信息（通常由 AuthGuard 设置）
    const user = request.user;

    // 5. 如果用户信息不存在，说明用户未登录
    if (!user) {
      throw new UnauthorizedException('用户未登录，请先登录');
    }

    // 6. 检查用户是否具有所需的角色
    const hasRole = requiredRoles.some((role) => user.roles?.includes(role));

    // 7. 如果用户没有所需角色，抛出禁止访问异常
    if (!hasRole) {
      throw new ForbiddenException(
        `用户角色权限不足，需要的角色: ${requiredRoles.join(', ')}`,
      );
    }

    // 8. 权限验证通过
    console.log(
      `✅ 角色权限验证成功，用户角色: ${user.roles?.join(', ')}, 需要角色: ${requiredRoles.join(', ')}`,
    );

    return true;
  }
}
