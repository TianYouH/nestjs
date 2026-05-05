import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

// 日志计时拦截器：记录请求处理耗时
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // 1. 获取请求信息
    const request: Request = context.switchToHttp().getRequest<Request>();
    const method = request.method;
    const url = request.url;
    const startTime = Date.now();

    // 2. 记录接口开始处理的日志
    console.log(`🚀 [${method}] ${url} - 接口开始处理`);

    // 3. 使用 tap 操作符在响应返回后执行日志记录
    return next.handle().pipe(
      tap({
        // 响应成功时的处理
        next: () => {
          const responseTime = Date.now() - startTime;
          console.log(
            `✅ [${method}] ${url} - 处理完成，耗时: ${responseTime}ms`,
          );
        },
        // 响应出错时的处理
        error: (error) => {
          const responseTime = Date.now() - startTime;
          console.log(
            `❌ [${method}] ${url} - 处理失败，耗时: ${responseTime}ms，错误: ${(error as Error).message}`,
          );
        },
      }),
    );
  }
}
