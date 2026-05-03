import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter } from './filters/http-exception.filter';

async function bootstrap() {
  // 创建 Nest 应用实例
  const app = await NestFactory.create(AppModule);

  // 使用全局验证管道：自动验证 DTO
  app.useGlobalPipes(new ValidationPipe());

  // 使用全局异常过滤器：统一处理所有异常
  app.useGlobalFilters(new GlobalExceptionFilter());

  // 启用 CORS：使用 NestJS 内置的 CORS 支持
  app.enableCors({
    // 允许所有来源（生产环境建议限制具体域名）
    origin: true,

    // 允许携带凭证
    credentials: true,

    // 暴露自定义响应头
    exposedHeaders: ['X-Total-Count'],
  });

  // 启动应用，监听端口 3000
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
