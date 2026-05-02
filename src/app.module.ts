import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { AppService } from './service/app.service';
import { UserModule } from './user/user.module';

// 应用根模块：所有功能模块的入口
@Module({
  // 导入其他模块
  imports: [UserModule],
  // 注册根控制器
  controllers: [AppController],
  // 注册根服务
  providers: [AppService],
})
export class AppModule {}
