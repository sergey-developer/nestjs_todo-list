import { Module, MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {TaskModel} from '../entities/task.entity';
import {TaskService} from '../services/task.service';
import {TaskController} from '../controllers/task.controller';
import {TaskRepository} from '../repositories/task.repository';

import { logger } from '../middlewares/logger.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([TaskModel, TaskRepository])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(logger)
      .forRoutes({path: 'tasks', method: RequestMethod.GET});
  }
}
