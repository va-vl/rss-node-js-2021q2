import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
//
import { config, ormConfig, winstonConfig } from './common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/users/user.module';
import { BoardModule } from './modules/boards/board.module';
import { TaskModule } from './modules/tasks/task.module';
import { AllExceptionFilter } from './filters';
import { RequestLoggingInterceptor } from './interceptors';

@Module({
  imports: [
    WinstonModule.forRoot(winstonConfig),
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
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestLoggingInterceptor,
    },
  ],
})
export class AppModule {}
