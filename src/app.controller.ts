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
} from '@nestjs/common';
import { AppService } from './app.service';
import type { Request } from 'express';

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
}
