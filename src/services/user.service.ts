import { Injectable, ParseUUIDPipe, UsePipes } from '@nestjs/common';

import { UserRepository } from '../repositories/user.repository';

import { UserModel } from '../entities/user.entity';
import { CreateUserDTO, CreatedUserDTO, UpdateUserDTO } from '../dto/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getAll(): Promise<UserModel[]> {
    return this.userRepository.findAll();
  }

  @UsePipes(ParseUUIDPipe)
  async getOneById(id: string): Promise<UserModel> {
    return this.userRepository.findOneById(id);
  }

  async findByEmail(email: string): Promise<UserModel> {
    return this.userRepository.findByEmail(email);
  }

  async findByEmailForAuthentication(email: string): Promise<UserModel> {
    return this.userRepository.findByEmailForAuthentication(email);
  }

  async createOne(userData: CreateUserDTO): Promise<CreatedUserDTO> {
    return this.userRepository.createOne(userData);
  }

  async updateOneById(id: string, updates: UpdateUserDTO): Promise<void> {
    return this.userRepository.updateOneById(id, updates);
  }
}
