import { HttpException, HttpStatus } from '@nestjs/common';

// 404 Not Found 异常
export class NotFoundException extends HttpException {
  constructor(message: string = '资源未找到') {
    super(
      {
        message,
        error: 'Not Found',
      },
      HttpStatus.NOT_FOUND,
    );
  }
}

// 400 Bad Request 异常
export class BadRequestException extends HttpException {
  constructor(message: string | string[] = '请求参数错误') {
    super(
      {
        message,
        error: 'Bad Request',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}

// 401 Unauthorized 异常
export class UnauthorizedException extends HttpException {
  constructor(message: string = '未授权访问') {
    super(
      {
        message,
        error: 'Unauthorized',
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}

// 403 Forbidden 异常
export class ForbiddenException extends HttpException {
  constructor(message: string = '禁止访问') {
    super(
      {
        message,
        error: 'Forbidden',
      },
      HttpStatus.FORBIDDEN,
    );
  }
}

// 500 Internal Server Error 异常
export class InternalServerErrorException extends HttpException {
  constructor(message: string = '服务器内部错误') {
    super(
      {
        message,
        error: 'Internal Server Error',
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

// 409 Conflict 异常
export class ConflictException extends HttpException {
  constructor(message: string = '资源冲突') {
    super(
      {
        message,
        error: 'Conflict',
      },
      HttpStatus.CONFLICT,
    );
  }
}
