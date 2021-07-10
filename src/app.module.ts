import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
//
import { config, ormConfig } from './common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/users/user.module';
import { BoardModule } from './modules/boards/board.module';
import { TaskModule } from './modules/tasks/task.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config, ormConfig],
    }),
    TypeOrmModule.forRootAsync({ useFactory: ormConfig }),
    AuthModule,
    UserModule,
    BoardModule,
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
