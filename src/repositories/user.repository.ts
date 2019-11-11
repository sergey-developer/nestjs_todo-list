import {EntityRepository, Repository} from 'typeorm';

import { UserModel } from '../entities/user.entity';
import { CreateUserDTO, CreatedUserDTO, UpdateUserDTO } from '../dto/user.dto';

@EntityRepository(UserModel)
export class UserRepository extends Repository<UserModel> {

  async findAll(): Promise<UserModel[]> {
    return this.find();
  }

  async findOneById(id: string): Promise<UserModel> {
    return this.findOne(id);
  }

  async findByEmail(email: string): Promise<UserModel> {
    return this.findOne({email});
  }

  async findByEmailForAuthentication(email: string): Promise<UserModel> {
    return this.findOne(
      {email},
      {select: ['password', 'firstName', 'lastName', 'email', 'id', 'roles']},
    );
  }

  async createOne(userData: CreateUserDTO): Promise<CreatedUserDTO> {
    const {password, ...user} = await this.save({...userData, roles: ['user']});
    return user;
  }

  async updateOneById(id: string, updates: UpdateUserDTO): Promise<void> {
    await this.update(id, updates);
  }
}
