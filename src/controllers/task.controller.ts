import { Controller, Get, Post, Delete, Patch, Body, Param, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { TaskService } from '../services/task.service';

import { CreateTaskDTO, EditTaskDTO } from '../dto/task.dto';
import { TaskModel } from '../entities/task.entity';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getAll(): Promise<TaskModel[]> {
    return this.taskService.getAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async getOneById(@Param('id', new ParseUUIDPipe()) id: string): Promise<TaskModel> {
    return this.taskService.getOneById(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createOne(@Body() taskData: CreateTaskDTO): Promise<TaskModel> {
    return this.taskService.createOne(taskData);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async editOneById(@Param('id', new ParseUUIDPipe()) id: string, @Body() taskUpdates: EditTaskDTO): Promise<void> {
    return this.taskService.editOneById(id, taskUpdates);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async deleteOneById(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.taskService.deleteOneById(id);
  }
}
