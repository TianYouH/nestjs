// 用户实体：定义用户的数据结构
export class User {
  // 用户唯一标识
  id: number | undefined;
  // 用户姓名
  name: string | undefined;
  // 用户邮箱
  email: string | undefined;
  // 用户年龄
  age: number | undefined;
  // 用户创建时间
  createdAt: Date | undefined;
}
