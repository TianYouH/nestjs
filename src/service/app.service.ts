import { Injectable } from '@nestjs/common';
import type { Request } from 'express';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getHello2(req: Request): string | undefined {
    return req.headers['user-agent'];
  }

  getPutTest(id: string): string {
    return `This is a PUT request for id: ${id}`;
  }
}
