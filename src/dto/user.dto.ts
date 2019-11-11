import { IsEmail, IsNotEmpty, IsString, Length, IsOptional, IsArray } from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  @Length(2, 20)
  readonly firstName: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 20)
  readonly lastName: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 60)
  password: string;
}

export class CreatedUserDTO {
  readonly id: string;
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly roles: string[];
}

export class AuthenticateUserDTO {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}

export class AuthenticatedUserDTO {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly token: string;
  readonly roles: string[];
}

export class UpdateUserDTO {
  @IsOptional()
  @IsString()
  @Length(2, 20)
  readonly firstName: string;

  @IsOptional()
  @IsString()
  @Length(2, 20)
  readonly lastName: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsOptional()
  @IsString()
  readonly password: string;
}
