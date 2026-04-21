import { Controller, Get, Req } from '@nestjs/common';
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
}
