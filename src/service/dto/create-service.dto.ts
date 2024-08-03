import { IsDateString, IsString } from 'class-validator';

export class CreateServiceDto {
  @IsDateString()
  startDateTime: Date;

  @IsDateString()
  endDateTime: Date;

  @IsString()
  userId: string;

  @IsString()
  cleanerId: string;
}
