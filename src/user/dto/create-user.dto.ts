import {
  IsString,
  IsEmail,
  IsNumber,
  Min,
  IsMobilePhone,
  IsOptional,
} from 'class-validator';

// 创建用户 DTO：定义创建用户时需要的字段和验证规则
export class CreateUserDto {
  // 姓名：必须是字符串
  @IsString({ message: '姓名必须是字符串' })
  name: string | undefined;

  // 邮箱：必须是有效的邮箱格式
  @IsEmail({}, { message: '邮箱格式错误' })
  email: string | undefined;

  // 年龄：必须是数字且大于等于 0
  @IsNumber({}, { message: '年龄必须是数字' })
  @Min(0, { message: '年龄必须大于等于0' })
  age: number | undefined;

  // 手机号：必须是有效的中国手机号格式
  @IsOptional()
  @IsMobilePhone('zh-CN', {}, { message: '手机号格式错误' })
  mobile: string | undefined;
}
