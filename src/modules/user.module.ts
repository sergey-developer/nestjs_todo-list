import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModel } from '../entities/user.entity';
import { UserService } from '../services/user.service';
import { UserController } from '../controllers/user.controller';
import { UserRepository } from '../repositories/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel, UserRepository])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
