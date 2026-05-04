import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter } from './filters/http-exception.filter';

// 应用引导函数：负责创建 Nest 应用实例并启动, 并初始化一些全局配置,按照顺序执行
// 注意：在这里初始化模块没办法使用到依赖注入其它服务，因为这是应用启动时调用的，而依赖注入是在模块加载时调用的
// 所以，在这里只能初始化一些全局配置，比如日志中间件、全局异常过滤器等，而不能初始化模块，因为模块是在应用启动时加载的，而应用启动时依赖注入是无法使用的
// 当然，如果有这类需要初始化，可以在 AppModule 中进行配置

async function bootstrap() {
  // 创建 Nest 应用实例
  const app = await NestFactory.create(AppModule);

  // 使用全局验证管道：自动验证 DTO，直接使用new实例化 的普通类，不是由 NestJS 依赖注入系统管理
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
