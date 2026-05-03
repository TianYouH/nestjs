import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

// 全局日志中间件：记录所有接口的调用信息
@Injectable()
export class GlobalLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // 记录请求开始时间
    const startTime = Date.now();

    // 获取请求信息
    const method = req.method;
    const url = req.url;
    const timestamp = new Date().toISOString();

    // 打印请求信息
    console.log(`\n🚀 [${timestamp}] ${method} ${url} - 接口被调用`);

    // 监听响应发送完成事件
    res.on('finish', () => {
      // 计算响应时间
      const responseTime = Date.now() - startTime;

      // 获取响应状态码
      const statusCode = res.statusCode;

      // 打印响应信息
      console.log(
        `✅ [${timestamp}] ${method} ${url} - 状态码: ${statusCode} - 耗时: ${responseTime}ms\n`,
      );
    });

    // 继续处理请求
    next();
  }
}
