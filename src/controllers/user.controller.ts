import { Controller, Get, Post, Param, Body, ParseUUIDPipe, UseGuards, HttpCode } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserService } from '../services/user.service';

import { UserModel } from '../entities/user.entity';
import { UpdateUserDTO } from '../dto/user.dto';
import { RolesGuard } from '../guards/roles.guard';
import { RolesReflector } from '../reflectors/roles.reflector';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @RolesReflector(['admin'])
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async getAll(): Promise<UserModel[]> {
    return this.userService.getAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async getOneById(@Param('id', new ParseUUIDPipe()) id: string): Promise<UserModel>  {
    return this.userService.getOneById(id);
  }

  @Post(':id')
  @HttpCode(200)
  @UseGuards(AuthGuard('jwt'))
  async updateOneById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updates: UpdateUserDTO,
  ): Promise<void> {
    return this.userService.updateOneById(id, updates);
  }
}
