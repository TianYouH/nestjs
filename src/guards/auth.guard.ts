import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthUser } from '../types/auth-user.type';

// 鉴权守卫：验证用户是否已登录
@Injectable()
export class AuthGuard implements CanActivate {
  // canActivate 方法返回 true 表示允许访问，false 表示拒绝
  canActivate(context: ExecutionContext): boolean {
    // 1. 从执行上下文中获取 HTTP 请求对象
    const request = context.switchToHttp().getRequest<Request>();

    // 2. 验证请求头中的 Authorization token
    const authHeader = request.headers.authorization;

    // 如果没有 Authorization 头，抛出未授权异常
    if (!authHeader) {
      throw new UnauthorizedException('未找到 Authorization 请求头');
    }

    // 3. 验证 token 格式（Bearer token）
    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException(
        '无效的 Authorization 格式，应为 Bearer <token>',
      );
    }

    // 4. 验证 token 有效性（这是演示代码，实际项目中应该使用 JWT 验证）
    // 演示用：根据 token 模拟不同的用户角色
    console.log(`✅ 鉴权成功，token: ${token.substring(0, 10)}...`);

    // 根据 token 后缀判断用户角色（演示用）
    let userRoles: string[];
    if (token.endsWith('admin')) {
      userRoles = ['admin', 'user'];
    } else {
      userRoles = ['user'];
    }

    // 5. 可以将用户信息挂载到 request 上，供后续使用
    const authUser: AuthUser = {
      id: 1,
      name: '演示用户',
      email: 'demo@example.com',
      roles: userRoles,
    };
    request.user = authUser;

    // 6. 返回 true 表示鉴权通过
    return true;
  }
}
