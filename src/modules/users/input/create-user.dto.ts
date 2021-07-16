import { IsString, Length } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @Length(3)
  name!: string;

  @IsString()
  @Length(3)
  login!: string;

  @IsString()
  @Length(3)
  password!: string;
}
