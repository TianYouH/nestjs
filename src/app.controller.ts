import { Controller, Get, Post, Put, Delete, Req } from '@nestjs/common';
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
  putTest(): string {
    return 'This is a PUT request';
  }

  @Delete('test/:id')
  deleteTest(): string {
    return 'This is a DELETE request';
  }
}
