import {
  IsString,
  IsEmail,
  IsNumber,
  Min,
  IsOptional,
  IsMobilePhone,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: '姓名必须是字符串' })
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: '邮箱格式错误' })
  email?: string;

  @IsOptional()
  @IsNumber({}, { message: '年龄必须是数字' })
  @Min(0, { message: '年龄必须大于等于0' })
  age?: number;

  @IsOptional()
  @IsMobilePhone('zh-CN', {}, { message: '手机号格式错误' })
  mobile?: string;
}
