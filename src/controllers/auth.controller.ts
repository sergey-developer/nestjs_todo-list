import { Controller, Post, Body, HttpException, HttpStatus, HttpCode } from '@nestjs/common';

import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

import { AuthenticatedUserDTO, AuthenticateUserDTO, CreatedUserDTO, CreateUserDTO } from '../dto/user.dto';

import { comparePasswords, hashPassword } from '../utils/authentication.utils';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('signup')
  async signUpUser(@Body() userData: CreateUserDTO): Promise<AuthenticatedUserDTO> {
    const userByEmail = await this.userService.findByEmail(userData.email);
    if (userByEmail) {
      throw new HttpException({
        statusCode: HttpStatus.FORBIDDEN,
        message: `User with email: ${userData.email} is already exist.`,
      }, HttpStatus.FORBIDDEN);
    }

    userData.password = await hashPassword(userData.password);
    const user: CreatedUserDTO = await this.userService.createOne(userData);
    const token: string = this.authService.getNewToken(user);

    return {
      ...user,
      token,
    };
  }

  @Post('signin')
  @HttpCode(200)
  async signInUser(@Body() userData: AuthenticateUserDTO): Promise<AuthenticatedUserDTO> {
    const userByEmail = await this.userService.findByEmailForAuthentication(userData.email);
    if (!userByEmail) {
      throw new HttpException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `User with email: ${userData.email} was not found.`,
      }, HttpStatus.NOT_FOUND);
    }

    const {password: currentUserPassword, ...user} = userByEmail;
    const passwordMatched = await comparePasswords(userData.password, currentUserPassword);
    if (!passwordMatched) {
      throw new HttpException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Wrong password.',
      }, HttpStatus.BAD_REQUEST);
    }

    const token: string = this.authService.getNewToken(user);
    return {
      ...user,
      token,
    };
  }
}
