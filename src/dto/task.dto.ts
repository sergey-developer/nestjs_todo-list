import { IsNotEmpty, IsString, Length, IsUUID, IsOptional } from 'class-validator';

export class CreateTaskDTO {
  @IsNotEmpty()
  @IsString()
  @Length(3, 100)
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 500)
  readonly description: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  readonly author: string;
}

export class EditTaskDTO {
  @IsOptional()
  @IsString()
  @Length(3, 100)
  readonly title: string;

  @IsOptional()
  @IsString()
  @Length(3, 500)
  readonly description: string;
}
