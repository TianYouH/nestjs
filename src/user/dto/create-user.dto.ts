import { IsString, IsEmail, IsNumber, Min } from 'class-validator';

// 创建用户 DTO：定义创建用户时需要的字段和验证规则
export class CreateUserDto {
  // 姓名：必须是字符串
  @IsString()
  name: string;

  // 邮箱：必须是有效的邮箱格式
  @IsEmail()
  email: string;

  // 年龄：必须是数字且大于等于 0
  @IsNumber()
  @Min(0)
  age: number;
}
