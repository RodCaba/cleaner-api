import { IsDateString, IsEmail, IsString } from 'class-validator';

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
  @IsDateString()
  workingHoursStart: string;

  @IsDateString()
  workingHoursEnd: string;
}
