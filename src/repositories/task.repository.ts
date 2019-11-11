import {EntityRepository, Repository} from 'typeorm';

import { TaskModel } from '../entities/task.entity';
import { EditTaskDTO } from '../dto/task.dto';

@EntityRepository(TaskModel)
export class TaskRepository extends Repository<TaskModel> {
  async findAll(): Promise<TaskModel[]> {
    return this.find({relations: ['author']});
  }

  async findOneById(id: string): Promise<TaskModel> {
    return this.findOne(id, {relations: ['author']});
  }

  async createOne(taskData): Promise<TaskModel> {
    return this.save(taskData);
  }

  async updateOneById(id: string, taskUpdates: EditTaskDTO): Promise<void> {
    await this.update(id, taskUpdates);
  }

  async deleteOneById(id: string): Promise<void> {
    await this.delete(id);
  }
}
