import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { AppService } from './service/app.service';
import { UserModule } from './user/user.module';
import { GlobalLoggerMiddleware } from './middleware/global-logger.middleware';

// 应用根模块：所有功能模块的入口
@Module({
  // 导入其他模块
  imports: [UserModule],
  // 注册根控制器
  controllers: [AppController],
  // 注册根服务
  providers: [AppService],
})
export class AppModule implements NestModule {
  // 配置全局中间件
  configure(consumer: MiddlewareConsumer) {
    // 应用全局日志中间件到所有路由
    consumer.apply(GlobalLoggerMiddleware).forRoutes('*');
  }
}
