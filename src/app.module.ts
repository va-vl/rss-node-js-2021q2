import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
//
import { AppController } from './app.controller';
import { AppService } from './app.service';
//
import { UserModule } from './modules/users/user.module';
import { BoardModule } from './modules/boards/board.module';
//
import { ormConfig } from './common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ormConfig],
    }),
    TypeOrmModule.forRootAsync({ useFactory: ormConfig }),
    UserModule,
    BoardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
