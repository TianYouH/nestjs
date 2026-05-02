import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

// 应用启动函数
async function bootstrap() {
  // 创建 Nest 应用实例
  const app = await NestFactory.create(AppModule);
  // 使用全局验证管道：自动验证 DTO
  app.useGlobalPipes(new ValidationPipe());
  // 启动应用，监听端口 3000
  await app.listen(process.env.PORT ?? 3000);
}
// 启动应用
bootstrap();
