import { IsString, Length } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @Length(6)
  name!: string;

  @IsString()
  @Length(6)
  login!: string;

  @IsString()
  @Length(6)
  password!: string;
}
