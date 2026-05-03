import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

// 日志中间件：记录每个 HTTP 请求的信息
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // 记录请求时间
    const timestamp = new Date().toISOString();

    // 获取请求方法
    const method = req.method;

    // 获取请求 URL
    const url = req.url;

    // 获取请求体（如果有的话）
    const body = (req.body as Record<string, unknown>) || {};

    // 获取查询参数（如果有的话）
    const query = req.query || {};

    // 获取请求头中的 user-agent
    const userAgent = req.headers['user-agent'];

    // 获取客户端 IP
    const ip = req.ip || req.connection.remoteAddress;

    // 打印日志
    console.log('==========================================');
    console.log(`[${timestamp}] ${method} ${url}`);
    console.log(`User-Agent: ${userAgent}`);
    console.log(`Client IP: ${ip}`);
    console.log(`Query Parameters: ${JSON.stringify(query)}`);
    if (body && Object.keys(body).length > 0) {
      console.log(`Request Body: ${JSON.stringify(body)}`);
    }
    console.log('==========================================');

    // 调用下一个中间件或路由处理程序
    next();
  }
}
