import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { AppService } from './service/app.service';
import { UserModule } from './user/user.module';

// 应用根模块：所有功能模块的入口
@Module({
  // 导入其他模块，如用户模块，这些模块包含了应用的业务逻辑、数据访问层、路由等
  imports: [UserModule],
  // 注册根控制器，处理应用的根路由
  controllers: [AppController],
  // 注册根服务，处理应用的根业务逻辑
  providers: [AppService],
})
export class AppModule {}
