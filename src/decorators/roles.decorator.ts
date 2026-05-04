import { SetMetadata } from '@nestjs/common';

// 角色装饰器：用于设置路由所需的角色权限
// 使用方式：@Roles('admin', 'user') 或 @Roles(['admin', 'user'])
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
