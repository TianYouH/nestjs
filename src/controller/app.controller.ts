import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Req,
  Param,
  HttpCode,
  Redirect,
  Query,
  Body,
} from '@nestjs/common';
import { AppService } from '../app.service';
import type { Request } from 'express';
import { CreateUserDto } from '../dto/create-user.dto';

// @Controller({ path: 'app', host: ':name.example.com' }) 子路由设定
// @Controller({ path: 'app', host: 'localhost' })
@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(): any {
    return this.appService.getHello();
  }

  @Get('hello2')
  getHello2(@Req() req: Request): string | undefined {
    return req.headers['user-agent'];
  }

  @Post('test')
  postTest(): string {
    return 'This is a POST request';
  }

  @Put('test/:id')
  putTest(@Param('id') id: string): string {
    return `This is a PUT request for id: ${id}`;
  }

  @Delete('test/:aaa/:id')
  deleteTest(@Param('aaa') aa: string, @Param('id') id: string): string {
    return `This is a DELETE request for aaa: ${aa}, id: ${id}`;
  }

  // 测试路由通配符
  @Get('wildcard/*path')
  wildcardTest(@Param('path') wildcard: string): string {
    return `Wildcard route matched: ${wildcard}`;
  }

  // 测试 HTTP 状态码
  @Get('status')
  @HttpCode(201)
  statusTest(): string {
    return 'This response has status code 201';
  }

  // 测试重定向
  @Get('redirect')
  @Redirect('https://www.example.com', 302)
  redirectTest(): void {
    // 重定向装饰器会自动处理重定向，不需要返回值
    // return 'Redirecting to https://www.example.com';
  }

  // 测试异步请求
  @Get('async')
  async asyncTest(): Promise<string> {
    // 模拟异步操作，比如数据库查询或API调用
    await new Promise((resolve) => setTimeout(resolve, 5000));
    return 'This is an async response after 5 second delay';
  }

  // 测试 @Query 装饰器
  @Get('query')
  queryTest(@Query('name') name: string, @Query('age') age: number): string {
    return `Hello ${name}, you are ${age} years old`;
  }

  // 测试 @Body 装饰器
  @Post('body')
  bodyTest(@Body() body: CreateUserDto): string {
    return `Received user: ${body.name}, ${body.email}, ${body.age}`;
  }
}
