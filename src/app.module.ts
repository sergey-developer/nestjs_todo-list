import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { ConfigModule } from './config/config.module';
import { TaskModule } from './modules/task.module';
import { UserModule } from './modules/user.module';
import { AuthModule } from './modules/auth.module';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ConfigModule,
    TaskModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AuthController],
  providers: [],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
