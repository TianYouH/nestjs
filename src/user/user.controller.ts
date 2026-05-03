import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// 用户控制器：处理用户相关的 HTTP 请求
@Controller('users')
export class UserController {
  // 通过构造函数注入 UserService
  constructor(private readonly userService: UserService) {}

  // GET /users - 获取所有用户
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  // GET /users/:id - 根据 ID 获取单个用户
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  // POST /users - 创建新用户
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // PUT /users/:id - 更新指定用户
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  // DELETE /users/:id - 删除指定用户
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    this.userService.remove(id);
    return { success: true, message: '用户删除成功' };
  }
}
