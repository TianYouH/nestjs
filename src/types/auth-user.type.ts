// 认证用户数据结构
export interface AuthUser {
  id: number;
  name: string;
  email: string;
  roles: string[];
}

// 扩展 Express Request 接口
declare module 'express' {
  interface Request {
    user: AuthUser;
  }
}
