import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// 异常处理拦截器：拦截所有异常并进行统一处理
@Injectable()
export class ExceptionInterceptor implements NestInterceptor {
  // 使用 NestJS 内置日志记录器
  private readonly logger = new Logger(ExceptionInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // 使用 catchError 操作符捕获异常
    return next.handle().pipe(
      catchError((exception: unknown) => {
        // 获取请求信息
        const request = context.switchToHttp().getRequest();
        const method = request.method;
        const url = request.originalUrl;
        const timestamp = new Date().toISOString();

        // 统一处理异常
        const errorResponse = this.handleException(
          exception,
          method,
          url,
          timestamp,
        );

        // 记录错误日志
        this.logger.error(
          `${method} ${url} ${errorResponse.statusCode} - ${JSON.stringify(errorResponse.message)}`,
          exception instanceof Error ? exception.stack : '',
        );

        // 返回处理后的错误响应
        return throwError(() => errorResponse);
      }),
    );
  }

  /**
   * 统一处理异常，返回标准化的错误响应格式
   */
  private handleException(
    exception: unknown,
    method: string,
    url: string,
    timestamp: string,
  ): {
    statusCode: number;
    timestamp: string;
    path: string;
    method: string;
    message: string | string[];
    error: string;
  } {
    // 默认错误响应
    const defaultResponse = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      timestamp,
      path: url,
      method,
      message: '服务器内部错误',
      error: 'Internal Server Error',
    };

    // 如果是 HttpException（NestJS 标准异常）
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      // 处理字符串类型的响应
      if (typeof exceptionResponse === 'string') {
        return {
          ...defaultResponse,
          statusCode: status,
          message: exceptionResponse,
          error: exception.name,
        };
      }

      // 处理对象类型的响应
      if (typeof exceptionResponse === 'object') {
        const responseObj = exceptionResponse as Record<string, any>;
        return {
          ...defaultResponse,
          statusCode: status,
          message: responseObj.message || exception.message,
          error: responseObj.error || exception.name,
        };
      }
    }

    // 如果是普通 Error 对象
    if (exception instanceof Error) {
      return {
        ...defaultResponse,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: exception.message || '未知错误',
        error: exception.name,
      };
    }

    // 其他未知异常
    return {
      ...defaultResponse,
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: String(exception) || '发生了未知错误',
    };
  }
}
