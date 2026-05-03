import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { LoggerMiddleware } from './middleware/logger.middleware';

// User 模块：负责用户相关的功能
@Module({
  // 注册控制器：处理 HTTP 请求
  controllers: [UserController],
  // 注册提供者：提供业务逻辑服务
  providers: [UserService],
  // 导出服务：让其他模块也能使用 UserService
  exports: [UserService],
})
export class UserModule implements NestModule {
  // 配置中间件
  configure(consumer: MiddlewareConsumer) {
    // 应用日志中间件到所有路由
    consumer.apply(LoggerMiddleware).forRoutes('users');
  }
}
