import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UserModule } from './user.module';
import { JwtStrategy } from '../services/jwt.strgategy';
import { AuthService } from '../services/auth.service';
import { AuthController } from '../controllers/auth.controller';

import { jwtConstants } from '../constants/auth';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
