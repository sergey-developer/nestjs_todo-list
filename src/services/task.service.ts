import { Injectable, ParseUUIDPipe, UsePipes } from '@nestjs/common';

import { TaskRepository } from '../repositories/task.repository';

import { TaskModel } from '../entities/task.entity';
import { CreateTaskDTO, EditTaskDTO } from '../dto/task.dto';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async getAll(): Promise<TaskModel[]> {
    return this.taskRepository.findAll();
  }

  @UsePipes(ParseUUIDPipe)
  async getOneById(id: string): Promise<TaskModel> {
    return this.taskRepository.findOneById(id);
  }

  async createOne(taskData: CreateTaskDTO): Promise<TaskModel> {
    return this.taskRepository.createOne(taskData);
  }

  @UsePipes(ParseUUIDPipe)
  async editOneById(id: string, taskUpdates: EditTaskDTO): Promise<void> {
    return this.taskRepository.updateOneById(id, taskUpdates);
  }

  @UsePipes(ParseUUIDPipe)
  async deleteOneById(id: string): Promise<void> {
    return this.taskRepository.deleteOneById(id);
  }
}
