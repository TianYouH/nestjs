// 需要安装 class-validator 包: npm install class-validator
import { IsString, IsEmail, IsNumber, Min } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string | undefined;

  @IsEmail()
  email: string | undefined;

  @IsNumber()
  @Min(18)
  age: number | undefined;
}
