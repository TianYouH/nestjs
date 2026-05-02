import { IsString, IsEmail, IsNumber, Min, IsOptional } from 'class-validator';

// 更新用户 DTO：定义更新用户时需要的字段和验证规则（所有字段都是可选的）
export class UpdateUserDto {
  // 姓名：可选，如果提供则必须是字符串
  @IsOptional()
  @IsString()
  name?: string;

  // 邮箱：可选，如果提供则必须是有效的邮箱格式
  @IsOptional()
  @IsEmail()
  email?: string;

  // 年龄：可选，如果提供则必须是数字且大于等于 0
  @IsOptional()
  @IsNumber()
  @Min(0)
  age?: number;
}
