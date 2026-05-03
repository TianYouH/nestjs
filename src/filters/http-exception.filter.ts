import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

// 异常过滤器的响应格式
export class HttpExceptionFilterResponse {
  // 状态码
  statusCode: number | undefined;
  // 时间戳
  timestamp: string | undefined;
  // 请求路径
  path: string | undefined;
  // 请求方法
  method: string | undefined;
  // 错误消息
  message: string | string[] | undefined;
  // 错误详情（开发环境）
  stack?: any;
}

// 全局异常过滤器：统一处理所有异常
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  // NestJS 内置的日志记录器
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    // 获取 HTTP 上下文
    const ctx = host.switchToHttp();

    // 获取请求和响应对象
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // 确定状态码和错误消息
    let status: number;
    let message: string | string[];

    if (exception instanceof HttpException) {
      // 如果是 HttpException，使用其状态码和消息
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      message =
        typeof exceptionResponse === 'string'
          ? exceptionResponse
          : (exceptionResponse as { message?: string | string[] }).message ||
            exception.message;
    } else if (exception instanceof Error) {
      // 如果是普通 Error
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = exception.message || 'Internal server error';
    } else {
      // 其他未知异常
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal server error';
    }

    // 构建错误响应体
    const errorResponse: HttpExceptionFilterResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message,
    };

    // 在开发环境下添加堆栈信息
    if (process.env.NODE_ENV === 'development') {
      errorResponse.stack = (exception as Error).stack;
    }

    // 记录错误日志
    this.logger.error(
      `${request.method} ${request.url} ${status} - ${JSON.stringify(message)}`,
      exception instanceof Error ? exception.stack : '',
    );

    // 设置响应状态码和发送错误响应
    response.status(status).json(errorResponse);
  }
}
