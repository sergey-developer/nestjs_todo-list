import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { UserModel } from './user.entity';

@Entity('tasks')
export class TaskModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({length: 100, nullable: false})
  title: string;

  @Column({length: 500, nullable: false})
  description: string;

  @Column({nullable: false})
  createdAt: Date;

  @ManyToOne(type => UserModel)
  author: UserModel;
}
