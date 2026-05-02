import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

// 用户服务：处理用户相关的业务逻辑
@Injectable()
export class UserService {
  // 模拟用户数据存储（实际项目中应该使用数据库）
  private users: User[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      age: 25,
      createdAt: new Date(),
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      age: 30,
      createdAt: new Date(),
    },
  ];

  // 获取所有用户
  findAll(): User[] {
    return this.users;
  }

  // 根据 ID 查找单个用户
  findOne(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  // 创建新用户
  create(userData: Omit<User, 'id' | 'createdAt'>): User {
    // 生成新用户 ID
    const newUser: User = {
      id: this.users.length + 1,
      ...userData,
      createdAt: new Date(),
    };
    // 添加到用户列表
    this.users.push(newUser);
    return newUser;
  }

  // 更新用户信息
  update(id: number, userData: Partial<Omit<User, 'id' | 'createdAt'>>): User | undefined {
    // 查找用户索引
    const userIndex = this.users.findIndex((user) => user.id === id);
    // 如果用户不存在，返回 undefined
    if (userIndex === -1) {
      return undefined;
    }
    // 更新用户信息（保留原有的 id 和 createdAt）
    this.users[userIndex] = {
      ...this.users[userIndex],
      ...userData,
    };
    return this.users[userIndex];
  }

  // 删除用户
  remove(id: number): boolean {
    // 查找用户索引
    const userIndex = this.users.findIndex((user) => user.id === id);
    // 如果用户不存在，返回 false
    if (userIndex === -1) {
      return false;
    }
    // 从数组中删除用户
    this.users.splice(userIndex, 1);
    return true;
  }
}
