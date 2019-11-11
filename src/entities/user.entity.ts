import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

type UserRoleType = 'user' | 'admin';

@Entity('users')
export class UserModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 20, nullable: false })
  firstName: string;

  @Column({ length: 20, nullable: false })
  lastName: string;

  @Column({ nullable: false, select: false })
  password: string;

  @Column({nullable: false, unique: true})
  email: string;

  @Column({type: 'simple-array', nullable: false, array: true})
  roles: string[];
}
