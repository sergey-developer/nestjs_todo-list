import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from './user.service';
import { CreatedUserDTO } from '../dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  getNewToken(user: CreatedUserDTO): string {
    const jwtPayload = { sub: user.id, roles: user.roles };
    return this.jwtService.sign(jwtPayload);
  }
}
