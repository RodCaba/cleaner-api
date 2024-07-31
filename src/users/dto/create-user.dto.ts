import { IsEmail, IsInt, IsString, Max, Min } from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  password: string;
}

export class CreateCleanerDto extends CreateUserDto {
  @IsInt()
  @Min(0)
  @Max(23)
  workingHoursStart: string;

  @IsInt()
  @Min(0)
  @Max(23)
  workingHoursEnd: string;
}
